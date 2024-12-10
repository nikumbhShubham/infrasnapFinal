import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase"; // Import your Firebase configuration
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { PlusCircle, MinusCircle, Trash2 } from "lucide-react";

// Register required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const RawMaterialsPage = () => {
  const [inventory, setInventory] = useState([]);
  const [materials, setMaterials] = useState([{ material: "", quantity: "" }]);
  const [selectedId, setSelectedId] = useState(null);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const site = useSelector((state) => state.sites.currentSite); // Get current site ID from Redux
  const siteId = site.id;

  // Fetch raw materials from Firestore
  const fetchInventory = async () => {
    const querySnapshot = await getDocs(collection(db, "rawMaterials"));
    const materialsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setInventory(materialsData);
  };

  useEffect(() => {
    fetchInventory(); // Fetch inventory on component mount
  }, []);

  // Add multiple materials
  const handleAddMaterials = async () => {
    const validMaterials = materials.filter(
      (item) => item.material && item.quantity
    );

    for (const item of validMaterials) {
      await addDoc(collection(db, "rawMaterials"), {
        material: item.material,
        quantity: parseInt(item.quantity),
        siteId,
      });
    }
    resetForm();
    fetchInventory(); // Refresh inventory list
    setShowCreatePopup(false); // Close popup after adding
  };

  // Update material
  const handleUpdateMaterial = async () => {
    if (selectedId && materials[0].material && materials[0].quantity) {
      const materialRef = doc(db, "rawMaterials", selectedId);
      await updateDoc(materialRef, {
        material: materials[0].material,
        quantity: parseInt(materials[0].quantity),
      });
      resetForm();
      fetchInventory(); // Refresh inventory list
      setShowUpdatePopup(false); // Close popup after updating
    }
  };

  // Delete material
  const handleDeleteMaterial = async (id) => {
    const materialRef = doc(db, "rawMaterials", id);
    await deleteDoc(materialRef);
    fetchInventory(); // Refresh inventory list
  };

  // Reset form fields
  const resetForm = () => {
    setMaterials([{ material: "", quantity: "" }]);
    setSelectedId(null);
  };

  // Add a new material input field
  const addMaterialField = () => {
    setMaterials([...materials, { material: "", quantity: "" }]);
  };

  // Remove a material input field
  const removeMaterialField = (index) => {
    const updatedMaterials = [...materials];
    updatedMaterials.splice(index, 1);
    setMaterials(updatedMaterials);
  };

  // Handle input change
  const handleInputChange = (index, field, value) => {
    const updatedMaterials = [...materials];
    updatedMaterials[index][field] = value;
    setMaterials(updatedMaterials);
  };

  // Calculate total inventory
  const totalInventory = inventory.reduce(
    (total, item) => total + parseInt(item.quantity || 0),
    0
  );

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="text-5xl font-bold mb-8">
        <span className="bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text text-transparent">
          Raw Materials
        </span>
        <span className="text-gray-800"> Management</span>
      </header>

      <div className="flex gap-4 mb-6">
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-700"
          onClick={() => setShowCreatePopup(true)}
        >
          Add Material
        </button>
        <button
          className="bg-green-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-green-700"
          onClick={() => setShowUpdatePopup(true)}
        >
          Update Material
        </button>
      </div>

      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {inventory.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{item.material}</h3>
            <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500"
                style={{ width: `${(item.quantity / totalInventory) * 100 || 0}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {((item.quantity / totalInventory) * 100 || 0).toFixed(2)}% of total
              inventory
            </p>
          </div>
        ))}
      </div>

      {/* Material Management Table */}
      <table className="w-full border-collapse bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left font-semibold">Material</th>
            <th className="p-4 text-left font-semibold">Quantity</th>
            <th className="p-4 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-4">{item.material}</td>
              <td className="p-4">{item.quantity}</td>
              <td className="p-4">
                <button
                  onClick={() => handleDeleteMaterial(item.id)}
                  className="text-red-500 hover:text-red-700 flex items-center gap-2"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Create Inventory Popup */}
      {showCreatePopup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl w-1/3 relative">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900"
              onClick={() => setShowCreatePopup(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6">Add New Material</h2>
            {materials.map((item, index) => (
              <div key={index} className="flex items-center gap-4 mb-4">
                <input
                  type="text"
                  value={item.material}
                  onChange={(e) =>
                    handleInputChange(index, "material", e.target.value)
                  }
                  placeholder="Enter material name"
                  className="border border-gray-300 p-3 rounded-lg flex-1"
                />
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleInputChange(index, "quantity", e.target.value)
                  }
                  placeholder="Enter quantity"
                  className="border border-gray-300 p-3 rounded-lg flex-1"
                />
                <button
                  onClick={addMaterialField}
                  className="text-green-500 hover:text-green-700"
                >
                  <PlusCircle size={24} />
                </button>
                {index > 0 && (
                  <button
                    onClick={() => removeMaterialField(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MinusCircle size={24} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={handleAddMaterials}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4"
            >
              Add Materials
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RawMaterialsPage;
