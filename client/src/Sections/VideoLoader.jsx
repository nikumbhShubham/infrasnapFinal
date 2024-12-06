import { useState } from "react";
import About from "./About";
import Features from "./Features";
import Footer from "./Footer";
import Navbar from "./Navbar";

const VideoLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoLoad = () => {
    console.log("Video loaded successfully!");
    setIsVideoLoaded(true);
    setIsLoading(false);
    // Play the video once it's loaded
    const videoElement = document.getElementById("mainVideo");
    videoElement.play(); // Start the video after loading
    setIsPlaying(true); // Update the state to reflect that the video is playing
  };

  const toggleVideoPlayback = () => {
    const videoElement = document.getElementById("mainVideo");
    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-screen font-montserrat">
      {/* Loading Screen */}
      {/* <Navbar/> */}
      {isLoading && (
        <div className="absolute inset-0  flex items-center justify-center">
          <div className="text-black text-2xl">Loading...</div>
        </div>
      )}

      {/* Video Section */}
      <video
        id="mainVideo"
        src="assets/final2.mp4"
        className="w-full h-full object-cover"
        muted
        onLoadedData={handleVideoLoad}
        onError={() => console.error("Failed to load the video. Check the path.")}
        style={{ display: isLoading ? "none" : "block" }}
      ></video>

      {/* Start/Pause Button */}
      {!isLoading && isVideoLoaded && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={toggleVideoPlayback}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            {isPlaying ? "Pause " : "Start "}
          </button>
        </div>
      )}
      <About/>
      <Features/>
      <Footer/>

    </div>
  );
};

export default VideoLoader;