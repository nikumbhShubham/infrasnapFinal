import { useState, useEffect } from "react";

const VideoLoader = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Automatically play the video once it is loaded
    if (isVideoLoaded) {
      const videoElement = document.getElementById("mainVideo");
      videoElement.play();
    }

    // Add event listener to skip video on any screen tap/click
    const handleTap = () => {
      console.log("Video skipped!");
      onComplete(); // Notify parent (App.jsx) to load HeroSection
    };

    // Adding the event listener
    document.addEventListener("click", handleTap);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleTap);
    };
  }, [isVideoLoaded, onComplete]);

  const handleVideoLoad = () => {
    console.log("Video loaded successfully!");
    setIsVideoLoaded(true);
    setIsLoading(false);
  };

  const handleVideoEnd = () => {
    console.log("Video playback finished!");
    onComplete(); // Notify parent (App.jsx) to load HeroSection after video ends
  };

  return (
    <div className="relative w-full h-screen font-montserrat">
      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-white text-2xl">Loading Video...</div>
        </div>
      )}

      {/* Video Section */}
      <video
        id="mainVideo"
        src="assets/final4.mp4"
        className="w-full h-full object-cover"
        muted
        onLoadedData={handleVideoLoad}
        onEnded={handleVideoEnd} // Handle video completion
        onError={() => console.error("Failed to load the video. Check the path.")}
        style={{ display: isLoading ? "none" : "block" }}
      ></video>
    </div>
  );
};

export default VideoLoader; 