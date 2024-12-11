import React from 'react';
import { ChartColumnIncreasing, Target, BriefcaseBusiness, ClipboardPlus } from 'lucide-react'

const FeaturesSection = () => {
  return (
    <div className=" py-16 px-6 md:px-12 lg:px-24 mt-10">
      {/* Heading Section */}
      <div className="text-center max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl md:text-6xl font-bold bg-gradient-to-t from-[#1a4c9d] to-[#101a32] bg-clip-text text-transparent mb-4">
          Lead tracking to analytics, everything your team needs for success<br />
        </h2>
        <p className="text-gray-600 text-lg mb-8 font-poppins">
          Our platform brings all your construction needs on your fingertips. Discover how we can help you <br />stay organized, save time, and grow your business.
        </p>
        <div className="flex justify-center gap-6">
          <span className="flex items-center gap-2 text-gray-600  font-poppins font-medium">
            <Target className="w-6 h-6 rounded-full p-1 bg-gradient-to-t from-[#cbcccd] to-[#ced8f0]  text-blue-950 " />
            Progress and Stage Management
          </span>
          <span className="flex items-center gap-2 text-gray-600 font-poppins font-medium">
            <BriefcaseBusiness className="w-6 h-6 rounded-full p-1 bg-gradient-to-t from-[#cbcccd] to-[#ced8f0]  text-blue-950" />
            Dashboard Controls
          </span>
          <span className="flex items-center gap-2 text-gray-600 font-poppins font-medium">
            <ClipboardPlus className="w-6 h-6 rounded-full p-1 bg-gradient-to-t from-[#cbcccd] to-[#ced8f0]  text-blue-950" />
            Daily Reporting
          </span>
        </div>

      </div>

      {/* Features Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <div className="bg-[#f5fbff] p-6 rounded-xl shadow-md border border-blue-400">
          <div className="mb-4">
            <div className="w-12 h-12 bg-gradient-to-t from-[#dde9f5] to-[#ced8f0]  text-blue-950 rounded-full flex items-center justify-center text-lg font-bold">
              {/* Icon Placeholder */}
              <ChartColumnIncreasing />
            </div>
          </div>
          <h3 className="text-xl font-montserrat font-bold text-gray-800 mb-2">Smart Analytics</h3>
          <p className="text-gray-600 mb-4 font-poppins">
            Leverage advanced analytics and ML to gain deeper insights into your construction progress.
          </p>
          <div className="relative p-4 rounded overflow-hidden">
            {/* Image */}
            <img src="assets/ana.png" alt="Analytics" className="w-full h-auto" />
            {/* Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[rgba(255,255,255,0.9)] to-[rgba(255,255,255,0)] pointer-events-none"></div>
          </div>
        </div>


        {/* Card 2 */}
        <div className="bg-[#f5fbff] p-6 rounded-xl shadow-md border border-blue-400" >
          <div className="mb-4">
            <div className="w-12 h-12 bg-gradient-to-t from-[#dde9f5] to-[#ced8f0]  text-blue-950  rounded-full flex items-center justify-center text-lg font-bold">
              {/* Icon Placeholder */}
              <ClipboardPlus className="w-6 h-6 rounded-full p-1 bg-gradient-to-t from-[#cbcccd] to-[#ced8f0]  text-blue-950" />
            </div>
          </div>
          <h3 className="text-xl  text-gray-800 mb-2 font-montserrat font-bold">Stay updated with Daily Reports</h3>
          <p className="text-gray-600 mb-4 font-poppins">
            Get daily updates and insights about your construction site remotely without any obstructions.<br /> 
          </p>
          <div className="relative p-4 rounded overflow-hidden">
            {/* Image */}
            <img src="assets/ana.png" alt="Analytics" className="w-full h-auto" />
            {/* Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[rgba(255,255,255,0.9)] to-[rgba(255,255,255,0)] pointer-events-none"></div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#f5fbff] p-6 rounded-xl shadow-md border border-blue-400">
          <div className="mb-4">
            <div className="w-12 h-12 bg-gradient-to-t from-[#dde9f5] to-[#ced8f0]  text-blue-950  rounded-full flex items-center justify-center text-lg font-bold">
              {/* Icon Placeholder */}
              <Target className="w-6 h-6 rounded-full p-1 bg-gradient-to-t from-[#cbcccd] to-[#ced8f0]  text-blue-950" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 font-montserrat">From planning to perfection: Managing every stage seamlessly.</h3>
          <p className="text-gray-600 mb-4 font-poppins">
            Full stage and progress management at you fingertips.
          </p>
          <div className="relative p-4 rounded overflow-hidden">
            {/* Image */}
            <img src="assets/ana.png" alt="Analytics" className="w-full h-auto" />
            {/* Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[rgba(255,255,255,0.9)] to-[rgba(255,255,255,0)] pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;