import React, { useState } from 'react';

const UploadImagePage = () => {
  const [building, setBuilding] = useState('');
  const [floor, setFloor] = useState('');
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [uploadedImages, setUploadedImages] = useState({});

  const [showBuildingPopup, setShowBuildingPopup] = useState(true);
  const [selectedStage, setSelectedStage] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedComponents, setSelectedComponents] = useState('');

  // Handle Image Upload
  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  // Simulate Predictions
  const handlePredict = () => {
    const simulatedPredictions = {
      stage: 'Stage 1',
      activity: 'Excavation',
      components: 'Cement, Steel, Sand',
    };
    setPredictions(simulatedPredictions);
    setSelectedStage(simulatedPredictions.stage);
    setSelectedActivity(simulatedPredictions.activity);
    setSelectedComponents(simulatedPredictions.components);
  };

  // Handle Add to Site
  const handleAddToSite = () => {
    if (selectedStage && selectedActivity && selectedComponents && image) {
      const newUploadedImages = { ...uploadedImages };
      if (!newUploadedImages[selectedStage]) {
        newUploadedImages[selectedStage] = [];
      }
      newUploadedImages[selectedStage].push({
        image,
        activity: selectedActivity,
        components: selectedComponents,
      });
      setUploadedImages(newUploadedImages);
      setImage(null);
      setPredictions(null);
      setSelectedStage('');
      setSelectedActivity('');
      setSelectedComponents('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 p-10">
      {/* Building and Floor Selection Pop-up */}
      {showBuildingPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-2xl shadow-2xl w-96">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-6">Select Building and Floor</h2>
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-medium mb-2">Building</label>
              <select
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Building</option>
                <option value="Building 1">Building 1</option>
                <option value="Building 2">Building 2</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-medium mb-2">Floor</label>
              <select
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Floor</option>
                <option value="Floor 1">Floor 1</option>
                <option value="Floor 2">Floor 2</option>
              </select>
            </div>
            <button
              onClick={() => setShowBuildingPopup(false)}
              className="w-full py-3 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 transition ease-in-out duration-300"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col items-center mt-10">
        {/* Upload Image Section */}
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl w-full mb-8">
          <h2 className="text-3xl font-semibold text-indigo-600 mb-6">Upload Image</h2>
          <label
            htmlFor="file-upload"
            className="w-full h-72 border-4 border-dashed border-indigo-500 rounded-lg flex justify-center items-center cursor-pointer hover:border-indigo-700 transition ease-in-out duration-300"
          >
            <span className="text-indigo-600 text-lg">Click to Upload Image</span>
          </label>
          <input
            type="file"
            accept="image/*"
            id="file-upload"
            onChange={handleUploadImage}
            className="hidden"
          />
          {image && (
            <div className="w-full mt-6">
              <img
                src={image}
                alt="Uploaded"
                className="w-full h-72 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
        </div>

        {/* Predict Button */}
        <button
          onClick={handlePredict}
          className="w-64 py-3 bg-indigo-600 text-white text-lg rounded-lg mb-6 hover:bg-indigo-700 transition ease-in-out duration-300"
        >
          Predict
        </button>

        {/* Prediction Results */}
        {predictions && (
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl w-full mb-8">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-4">Prediction Results</h2>
            <p className="text-lg text-gray-700 mb-2"><strong>Predicted Stage:</strong> {predictions.stage}</p>
            <p className="text-lg text-gray-700 mb-2"><strong>Predicted Activity:</strong> {predictions.activity}</p>
            <p className="text-lg text-gray-700"><strong>Predicted Components:</strong> {predictions.components}</p>
          </div>
        )}

        {/* Add to Site Button */}
        {predictions && (
          <button
            onClick={handleAddToSite}
            className="w-64 py-3 bg-indigo-600 text-white text-lg rounded-lg mb-8 hover:bg-indigo-700 transition ease-in-out duration-300"
          >
            Add to Site
          </button>
        )}

        {/* Image History Section (without heading) */}
        <div className="mt-10 w-full">
          {Object.keys(uploadedImages).map((stage) => (
            <div key={stage} className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Stage: {stage}</h3>
              <div className="flex flex-wrap justify-start gap-6">
                {uploadedImages[stage].map((item, index) => (
                  <div key={index} className="w-40 h-40">
                    <img
                      src={item.image}
                      
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadImagePage;