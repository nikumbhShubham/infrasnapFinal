import React from "react";
import { motion } from "framer-motion";
import { ReceiptIndianRupee } from 'lucide-react'

const PricingSection = () => {
    return (
        <div className="py-16 px-6 lg:px-20">
            {/* Top Text Section */}
            <span className="flex justify-center  items-center gap-2 text-gray-600 font-medium mb-2">
                <ReceiptIndianRupee className="w-6 h-6 rounded-full p-1 bg-gradient-to-t from-[#cbcccd] to-[#ced8f0]  text-blue-950" />
                Choose the plan that fits your business
            </span>
            <div className="text-center mb-12">

                <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-t from-[#1a4c9d] to-[#101a32] bg-clip-text text-transparent">
                    Flexible pricing options <br />designed to grow with you
                </h2>
            </div>

            {/* Pricing Cards */}
            <div className="flex flex-col lg:flex-row justify-evenly items-center space-y-8 lg:space-y-0 lg:space-x-8">
                {/* Nova Plan */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="group relative rounded-xl shadow-lg p-8 bg-blue-50 transition-all duration-300 hover:bg-gradient-to-t  hover:from-[#101a32] hover:to-[#0f52bd] hover:shadow-xl  hover:text-white border border-blue-200 min-h-[500px] w-[300px] md:w-[400px] lg:w-[450px] flex flex-col justify-between"
                >
                    <div>
                        <h3 className="text-xl font-semibold bg-gradient-to-t from-[#1a4c9d] to-[#101a32] bg-clip-text text-transparent mb-4 group-hover:text-white transition-all duration-300">
                            Nova Plan
                        </h3>
                        <p className="text-6xl font-bold bg-gradient-to-t from-[#1a4c9d] to-[#101a32] bg-clip-text text-transparent mb-2 group-hover:text-white transition-all duration-300">
                            $19<span className="text-sm font-medium">/mo</span>
                        </p>
                        <p className="text-gray-600 mb-6 group-hover:text-white transition-all duration-300">Features:</p>
                        <ul className="text-gray-700 space-y-2 mb-6 group-hover:text-white transition-all duration-300">
                            <li>✔️ Up to 20 users</li>
                            <li>✔️ Full sales pipeline customization</li>
                            <li>✔️ Advanced analytics and reporting</li>
                            <li>✔️ Integration with popular tools</li>
                            <li>✔️ Priority email support</li>
                        </ul>
                    </div>
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="opacity-0 group-hover:opacity-100 bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mt-4 hover:bg-blue-700 transition-opacity"
                    >
                        Start free trial
                    </motion.button>
                </motion.div>

                {/* Quantum Plan */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="group relative rounded-xl shadow-lg p-8 bg-blue-50 transition-all duration-300 hover:bg-gradient-to-t hover:from-[#101a32] hover:to-[#0f52bd] hover:shadow-xl hover:text-white border border-blue-200 min-h-[500px] w-[300px] md:w-[400px] lg:w-[450px] flex flex-col justify-between"
                >
                    <div>
                        <h3 className="text-xl font-semibold bg-gradient-to-t from-[#1a4c9d] to-[#101a32] bg-clip-text text-transparent mb-4 group-hover:text-white transition-all duration-300">
                            Quantum Plan{" "}
                            <span className="ml-2 bg-blue-500 px-2 py-1 text-xs rounded text-white">
                                Recommended
                            </span>
                        </h3>
                        <p className="text-6xl font-bold bg-gradient-to-t from-[#1a4c9d] to-[#101a32] bg-clip-text text-transparent mb-2 group-hover:text-white transition-all duration-300">
                            $49<span className="text-sm font-medium">/mo</span>
                        </p>
                        <p className="text-gray-600 mb-6 group-hover:text-white transition-all duration-300">Features:</p>
                        <ul className="text-gray-700 space-y-2 mb-6 group-hover:text-white transition-all duration-300">
                            <li>✔️ Up to 50 users</li>
                            <li>✔️ Full sales pipeline customization</li>
                            <li>✔️ Advanced analytics and reporting</li>
                            <li>✔️ Integration with popular tools</li>
                            <li>✔️ Priority phone support</li>
                        </ul>
                    </div>
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="opacity-0 group-hover:opacity-100 bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mt-4 hover:bg-blue-700 transition-opacity"
                    >
                        Start free trial
                    </motion.button>
                </motion.div>

                {/* Zenith Plan */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="group relative rounded-xl shadow-lg p-8 bg-blue-50 transition-all duration-300 hover:bg-gradient-to-t hover:from-[#101a32] hover:to-[#0f52bd] hover:shadow-xl hover:text-white border border-blue-200 min-h-[500px] w-[300px] md:w-[400px] lg:w-[450px] flex flex-col justify-between"
                >
                    <div>
                        <h3 className="text-xl font-semibold bg-gradient-to-t from-[#1a4c9d] to-[#101a32] bg-clip-text text-transparent mb-4 group-hover:text-white transition-all duration-300">
                            Zenith Plan
                        </h3>
                        <p className="text-6xl font-bold bg-gradient-to-t from-[#1a4c9d] to-[#101a32] bg-clip-text text-transparent mb-2 group-hover:text-white transition-all duration-300">
                            $79<span className="text-sm font-medium">/mo</span>
                        </p>
                        <p className="text-gray-600 mb-6 group-hover:text-white transition-all duration-300">Features:</p>
                        <ul className="text-gray-700 space-y-2 mb-6 group-hover:text-white transition-all duration-300">
                            <li>✔️ Unlimited users</li>
                            <li>✔️ Dedicated account manager</li>
                            <li>✔️ Custom integrations and API access</li>
                            <li>✔️ Full automation and advanced workflows</li>
                            <li>✔️ 24/7 phone support</li>
                        </ul>
                    </div>
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="opacity-0 group-hover:opacity-100 bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mt-4 hover:bg-blue-700 transition-opacity"
                    >
                        Start free trial
                    </motion.button>
                </motion.div>
            </div>


        </div>
    );
};

export default PricingSection;
