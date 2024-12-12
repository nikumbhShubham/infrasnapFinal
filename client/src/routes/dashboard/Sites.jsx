import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSite, setCurrentSite,setSites } from "../../redux/Site/siteSlice";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs
} from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import {

  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage"

const Sites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user);
  const sites = useSelector((state) => state.sites.sites);
  console.log(sites)
  console.log(user)

  // Filter sites by current user's UID
  useEffect(() => {
    const fetchSites = async () => {
      try {
        const sitesCollectionRef = collection(db, "sites");
        const querySnapshot = await getDocs(sitesCollectionRef);

        const fetchedSites = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Include Firestore document ID
          ...doc.data()
        }));

        // Dispatch the fetched sites to Redux store
        dispatch(setSites(fetchedSites));
      } catch (error) {
        console.error("Error fetching sites:", error);
      }
    };

    fetchSites();
  }, [dispatch]);

  // Filter sites by current user's UID
  const userSites = sites.filter(site => site.userId === user?.uid);
  // console.log(userSites)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContinueModal, setIsContinueModal] = useState(false); // Track which modal is open
  const [buildings, setBuildings] = useState([{ id: 1, floors: 1 }]);

  const [formData, setFormData] = useState({
    // siteName: "",
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
    navigate('/dashboard/upload')
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
    <section className="p-6 bg-gray-100 min-h-screen">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.displayName}!</h1>
      <p className="text-gray-600">Manage your projects efficiently and effortlessly.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div
        className="bg-white border rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-2xl transition"
        onClick={toggleModal}
      >
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Create New Project</h2>
        <p className="text-gray-500">Start a new project and bring your ideas to life.</p>
      </div>
      <div
        className="bg-white border rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-2xl transition"
        onClick={() => navigate("/dashboard")}
      >
        <h2 className="text-xl font-semibold text-green-600 mb-4">Continue Existing Project</h2>
        <p className="text-gray-500">Pick up where you left off and continue your progress.</p>
      </div>
    </div>

    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Sites</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {userSites.map((site) => (
        <div
          key={site.id}
          className="bg-white border rounded-lg shadow-lg hover:shadow-2xl transition p-4 cursor-pointer"
          onClick={() => handleSiteCardClick(site.id)}
        >
          <img
            src={site.sitePlanImageUrl || "/placeholder.png"}
            alt={site.siteName}
            className="w-full h-32 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800">{site.siteName}</h3>
          <p className="text-gray-500 text-sm">{site.city}, {site.state}</p>
        </div>
      ))}
    </div>

    {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-lg">
          <h2 className="text-2xl font-semibold mb-4">Create New Project</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="siteName"
              value={formData.siteName}
              onChange={handleInputChange}
              placeholder="Site Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="State"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="file"
              name="sitePlanImage"
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
  </section>
  );
};

export default Sites;



