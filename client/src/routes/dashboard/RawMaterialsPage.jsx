// import { div } from 'framer-motion/client';
import React, { useState } from 'react';

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
            <header className="flex justify-between items-center mb-8">
                <div>
                    <button
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-blue-700 mr-6"
                        onClick={handleCreateInventory}
                    >
                        Create Inventory
                    </button>
                    <button
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-blue-700"
                        onClick={handleUpdateInventory}
                    >
                        Update Inventory
                    </button>
                </div>
            </header>

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
            <div className="mt-8 bg-white p-8 rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Raw Materials Prediction</h2>

                {/* Instructions for uploading */}
                <p className="text-gray-700 mb-4">
                    <strong>Instructions:</strong> Upload the floor plan image first. Please ensure that the image has good quality and dimensions of at least 800x600 pixels.
                </p>

                {/* Image Upload */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Upload Floor Plan Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUploadImage}
                        className="border border-gray-300 p-3 rounded-lg w-full"
                    />
                </div>

                {/* Display Uploaded Image */}
                {floorPlanImage && (
                    <div className="mt-4">
                        <h4 className="text-xl font-bold">Uploaded Floor Plan</h4>
                        <img src={floorPlanImage} alt="Floor Plan" className="w-full max-w-md mt-2" />
                    </div>
                )}

                {/* Button to trigger predictions */}
                <button
                    onClick={handlePredict}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4 transform transition duration-300 hover:scale-105 hover:bg-blue-700"
                >
                    Predict Raw Materials
                </button>

                {/* Predictions */}
                {predictions && (
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                        <h3 className="text-xl font-bold">Predicted Raw Materials:</h3>
                        <ul className="mt-2">
                            <li>Cement: {predictions.cement}</li>
                            <li>Steel: {predictions.steel}</li>
                            <li>Sand: {predictions.sand}</li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Material Cards Below Prediction Section */}
            <div className="mt-8 grid grid-cols-3 gap-6">
                <div className="bg-gray-200 text-black p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold">Cement</h3>
                    <div className="mt-4">
                        <div className="text-sm text-gray-600">Inventory Level</div>
                        <div className="w-full bg-gray-300 rounded-full h-2.5">
                            <div
                                className='{h - 2.5 rounded-full ${getProgressBarColor(predictions ? parseInt(predictions.cement) : 0)}}
                                style={{ width: ${getProgressValue(predictions ? parseInt(predictions.cement) : 0)}% }}'
                            ></div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-200 text-black p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold">Steel</h3>
                    <div className="mt-4">
                        <div className="text-sm text-gray-600">Inventory Level</div>
                        <div className="w-full bg-gray-300 rounded-full h-2.5">
                            <div
                                className='{h - 2.5 rounded-full ${getProgressBarColor(predictions ? parseInt(predictions.steel) : 0)}}
                            style={{ width: ${getProgressValue(predictions ? parseInt(predictions.steel) : 0)}% }}'
                            ></div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-200 text-black p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold">Sand</h3>
                    <div className="mt-4">
                        <div className="text-sm text-gray-600">Inventory Level</div>
                        <div className="w-full bg-gray-300 rounded-full h-2.5">
                            <div
                                className='{h - 2.5 rounded-full ${getProgressBarColor(predictions ? parseInt(predictions.sand) : 0)}}
                        style={{ width: ${getProgressValue(predictions ? parseInt(predictions.sand) : 0)}% }}'
                            ></div>
                        </div>
                    </div>
                </div >
            </div >
        </div>
    )
};

export default RawMaterialsPage;