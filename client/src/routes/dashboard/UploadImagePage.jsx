import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";
import { storage } from "../../config/firebase";
import { updateSite } from "../../redux/Site/siteSlice";

const UploadMediaPage = () => {
  const [media, setMedia] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [folders, setFolders] = useState({
    Foundation: 0,
    SubStructure: 0,
    Plinth: 0,
    SuperStructure: 0,
    Finishing: 0,
  });
  const [subStageProgress, setSubStageProgress] = useState({});
  const [activeFolder, setActiveFolder] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const site = useSelector((state) => state.sites.currentSite);

  const handleUploadMedia = (event) => {
    const file = event.target.files[0];
    if (file) {
      const type = file.type.split("/")[0];
      if (type !== "image" && type !== "video") {
        alert("Please upload only image or video files");
        return;
      }

      const mediaUrl = URL.createObjectURL(file);
      setMedia(mediaUrl);
      setMediaFile(file);
      setMediaType(type);
    }
  };

  const MediaPreview = ({ mediaUrl, type }) => {
    if (type === "image") {
      return (
        <img
          src={mediaUrl}
          alt="Uploaded"
          className="w-full h-72 object-cover rounded-lg shadow-md"
        />
      );
    } else if (type === "video") {
      return (
        <video
          src={mediaUrl}
          controls
          className="w-full h-72 object-cover rounded-lg shadow-md"
        />
      );
    }
    return null;
  };

  const handlePredict = async () => {
    if (!mediaFile) {
      alert("Please upload a media file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", mediaFile);
    formData.append("mediaType", mediaType);

    try {
      setIsLoading(true);
      setPredictions(null);

      const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { stage, overall_progress, sub_stage_progress } = response.data;

      setPredictions(response.data);
      setFolders((prevFolders) => ({
        ...prevFolders,
        [stage]: Math.max(prevFolders[stage] || 0, overall_progress),
      }));
      setSubStageProgress((prev) => ({
        ...prev,
        [stage]: sub_stage_progress,
      }));
    } catch (error) {
      console.error("Error fetching predictions:", error);
      alert("Error fetching predictions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToFolder = async () => {
    if (!predictions || !mediaFile) return;

    try {
      setIsLoading(true);

      const folderPath = `${user.uid}/${site.id}/${predictions.stage}/${predictions.sub_stage_name}`;
      const storageRef = ref(storage, `${folderPath}/${mediaFile.name}`);
      const snapshot = await uploadBytes(storageRef, mediaFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const siteData = {
        ...site,
        [predictions.stage]: {
          ...(site[predictions.stage] || {}),
          [predictions.sub_stage_name]: {
            media: [
              ...((site[predictions.stage]?.[predictions.sub_stage_name]?.media) || []),
              {
                url: downloadURL,
                type: mediaType,
                timestamp: new Date().toISOString(),
              },
            ],
          },
        },
      };

      dispatch(updateSite(siteData));
      alert("Media added to folder successfully!");

      setMedia(null);
      setMediaFile(null);
      setMediaType(null);
      setPredictions(null);
    } catch (error) {
      console.error("Error adding media to folder:", error);
      alert("Error adding media to folder. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFolderClick = (folder) => {
    setActiveFolder(folder);
    navigate(`/dashboard/${folder.toLowerCase()}`);
  };

  const CustomLoader = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      <p className="text-indigo-600 font-semibold">Analyzing Media...</p>
    </div>
  );

  const renderUploadSection = () => (
    <div className="flex flex-col items-center mt-10 space-y-10">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl w-full mb-8 transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-6 text-center">
          UPLOAD MEDIA
        </h2>
        <label
          htmlFor="file-upload"
          className="w-full h-72 border-4 border-dashed border-indigo-500 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:border-indigo-700 transition ease-in-out duration-300"
        >
          <span className="text-indigo-600 text-lg mb-2">Click to Upload Media</span>
          <span className="text-gray-500 text-sm">Supports images and videos</span>
        </label>
        <input
          type="file"
          accept="image/,video/"
          id="file-upload"
          onChange={handleUploadMedia}
          className="hidden"
        />
        {media && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full mt-6"
          >
            <MediaPreview mediaUrl={media} type={mediaType} />
          </motion.div>
        )}
      </div>

      {!isLoading ? (
        <motion.button
          onClick={handlePredict}
          className="w-64 py-3 bg-indigo-600 text-white text-lg rounded-lg mb-6 hover:bg-indigo-700 transition ease-in-out duration-300 transform hover:scale-110 hover:shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          disabled={!mediaFile}
        >
          Predict
        </motion.button>
      ) : (
        <CustomLoader />
      )}

      {predictions && (
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl w-full mb-8">
          <h2 className="text-3xl font-semibold text-indigo-600 mb-4 text-center">
            PREDICTION RESULTS
          </h2>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Predicted Stage:</strong> {predictions.stage}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Predicted Activity:</strong> {predictions.activity}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Predicted Components:</strong> {predictions.components}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Predicted Sub-stage:</strong> {predictions.sub_stage_name}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Overall Progress:</strong> {predictions.overall_progress}
          </p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700">Sub-stage Progress:</h3>
            {Object.entries(subStageProgress[predictions.stage] || {}).map(([subStage, progress]) => (
              <p key={subStage} className="text-gray-600">
                {subStage}: {progress}%
              </p>
            ))}
          </div>
        </div>
      )}

      {predictions && (
        <motion.button
          onClick={handleAddToFolder}
          className="w-64 py-3 bg-indigo-600 text-white text-lg rounded-lg mb-8 hover:bg-indigo-700 transition ease-in-out duration-300 transform hover:scale-110 hover:shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Add to Folder
        </motion.button>
      )}

      <div className="flex flex-wrap justify-center gap-6 w-full mt-10">
        {Object.keys(folders).map((folder) => (
          <div key={folder} className="w-48">
            <div className="w-full bg-gray-300 rounded-full h-2 mb-2 relative">
              <div
                className="bg-blue-600 h-full rounded-full"
                style={{ width: `${folders[folder]}%` }}
              />
              <div className="absolute right-0 top-0 text-xs font-semibold text-blue-600">
                {folders[folder]}%
              </div>
            </div>
            <motion.div
              className="w-48 h-48 bg-white border-2 border-indigo-500 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-100 transition ease-in-out duration-300"
              onClick={() => handleFolderClick(folder)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-lg font-semibold text-indigo-600">{folder}</h3>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFolderView = () => (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-3xl font-semibold text-indigo-600 mb-6">
        {activeFolder} Media
      </h2>
      <motion.button
        onClick={() => setActiveFolder(null)}
        className="mb-6 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition ease-in-out duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Back to Folders
      </motion.button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 p-10">
      {!activeFolder ? renderUploadSection() : renderFolderView()}
    </div>
  );
};

export default UploadMediaPage;
