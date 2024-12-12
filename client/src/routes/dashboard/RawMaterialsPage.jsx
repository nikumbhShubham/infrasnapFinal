
// import { div } from 'framer-motion/client';
import React, { useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const RawMaterialsPage = () => {
  const [inventory, setInventory] = useState([]);
  const [material, setMaterial] = useState('');
  const [quantity, setQuantity] = useState('');
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [floorPlanImage, setFloorPlanImage] = useState(null); // Floor plan image state

  // Handle Create Inventory Button
  const handleCreateInventory = () => {
    setShowCreatePopup(true);
  };

  // Handle Update Inventory Button
  const handleUpdateInventory = () => {
    setShowUpdatePopup(true);
  };

  // Add Material to Inventory
  const handleAddMaterial = () => {
    if (material && quantity) {
      setInventory([...inventory, { material, quantity, used: '' }]);
      setMaterial('');
      setQuantity('');
    }
  };

  // Save Updated Inventory
  const handleSaveInventory = () => {
    setShowUpdatePopup(false);
  };

  // Update the 'Used' column in Inventory
  const handleUpdateUsed = (index, value) => {
    const updatedInventory = [...inventory];
    updatedInventory[index].used = value;
    setInventory(updatedInventory);
  };

  // Simulate predictions for raw materials
  const handlePredict = () => {
    const simulatedPredictions = {
      cement: '500kg',
      steel: '300kg',
      sand: '700kg',
    };

    setPredictions(simulatedPredictions);
  };

  // Handle Image Upload
  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the image
      setFloorPlanImage(imageUrl); // Set the image URL in state
    }
  };

  // Progress Bar Logic based on Quantity
  const getProgressBarColor = (quantity) => {
    if (quantity < 100) return 'bg-red-500'; // Low
    if (quantity < 500) return 'bg-yellow-500'; // Medium
    return 'bg-green-500'; // High
  };

  const getProgressValue = (quantity) => {
    if (quantity < 100) return 25; // Low
    if (quantity < 500) return 50; // Medium
    return 100; // High
  };

  return (
    <div className="min-h-screen p-8">
        <header className="text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-[#101a32] to-[#0e449b] bg-clip-text text-transparent">
                Raw Materials
            </span>{" "}
            <span className="text-black">Prediction</span>
        </header>
        <div className="flex gap-4">
            <button
                className="flex items-center gap-2 bg-gradient-to-r from-[#101a32] to-[#0e449b] hover:from-[#0f52bd] hover:to-[#101a32] text-white px-5 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 hover:shadow-lg hover:brightness-110"
                onClick={handleCreateInventory}
            >
                Create Inventory
            </button>
            <button
                className="flex items-center gap-2 bg-gradient-to-r from-[#101a32] to-[#0e449b] hover:from-[#0f52bd] hover:to-[#101a32] text-white px-5 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 hover:shadow-lg hover:brightness-110"
                onClick={handleUpdateInventory}
            >
                Update Inventory
            </button>
        </div>
    



            {/* Create Inventory Popup */}
            {showCreatePopup && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-xl w-1/3 transform transition duration-500 ease-in-out scale-105">
                        <button
                            className="absolute top-4 right-4 text-2xl font-bold text-gray-500"
                            onClick={() => setShowCreatePopup(false)}
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold text-blue-600 mb-6">Create Inventory</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Material</label>
                            <input
                                type="text"
                                value={material}
                                onChange={(e) => setMaterial(e.target.value)}
                                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter material name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Quantity</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter quantity"
                            />
                        </div>
                        <button
                            onClick={handleAddMaterial}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg mb-4 transform transition duration-300 hover:scale-105 hover:bg-blue-700"
                        >
                            Add Material
                        </button>
                        <table className="w-full border-collapse mb-4">
                            <thead>
                                <tr>
                                    <th className="border-b border-gray-300 py-2 px-4">Material</th>
                                    <th className="border-b border-gray-300 py-2 px-4">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border-b border-gray-300 py-2 px-4">{item.material}</td>
                                        <td className="border-b border-gray-300 py-2 px-4">{item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            onClick={() => setShowCreatePopup(false)}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4 transform transition duration-300 hover:scale-105 hover:bg-blue-700"
                        >
                            Create Inventory
                        </button>
                    </div>
                </div>
            )}

            {/* Update Inventory Popup */}
            {showUpdatePopup && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-xl w-1/3 transform transition duration-500 ease-in-out scale-105">
                        <button
                            className="absolute top-4 right-4 text-2xl font-bold text-gray-500"
                            onClick={() => setShowUpdatePopup(false)}
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold text-blue-600 mb-6">Update Inventory</h2>
                        <table className="w-full border-collapse mb-4">
                            <thead>
                                <tr>
                                    <th className="border-b border-gray-300 py-2 px-4">Material</th>
                                    <th className="border-b border-gray-300 py-2 px-4">Quantity</th>
                                    <th className="border-b border-gray-300 py-2 px-4">Used</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border-b border-gray-300 py-2 px-4">{item.material}</td>
                                        <td className="border-b border-gray-300 py-2 px-4">
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => {
                                                    const updatedInventory = [...inventory];
                                                    updatedInventory[index].quantity = e.target.value;
                                                    setInventory(updatedInventory);
                                                }}
                                                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                        </td>
                                        <td className="border-b border-gray-300 py-2 px-4">
                                            <input
                                                type="number"
                                                value={item.used}
                                                onChange={(e) => handleUpdateUsed(index, e.target.value)}
                                                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            onClick={handleSaveInventory}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg transform transition duration-300 hover:scale-105 hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            )}

            {/* Raw Materials Prediction Section */}
<div className="flex flex-wrap justify-between gap-4 mt-8">
    {/* Left Box: Instructions, Upload, and Predictions */}
    <div className="flex-1 bg-white p-8 rounded-xl shadow-xl">
        {/* Instructions for uploading */}
        <p className="text-gray-700 mb-4">
            <strong>Instructions:</strong> Upload the floor plan image first. Please ensure that the image has good quality and dimensions of at least 800x600 pixels.
        </p>

        {/* Image Upload */}
        <div className="mb-6">
            <label className="block text-gray-700 font-poppins font-bold mb-2">Upload Floor Plan Image</label>
            <input
                type="file"
                accept="image/*"
                onChange={handleUploadImage}
                className="border border-gray-300 p-3 rounded-lg w-full"
            />
        </div>

        {/* Display View Image Button */}
        {floorPlanImage && (
            <div className="mt-4">
                <h4 className="text-xl font-bold bg-gradient-to-r from-[#101a32] to-[#0e449b] bg-clip-text text-transparent underline">
                    Uploaded Floor Plan
                </h4>

                <button
                    className="mt-2 px-4 py-2 bg-gradient-to-r from-[#101a32] to-[#0e449b] text-white rounded-lg hover:from-[#0f52bd] hover:to-[#101a32] font-medium transition-all"
                    onClick={() => window.open(floorPlanImage, '_blank')} // Opens the image in a new tab
                >
                    View Image
                </button>
            </div>
        )}

        {/* Button to trigger predictions */}
        <button
            onClick={handlePredict}
            className="flex items-center gap-2 font-poppins font-medium bg-gradient-to-r from-[#101a32] to-[#0e449b] hover:from-[#0f52bd] hover:to-[#101a32] text-white px-5 py-2 rounded-full text-sm font-medium transition-all mt-4 transform hover:scale-105 hover:shadow-lg hover:brightness-110"
        >
            Predict Raw Materials
        </button>

        {/* Predictions Section */}
        {predictions && (
            <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                <h3 className="text-xl font-bold">Predicted Raw Materials:</h3>
                <ul className="mt-2 text-xl">
                    <li>Cement: {predictions.cement}</li>
                    <li>Steel: {predictions.steel}</li>
                    <li>Sand: {predictions.sand}</li>
                </ul>
            </div>
        )}
    </div>

    {/* Right Box: Pie Chart */}
    <div className="flex-1 bg-white p-8 rounded-xl shadow-xl flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 mr-5">Pie Chart Overview</h2>
        <div style={{ width: '400px', height: '400px' }}>
            <Pie
                data={{
                    labels: ['Cement', 'Steel', 'Sand'],
                    datasets: [
                        {
                            label: 'Inventory',
                            data: [
                                parseInt(predictions?.cement || 0, 10),
                                parseInt(predictions?.steel || 0, 10),
                                parseInt(predictions?.sand || 0, 10),
                            ],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.7)', // Cement
                                'rgba(54, 162, 235, 0.7)', // Steel
                                'rgba(255, 206, 86, 0.7)', // Sand
                            ],
                            hoverBackgroundColor: [
                                'rgba(255, 99, 132, 1)', // Cement
                                'rgba(54, 162, 235, 1)', // Steel
                                'rgba(255, 206, 86, 1)', // Sand
                            ],
                            borderColor: '#fff', // Border between segments
                            borderWidth: 2,
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false, // Allows the chart to stretch within its container
                    plugins: {
                        legend: {
                            position: 'right', // Move legend to the right
                            labels: {
                                font: {
                                    size: 14,
                                    family: 'Poppins, sans-serif', // Custom font
                                },
                                color: '#4A5568', // Custom text color for the legend
                                usePointStyle: true, // Circular dots in the legend
                            },
                        },
                        title: {
                            display: true, // Display chart title
                            text: 'Raw Materials Inventory Distribution',
                            font: {
                                size: 18,
                                weight: 'bold',
                            },
                            color: '#1A202C', // Title text color
                        },
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    const value = tooltipItem.raw;
                                    const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = ((value / total) * 100).toFixed(2);
                                    return `${value}kg (${percentage}%)`;
                                },
                            },
                            backgroundColor: '#ffffff',
                            titleColor: '#333333',
                            bodyColor: '#666666',
                            borderWidth: 1,
                            borderColor: '#ddd',
                        },
                    },
                    animation: {
                        duration: 1500,
                        easing: 'easeInOutBounce',
                    },
                }}
            />
        </div>
    </div>


{/* Material Cards Below Prediction Section */}
<div className="mt-6 grid grid-cols-4 gap-6">
    <div className="bg-gray-200 text-black p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold">Cement</h3>
        <img 
            src="/assets/cement.jpeg" 
            alt="Cement Image" 
            className="mt-4 w-full h-auto object-cover rounded-lg" 
        />
        <div className="mt-4">
            <div className="text-md font-poppins text-gray-600">Inventory Level</div>
            <div className="w-full bg-gray-300 rounded-full h-5">
                <div
                    className={`h-5 rounded-full ${getProgressBarColor(predictions ? parseInt(predictions.cement) : 0)}`}
                    style={{ width: `${getProgressValue(predictions ? parseInt(predictions.cement) : 0)}%` }}
                ></div>
            </div>
        </div>
    </div>
    <div className="bg-gray-200 text-black p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold">Steel</h3>
        <img 
            src="/assets/steel.jpeg" 
            alt="Steel Image" 
            className="mt-4 w-full h-auto object-cover rounded-lg" 
        />
        <div className="mt-4">
            <div className="text-md font-poppins text-gray-600">Inventory Level</div>
            <div className="w-full bg-gray-300 rounded-full h-5">
                <div
                    className={`h-5 rounded-full ${getProgressBarColor(predictions ? parseInt(predictions.steel) : 0)}`}
                    style={{ width: `${getProgressValue(predictions ? parseInt(predictions.steel) : 0)}%` }}
                ></div>
            </div>
        </div>
    </div>
    <div className="bg-gray-200 text-black p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold">Sand</h3>
        <img 
            src="/assets/sand.jpeg" 
            alt="Sand Image" 
            className="mt-4 w-full h-auto object-cover rounded-lg" 
        />
        <div className="mt-4">
            <div className="text-md font-poppins text-gray-600">Inventory Level</div>
            <div className="w-full bg-gray-300 rounded-full h-5">
                <div
                    className={`h-5 rounded-full ${getProgressBarColor(predictions ? parseInt(predictions.sand) : 0)}`}
                    style={{ width: `${getProgressValue(predictions ? parseInt(predictions.sand) : 0)}%` }}
                ></div>
            </div>
        </div>
    </div>
    <div className="bg-gray-200 text-black p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold">Gravel</h3>
        <img 
            src="/assets/gravel1.jpg" 
            alt="Sand Image" 
            className="mt-4 w-full h-auto object-cover rounded-lg" 
        />
        <div className="mt-4">
            <div className="text-md font-poppins text-gray-600">Inventory Level</div>
            <div className="w-full bg-gray-300 rounded-full h-5">
                <div
                    className={`h-5 rounded-full ${getProgressBarColor(predictions ? parseInt(predictions.sand) : 0)}`}
                    style={{ width: `${getProgressValue(predictions ? parseInt(predictions.sand) : 0)}%` }}
                ></div>
            </div>
        </div>
    </div>
</div>
</div>   
</div>  
  );
};

export default RawMaterialsPage;
