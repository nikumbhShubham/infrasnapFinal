// import React, { useState } from "react";
// import { FaArrowRight } from "react-icons/fa"; // Example of an icon

// function RawMaterial() {
//   const [formData, setFormData] = useState({
//     materialType: "",
//     quantityInwarded: "",
//     dateInwarding: "",
//     usedMaterial: "",
//     quantityUsed: "",
//     dateUsage: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Submitted", formData);
//     // Add form submission logic
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300 px-4 py-8">
//       <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-3xl">
//         <h1 className="text-3xl font-bold text-[#1C39BB] mb-6 text-center">
//           Raw Material Input Form
//         </h1>
//         <form onSubmit={handleSubmit}>
//           {/* Inwarded Raw Material Section */}
//           <div className="mb-8">
//             <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b-2 pb-2">
//               Inwarded Raw Material
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="materialType" className="block text-gray-600 mb-2">
//                   Material Type
//                 </label>
//                 <input
//                   type="text"
//                   id="materialType"
//                   name="materialType"
//                   value={formData.materialType}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:bg-white focus:shadow-lg hover:shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-400 hover:ring-2 hover:ring-gray-300 transition-all duration-300"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="quantityInwarded" className="block text-gray-600 mb-2">
//                   Quantity Inwarded (in kg)
//                 </label>
//                 <input
//                   type="number"
//                   id="quantityInwarded"
//                   name="quantityInwarded"
//                   value={formData.quantityInwarded}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:shadow-lg hover:shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-400 hover:ring-2 hover:ring-gray-300 transition-all duration-300"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="dateInwarding" className="block text-gray-600 mb-2">
//                   Date of Inwarding
//                 </label>
//                 <input
//                   type="date"
//                   id="dateInwarding"
//                   name="dateInwarding"
//                   value={formData.dateInwarding}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:shadow-lg hover:shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-400 hover:ring-2 hover:ring-gray-300 transition-all duration-300"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Used Material Section */}
//           <div className="mb-8">
//             <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b-2 pb-2">
//               Used Material
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="usedMaterial" className="block text-gray-600 mb-2">
//                   Used Material
//                 </label>
//                 <input
//                   type="text"
//                   id="usedMaterial"
//                   name="usedMaterial"
//                   value={formData.usedMaterial}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:shadow-lg hover:shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-400 hover:ring-2 hover:ring-gray-300 transition-all duration-300"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="quantityUsed" className="block text-gray-600 mb-2">
//                   Quantity Used (in kg)
//                 </label>
//                 <input
//                   type="number"
//                   id="quantityUsed"
//                   name="quantityUsed"
//                   value={formData.quantityUsed}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:shadow-lg hover:shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-400 hover:ring-2 hover:ring-gray-300 transition-all duration-300"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="dateUsage" className="block text-gray-600 mb-2">
//                   Date of Usage
//                 </label>
//                 <input
//                   type="date"
//                   id="dateUsage"
//                   name="dateUsage"
//                   value={formData.dateUsage}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:shadow-lg hover:shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-400 hover:ring-2 hover:ring-gray-300 transition-all duration-300"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-[#ADD8E6] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#1C39BB] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
//             >
//               <FaArrowRight className="mr-2" />
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default RawMaterial;

import React from 'react'

const foundationDashboard= () => {
  return (
    <div>
      hello world
    </div>
  )
}

export default  foundationDashboard
