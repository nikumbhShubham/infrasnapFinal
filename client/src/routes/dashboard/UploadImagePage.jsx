import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../config/firebase";


const UploadImagePage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user);
  const site = useSelector((state) => state.sites.currentSite);
  console.log(site.id)
  console.log(user.uid)

  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [predictionStage, setPredictionStage] = useState()
  const [folders, setFolders] = useState({
    Foundation: 0,
    SubStructure: 0,
    Plinth: 0,
    SuperStructure: 0,
    Finishing: 0,
  });
  const [activeFolder, setActiveFolder] = useState(null);

  const handleUploadImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      alert("No file selected.");
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setImageFile(file);
  };

  const handlePredict = async () => {
    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { stage, progress } = response.data;
      const cleanedStage = stage.replace(/\\/g, "").trim();

      setPredictions(response.data);
      setFolders((prev) => ({
        ...prev,
        [cleanedStage]: progress || 0,
      }));
      setPredictionStage(predictions.stage)
    } catch (error) {
      console.error("Error fetching predictions:", error);
      alert("Error fetching predictions. Please try again.");
    }
  };

  console.log(predictionStage)
  const handleAddToFolder = async () => {
    if (!predictions || !imageFile) return;

    try {
      // Upload to Firebase Storage
      
      const folderPath = `${user.uid}/${site.id}/${predictions.stage}`;

      const storageRef = ref(storage, `${folderPath}}`);
      const snapshot = await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Update Firestore
      const docRef = doc(db, "sites", site.id);
      await updateDoc(docRef, {
        [`${predictions.stage}.images`]: arrayUnion(downloadURL),
      });

      alert("Image added to folder and Firestore successfully!");
      setImage(null);
      setImageFile(null);
      setPredictions(null);
    } catch (error) {
      console.error("Error adding image to folder:", error);
      alert("Error adding image to folder. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 p-10">
      {!activeFolder ? (
        <div className="flex flex-col items-center mt-10 space-y-10">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl w-full mb-8">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-6 text-center">UPLOAD IMAGE</h2>
            <label
              htmlFor="file-upload"
              className="w-full h-72 border-4 border-dashed border-indigo-500 rounded-lg flex justify-center items-center cursor-pointer hover:border-indigo-700"
              aria-label="Upload an image"
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
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full mt-6">
                <img src={image} alt="Uploaded" className="w-full h-72 object-cover rounded-lg shadow-md" />
              </motion.div>
            )}
          </div>

          <motion.button
            onClick={handlePredict}
            className="w-64 py-3 bg-indigo-600 text-white text-lg rounded-lg mb-6 hover:bg-indigo-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Predict
          </motion.button>
           
          {predictions && (
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl w-full mb-8">
              <h2 className="text-3xl font-semibold text-indigo-600 mb-4 text-center">PREDICTION RESULTS</h2>
              <p className="text-lg text-gray-700 mb-2">
                <strong>Predicted Stage:</strong> {predictions?.stage?.replace(/\\/g, "") || "No stage detected"}
              </p>
              <p className="text-lg text-gray-700 mb-2">
                <strong>Predicted Activity:</strong> {predictions?.activity || "N/A"}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Predicted Components:</strong> {predictions?.components || "N/A"}
              </p>
            </div>
          )}

          {predictions && (
            <motion.button
              onClick={handleAddToFolder}
              className="w-64 py-3 bg-indigo-600 text-white text-lg rounded-lg mb-8 hover:bg-indigo-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Add to Folder
            </motion.button>
          )}

          <div className="flex justify-around w-full mt-10 space-x-6">
            {Object.keys(folders).map((folder) => (
              <div key={folder} className="w-48 h-48 flex flex-col items-center justify-center">
                <div className="w-full bg-gray-300 rounded-full h-2 mb-2 relative">
                  <div
                    className="bg-blue-600 h-full rounded-full"
                    style={{ width: `${folders[folder]}%` }}
                  />
                  <div className="absolute top-0 text-xs font-semibold text-blue-600" style={{ left: "100%", transform: "translateX(-50%)" }}>
                    {folders[folder]}%
                  </div>
                </div>
                <motion.div
                  className="w-48 h-48 bg-white border-2 border-indigo-500 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-100"
                  onClick={() => setActiveFolder(folder)}
                >
                  <h3 className="text-lg font-semibold text-indigo-600">{folder}</h3>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-10">
          <h2 className="text-3xl font-semibold text-indigo-600 mb-6">{activeFolder} Images</h2>
          <motion.button
            onClick={() => setActiveFolder(null)}
            className="mb-6 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Back to Folders
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default UploadImagePage;
