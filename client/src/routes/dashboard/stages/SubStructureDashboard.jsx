import React, { useEffect, useState } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../../config/firebase";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SubStructureDashboard = () => {
  const [allSubStrutureImages, setallSubStrutureImages] = useState([]);
  const [stageImages, setStageImages] = useState({});
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);
  const site = useSelector((state) => state.sites.currentSite);

  const stages = [
    "Plinth Beam Construction",
    "Backfilling and Compaction",
    "Retaining Walls",
    "Waterproofing and Damp-Proofing",
    "Preparation for the Transition Stage",
  ];

  useEffect(() => {
    const fetchImages = async () => {
      const basePath = `${user.uid}/${site.id}/SubStructure`;
      const storageRef = ref(storage, basePath);

      try {
        const allImages = [];
        const stageImagesTemp = {};

        // Initialize stageImagesTemp with empty arrays for each stage
        stages.forEach((stage) => {
          stageImagesTemp[stage] = [];
        });

        const listFilesRecursive = async (directoryRef, currentPath) => {
          const result = await listAll(directoryRef);

          // Add files to the appropriate category
          for (const fileRef of result.items) {
            const url = await getDownloadURL(fileRef);
            allImages.push(url);

            // Check if the current path matches a stage
            for (const stage of stages) {
              if (currentPath.includes(stage)) {
                stageImagesTemp[stage].push(url);
              }
            }
          }

          // Recursively process subdirectories
          for (const folderRef of result.prefixes) {
            await listFilesRecursive(folderRef, `${currentPath}/${folderRef.name}`);
          }
        };

        await listFilesRecursive(storageRef, basePath);

        setallSubStrutureImages(allImages);
        setStageImages(stageImagesTemp);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [user.uid, site.id]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
        <p className="text-white text-2xl animate-pulse">Loading images...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-50 p-8">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-bold text-indigo-700 text-center mb-4">subStructure Dashboard</h1>
        <p className="text-gray-500 text-center max-w-2xl mx-auto">
          Explore all foundation images categorized into their respective stages. Click on an image for a closer look!
        </p>
      </header>

      {/* All Foundation Images - Carousel */}
      <section className="mb-16">
        <h2 className="text-4xl font-semibold text-indigo-600 mb-8">All Foundation Images</h2>
        <Slider {...sliderSettings}>
          {allSubStrutureImages.map((url, index) => (
            <div key={index} className="p-4">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
                <img
                  src={url}
                  //   alt={Foundation Image ${index + 1}}
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Specific Stages */}
      {stages.map((stage) => (
        <section key={stage} className="mb-16">
          <h2 className="text-4xl font-semibold text-blue-600 mb-8">{stage}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {stageImages[stage]?.length > 0 ? (
              stageImages[stage].map((url, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
                >
                  <img
                    src={url}
                    // alt={${stage} Image ${index + 1}}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-900 bg-opacity-60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <p className="text-white font-semibold text-lg">View Image</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">No images found for {stage}</p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default SubStructureDashboard;