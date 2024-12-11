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
    if stage == "Foundation":
        sub_stage_keywords = [
            "Excavation", "Base Preparation", "Reinforcement Placement", "Formwork Installation", "Concrete Pouring and Curing"
        ]
    elif stage == "SubStructure":
        sub_stage_keywords = [
            "Plinth Beam Construction", "Backfilling and Compaction", "Retaining Walls", "Waterproofing and Damp-Proofing", "Preparation for the Transition Stage"
        ]
    elif stage == "Plinth":
        sub_stage_keywords = [
            "Plinth Filling and Compaction", "PCC", "Anti-Termite Treatment", "Utility Installation", "Ground Level Finishing"
        ]
    elif stage == "SuperStructure":
        sub_stage_keywords = [
            "Column Construction", "Beam and Slab Construction", "Roof Construction", "Wall Construction", "Lintels and Chajjas"
        ]
    elif stage == "Finishing":
        sub_stage_keywords = [
            "Plastering and Painting", "Flooring and Tiling", "Door and Window Installation", "Façade Work", "Fixtures and Furnishings"
        ]
    else:
        return sub_stages, sub_stage_name  # Invalid stage, no sub-stages found

    # Extract progress for the sub-stages
    for sub_stage in sub_stage_keywords:
        if sub_stage.lower() in text.lower():  # Matching case-insensitive for sub-stage names
            sub_stage_name = sub_stage
            progress = parse_percentage(text)
            sub_stages[sub_stage] = f"{progress}% complete"

    return sub_stages, sub_stage_name

# Prompt template for analyzing the construction stage
PROMPT_TEMPLATE = """
Analyze the uploaded image and determine the current stage of construction. For each stage, provide the following details:
READ EVERYTHING CALCULATE EVERYTHING THEN START WRITING RESPONSE - give the sub stage name in one word or just the name of sub stage and the overall progress percentage show only the final percentage dont show the calculation here.

- **Stage**: <stage> (One of: Foundation, SubStructure, Plinth, SuperStructure, Finishing)
- **Activity**: <activity> (Describe the current activity at the stage in 2/3 words).
- **Components**: <components> (List the components involved at this stage in 4/5 words).
- **Sub_Stage_name: Identify the sub-stages for the given stage. Below are the possible sub-stages for each stage:
- **overall progress percentage** (just mention final output PLS dont show calcultion here) (directly give the percentage here):
**show the Overall progress percentage before the substages percentages please**

  calculate the percentage of each sub stage completed:-

  **Foundation Stage Sub-Stages**:
  - Excavation
  - Base Preparation (Compaction and leveling)
  - Reinforcement Placement (Footings and plinth beams)
  - Formwork Installation
  - Concrete Pouring and Curing

  **Sub-Structure Stage Sub-Stages**:
  - Plinth Beam Construction
  - Backfilling and Compaction
  - Retaining Walls (if applicable)
  - Waterproofing and Damp-Proofing
  - Preparation for the Transition Stage

  **Plinth Level Stage Sub-Stages**:
  - Plinth Filling and Compaction
  - PCC (Plain Cement Concrete) or Floor Base Preparation
  - Anti-Termite Treatment (if applicable)
  - Utility Installation (Drainage pipes, electrical conduits, water lines under the plinth)
  - Ground Level Finishing (Plinth band protection and preparation for vertical construction)

  **Superstructure Stage Sub-Stages**:
  - Column Construction
  - Beam and Slab Construction
  - Roof Construction
  - Wall Construction (External and Internal)
  - Lintels and Chajjas

  **Finishing Stage Sub-Stages**:
  - Plastering and Painting
  - Flooring and Tiling
  - Door and Window Installation
  - Façade Work (Cladding, glass, or exterior treatments)
  - Fixtures and Furnishings (Cabinets, countertops, lighting, etc.)

- **Progress Calculation**:
  - For each sub-stage, provide the **progress percentage** (e.g., "Excavation: 50% complete").
  - The **overall progress** of the stage is calculated by averaging the progress of each of its sub-stages. For example, if a stage has 5 sub-stages, and their progress percentages are 50%, 20%, 80%, 10%, and 100%, the overall progress would be the average of these: **(50+20+80+10+100) / 5 = 52%**.

- **Final Output**:
  - Return the **overall progress percentage** for the entire stage.
  - Return the **progress percentage** for each **sub-stage**.
  - If the image does not correspond to any of the above stages, respond with: **"ERROR: Not a valid construction stage image."**
"""

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    image_file = request.files['image']
    if image_file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    try:
        # Save the file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
           image_path = temp_file.name
           image_file.save(image_path)

        # Run analysis using Gemini API
        uploaded_file = genai.upload_file(path=image_path, display_name="Uploaded Image")
        print(f"Uploaded file URI: {uploaded_file.uri}")

        # Generate prompt for analysis using Gemini
        model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest")
        prompt = PROMPT_TEMPLATE
        response = model.generate_content([uploaded_file, prompt])

        # Clean up temporary file
        os.remove(image_path)

        if response and response.text:
            print("Raw response from Gemini API:", response.text)

            # Parse the response for stage, activity, components, and progress
            lines = response.text.strip().split("\n")
            stage = lines[0].split(":")[-1].strip()
            activity = lines[1].split(":")[-1].strip()
            components = lines[2].split(":")[-1].strip()

            # Extract the progress for sub-stages
            sub_stage_progress, sub_stage_name = parse_sub_stage_progress(response.text, stage)

            # Calculate overall progress by averaging the sub-stage progress
            overall_progress = sum([parse_percentage(progress) for progress in sub_stage_progress.values()]) / len(sub_stage_progress)

            # Save the image based on the predicted stage and sub-stage
            # Create the temp directory if it doesn't exist
            #temp_dir = "temp/"
            #if not os.path.exists(temp_dir):
             #   os.makedirs(temp_dir)

            # Create a folder for the predicted stage
            #stage_folder = os.path.join(temp_dir, stage)
            #if not os.path.exists(stage_folder):
            #    os.makedirs(stage_folder)

            # Create a folder for the predicted sub-stage within the stage folder
            #sub_stage_folder = os.path.join(stage_folder, sub_stage_name.replace(" ", "_"))
            #if not os.path.exists(sub_stage_folder):
            #    os.makedirs(sub_stage_folder)

            # Save the image inside the sub-stage folder
            # image_filename = f"{image_file.filename}"
            # image_file_path = os.path.join(sub_stage_folder, image_filename)
            # image_file.save(image_file_path)
            # print(f"Image saved at: {image_file_path}")  # Add logging to confirm image path

            return jsonify({
                "stage": stage,
                "activity": activity,
                "components": components,
                "sub_stage_progress": sub_stage_progress,
                "sub_stage_name": sub_stage_name,
                "overall_progress": f"{overall_progress}%"
            }), 200

        else:
            print("Error: No response from Gemini API.")
            return jsonify({"error": "Failed to analyze the image."}), 500

    except Exception as e:
        print(f"Error during processing: {str(e)}")
        return jsonify({"error": f"Error processing image: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
