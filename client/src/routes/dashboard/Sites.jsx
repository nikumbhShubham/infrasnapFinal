import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSite,setCurrentSite } from "../../redux/Site/siteSlice";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import {

  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage"

const Sites = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user);
  const sites = useSelector((state) => state.sites.sites);
  console.log(sites)
  console.log(user)

  // Filter sites by current user's UID
  const userSites = sites.filter(site => site.userId === user?.uid);
  console.log(userSites)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContinueModal, setIsContinueModal] = useState(false); // Track which modal is open
  const [buildings, setBuildings] = useState([{ id: 1, floors: 1 }]);

  const [formData, setFormData] = useState({
    siteName: "",
    city: "",
    state: "",
    country: "",
    deadline: "",
    budget: "",
    currentStage: "",
    sitePlanImage: null,

  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    // Handle file input separately
    if (name === "sitePlanImage" && files) {
      setFormData(prev => ({
        ...prev,
        sitePlanImage: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  const handleSiteCardClick = (siteId) => {
    dispatch(setCurrentSite(siteId));
    // Optionally, you could add navigation logic here
    // For example: navigate(`/site/${siteId}`)
    navigate('/dashboard/analytics')
  };

  // Submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate required fields
      if (!formData.siteName || !user) {
        alert("Please fill in all required fields and ensure you are logged in.");
        return;
      }

      // Upload site plan image
      let imageUrl = null;
      if (formData.sitePlanImage) {
        const imageRef = ref(storage, `sitePlans/${Date.now()}_${formData.sitePlanImage.name}`);
        const snapshot = await uploadBytes(imageRef, formData.sitePlanImage);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Prepare site data with safe fallbacks
      const siteData = {
        // Use optional chaining or provide a fallback for user ID
        userId: user?.uid || user?.id || 'unknown-user',
        siteName: formData.siteName,
        city: formData.city || '',
        state: formData.state || '',
        country: formData.country || '',
        deadline: formData.deadline || null,
        budget: formData.budget ? parseFloat(formData.budget) : 0,
        currentStage: isContinueModal ? formData.currentStage : "New Project",
        sitePlanImageUrl: imageUrl,
        buildings: buildings.map(building => ({
          buildingNumber: building.id,
          floors: building.floors
        })),
        createdAt: serverTimestamp()
      };

      // Save to Firestore
      const docRef = await addDoc(collection(db, "sites"), siteData);

      // Dispatch the action to add the site to Redux
      dispatch(addSite(siteData))

      // Reset form 
      setFormData({
        siteName: "",
        city: "",
        state: "",
        country: "",
        deadline: "",
        budget: "",
        currentStage: "",
        sitePlanImage: null
      });
      setBuildings([{ id: 1, floors: 1 }]);
      toggleModal();

      console.log("Site added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding site: ", error);
      // Show user-friendly error message
      alert("Failed to add site. Please try again.");
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsContinueModal(false); // Reset continue modal flag
  };

  const toggleContinueModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsContinueModal(true); // Set continue modal flag
  };

  const addBuilding = () => {
    setBuildings([...buildings, { id: buildings.length + 1, floors: 1 }]);
  };

  const removeBuilding = (id) => {
    setBuildings(buildings.filter((building) => building.id !== id));
  };

  const updateFloors = (id, floors) => {
    setBuildings(
      buildings.map((building) =>
        building.id === id ? { ...building, floors } : building
      )
    );
  };

  return (
    <section>
      <h2>
        Hello {user.displayName}, kaise ho bhai
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-around m-8">
        {/* Create Project Card */}
        <div className="w-[250px] h-[250px] border border-blue-200 rounded-lg shadow-lg hover:shadow-2xl flex flex-col items-center">
          <button onClick={toggleModal}>
            <img
              src="/assets/about.jpg"
              alt=""
              className="p-2 w-full max-w-8xl mx-auto mt-2"
            />
            <h2 className="text-xl font-semibold m-4">Create Project</h2>
          </button>
        </div>

        {/* Continue Project Card */}
        <div className="w-[250px] h-[250px] border border-blue-200 rounded-lg shadow-lg hover:shadow-2xl flex flex-col items-center">
          <button onClick={toggleContinueModal}>
            <img
              src="/assets/about.jpg"
              alt=""
              className="p-2 w-full max-w-8xl mx-auto mt-2"
            />
            <h2 className="text-xl font-semibold m-4">Continue Project</h2>
          </button>
        </div>
      </div>

      <h2 className="flex items-center justify-center mt-10 text-4xl font-bold">
        Your Sites
      </h2>

      <div className="flex flex-wrap items-center justify-center m-8 p-4 gap-6 h-[400px] overflow-y-scroll border border-gray-300 rounded-lg shadow-lg">
        {/* Dynamic Project Cards */}
        {userSites.map((site) => (
          <div 
            key={site.id} 
            className="w-[250px] h-[250px] border border-blue-200 rounded-lg shadow-lg hover:shadow-2xl flex flex-col items-center cursor-pointer"
            onClick={() => handleSiteCardClick(site.id)} // Add click handler
          >
            <img 
              src={site.sitePlanImageUrl} 
              alt={site.siteName} 
              className="p-2 w-full max-w-8xl mx-auto mt-2" 
            />
            <h2 className="text-xl font-semibold m-4">{site.siteName}</h2>
          </div>
        ))}


        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white/50 backdrop-blur-lg p-8 rounded-lg w-[90%] max-w-3xl shadow-lg max-h-screen overflow-y-auto">
              <span className="absolute cursor-pointer px-4 py-2 top-2 right-2 text-xl font-semibold rounded-lg " onClick={toggleModal}  >X</span>
              <h2 className="text-2xl font-bold mb-4 text-center">
                {isContinueModal ? "Continue Your Project" : "Create New Project"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Site Name */}
                <div>
                  <label className="block text-sm font-medium">Site Name</label>
                  <input
                    type="text"
                    name="siteName"
                    value={formData.siteName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter site name"
                  />
                </div>

                {/* Dynamic Buildings */}
                <div>
                  <label className="block text-sm font-medium">Buildings and Floors</label>
                  {buildings.map((building, index) => (
                    <div
                      key={building.id}
                      className="flex items-center space-x-4 mb-4"
                    >
                      <span className="text-gray-600 font-medium">
                        Building {index + 1}
                      </span>
                      <input
                        type="number"
                        value={building.floors}
                        onChange={(e) =>
                          updateFloors(building.id, Number(e.target.value))
                        }
                        min="1"
                        className="w-20 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Floors"
                      />
                      <button
                        type="button"
                        onClick={() => removeBuilding(building.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        -
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addBuilding}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    + Add Building
                  </button>
                </div>

                {/* Current Stage of Construction (only for Continue Project) */}
                {isContinueModal && (
                  <div>
                    <label className="block text-sm font-medium">
                      Current Stage of Construction
                    </label>
                    <input
                      type="text"
                      name="currentStage"
                      value={formData.currentStage}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter current stage"
                    />
                  </div>
                )}

                {/* City */}
                <div>
                  <label className="block text-sm font-medium">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter city"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter state"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter country"
                  />
                </div>

                {/* Final Site Plan Image */}
                <div>
                  <label className="block text-sm font-medium">
                    Final Site Plan Image
                  </label>
                  <input
                    type="file"
                    name="sitePlanImage"
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-medium">Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium">Budget</label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter budget"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Sites;



