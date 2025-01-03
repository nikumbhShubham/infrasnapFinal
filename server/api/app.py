from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
import tempfile
import re

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Configure the Gemini API key
genai.configure(api_key="AIzaSyBtpKzAxx2pwMQ1eMO_jtRxk28rRaglVc0")

# Function to extract the progress percentage
def parse_percentage(analysis_text):
    """
    Extract the latest progress percentage from the analysis text.
    """
    match = re.search(r"(\d+)%", analysis_text)
    return int(match.group(1)) if match else 0

# Function to parse sub-stage progress from the response
def parse_sub_stage_progress(text, stage):
    """
    Extract sub-stage progress details based on the given stage from the response text.
    """
    sub_stages = {}
    sub_stage_name = ""

    # Define sub-stages for each stage
    stage_keywords = {
        "Foundation": [
            "Excavation", "Base Preparation", "Reinforcement Placement",
            "Formwork Installation", "Concrete Pouring and Curing"
        ],
        "SubStructure": [
            "Plinth Beam Construction", "Backfilling and Compaction", "Retaining Walls",
            "Waterproofing and Damp-Proofing", "Preparation for the Transition Stage"
        ],
        "Plinth": [
            "Plinth Filling and Compaction", "PCC", "Anti-Termite Treatment",
            "Utility Installation", "Ground Level Finishing"
        ],
        "SuperStructure": [
            "Column Construction", "Beam and Slab Construction", "Roof Construction",
            "Wall Construction", "Lintels and Chajjas"
        ],
        "Finishing": [
            "Plastering and Painting", "Flooring and Tiling", "Door and Window Installation",
            "Façade Work", "Fixtures and Furnishings"
        ],
    }

    if stage not in stage_keywords:
        return sub_stages, sub_stage_name  # Invalid stage, no sub-stages found

    # Extract progress for the sub-stages
    for sub_stage in stage_keywords[stage]:
        if sub_stage.lower() in text.lower():  # Case-insensitive matching
            sub_stage_name = sub_stage
            progress_match = re.search(fr"{sub_stage}.*?(\d+)%", text, re.IGNORECASE)
            if progress_match:
                progress = int(progress_match.group(1))
                sub_stages[sub_stage] = progress

    return sub_stages, sub_stage_name


# Prompt template for analyzing the construction stage in videos
PROMPT_TEMPLATE_VIDEO = """ PLS START PRINTING THE RESULT WITH:-
- *Stage*: <stage> (One of: Foundation, SubStructure, Plinth, SuperStructure, Finishing)
- *Activity*: <activity> (Describe the current activity at the stage in 2/3 words).
- *Components*: <components> (List the components involved at this stage in 4/5 words).
- *Sub_Stage_name*: <sub_stage> Identify the sub-stages for the given stage.
- *Overall progress percentage*: Provide the overall progress percentage.

For the following sub-stages, calculate and provide progress percentages:

*Foundation Stage Sub-Stages*:
- Excavation
- Base Preparation (Compaction and leveling)
- Reinforcement Placement (Footings and plinth beams)
- Formwork Installation
- Concrete Pouring and Curing

*Sub-Structure Stage Sub-Stages*:
- Plinth Beam Construction
- Backfilling and Compaction
- Retaining Walls (if applicable)
- Waterproofing and Damp-Proofing
- Preparation for the Transition Stage

*Plinth Level Stage Sub-Stages*:
- Plinth Filling and Compaction
- PCC (Plain Cement Concrete) or Floor Base Preparation
- Anti-Termite Treatment (if applicable)
- Utility Installation (Drainage pipes, electrical conduits, water lines under the plinth)
- Ground Level Finishing (Plinth band protection and preparation for vertical construction)

*Superstructure Stage Sub-Stages*:
- Column Construction
- Beam and Slab Construction
- Roof Construction
- Wall Construction (External and Internal)
- Lintels and Chajjas

*Finishing Stage Sub-Stages*:
- Plastering and Painting
- Flooring and Tiling
- Door and Window Installation
- Façade Work (Cladding, glass, or exterior treatments)
- Fixtures and Furnishings (Cabinets, countertops, lighting, etc.)

Return the overall progress percentage for the entire stage and the progress percentages for each sub-stage.
If the video does not correspond to any of the above stages, respond with: *"ERROR: Not a valid construction stage video."*
"""

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    try:
        file_extension = file.filename.rsplit('.', 1)[-1].lower()
        is_image = False

        # Handle image file
        if file_extension in ['jpg', 'jpeg', 'png']:
            is_image = True
            # Save the image temporarily
            with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
                image_path = temp_file.name
                file.save(image_path)

            # Run analysis using Gemini API
            uploaded_file = genai.upload_file(path=image_path, display_name="Uploaded Image")
            model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest")
            prompt = PROMPT_TEMPLATE_VIDEO
            response = model.generate_content([uploaded_file, prompt])

            # Clean up temporary file
            os.remove(image_path)

        # Handle video file
        elif file_extension in ['mp4', 'avi', 'mov', 'mkv']:
            # Save the video temporarily
            with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as temp_file:
                video_path = temp_file.name
                file.save(video_path)

            # Run analysis using Gemini API
            uploaded_file = genai.upload_file(path=video_path, display_name="Uploaded Video")

            import time

            # Check whether the file is ready to be used.
            while uploaded_file.state.name == "PROCESSING":
                print('.', end='')
                time.sleep(10)
                uploaded_file = genai.get_file(uploaded_file.name)

            if uploaded_file.state.name == "FAILED":
                raise ValueError(uploaded_file.state.name)

            model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest")
            prompt = PROMPT_TEMPLATE_VIDEO
            response = model.generate_content([uploaded_file, prompt],
                                              request_options={"timeout": 600})

            # Clean up temporary file
            os.remove(video_path)

        else:
            return jsonify({"error": "Invalid file format. Only image or video files are allowed."}), 400

        if response and response.text:
            print("Raw response from Gemini API:", response.text)

            # Parse response based on file type
            lines = response.text.strip().split("\n")
            if is_image:
                # Parsing logic for images
                stage = lines[0].split(":")[-1].strip()
                activity = lines[1].split(":")[-1].strip()
                components = lines[2].split(":")[-1].strip()
                sub_stage = lines[3].split(":")[-1].strip()
                progress_perc = lines[4].split(":")[-1].strip()
            else:
                # Parsing logic for videos
                stage = lines[2].split(":**")[-1].strip()
                activity = lines[3].split(":**")[-1].strip()
                components = lines[4].split(":**")[-1].strip()
                sub_stage = lines[5].split(":**")[-1].strip()
                progress_perc = lines[6].split(":**")[-1].strip()

            # Extract the progress for sub-stages
            sub_stage_progress, sub_stage_name = parse_sub_stage_progress(response.text, stage)

            # Ensure there is progress data to avoid division by zero
            if sub_stage_progress:
                # Calculate overall progress by averaging the sub-stage progress
                overall_progress = sum(sub_stage_progress.values()) / len(sub_stage_progress)
            else:
                overall_progress = 0  # Default to 0% if no sub-stage progress data is found

            return jsonify({
                "stage": stage,
                "activity": activity,
                "components": components,
                "sub_stage_name": sub_stage,
                "overall_progress": progress_perc,
                "sub_stage_progress": sub_stage_progress
            }), 200

        else:
            print("Error: No response from Gemini API.")
            return jsonify({"error": "Failed to analyze the video."}), 500

    except Exception as e:
        print(f"Error during processing: {str(e)}")
        return jsonify({"error": f"Error processing file: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
