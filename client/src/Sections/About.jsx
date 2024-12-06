import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { NavLink } from "react-router-dom";

const About = () => {
    // Create refs for scroll detection
    const [textRef, textInView] = useInView({
        triggerOnce: false, // Change to false for repeated triggers
        threshold: 0.2,
    });

    const [modelRef, modelInView] = useInView({
        triggerOnce: false, // Change to false for repeated triggers
        threshold: 0.2,
    });

    return (
        <section className="relative w-full min-h-screen px-6 py-20 overflow-hidden bg-gradient-to-br from-gray-100 to-blue-50">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto gap-16 mt-20">
                {/* Text Section */}
                <motion.div
                    ref={textRef}
                    className="flex-1 space-y-8"
                    initial={{ opacity: 0, x: -100 }}
                    animate={textInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.h2
                        className="text-5xl sm:text-7xl font-extrabold leading-tight text-gray-800"
                        initial={{ opacity: 0, y: -50 }}
                        animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        Transforming Ideas into Reality
                    </motion.h2>
                    <motion.p
                        className="text-lg sm:text-xl leading-relaxed font-light text-gray-600"
                        initial={{ opacity: 0, y: -50 }}
                        animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    >
                        Experience a revolutionary way to track and analyze construction projects. 
                        Leverage cutting-edge 3D visualization, seamless interaction, and powerful 
                        analytics to make your workflow smarter, faster, and more efficient.
                    </motion.p>
                    <motion.button
                        className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 text-lg font-medium shadow-lg hover:shadow-xl"
                        initial={{ opacity: 0, y: -50 }}
                        animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    >
                        <NavLink to='/signup'>
                        Get Started
                        </NavLink>
                    </motion.button>
                </motion.div>

                {/* 3D or Image Section */}
                <motion.div
                    ref={modelRef}
                    className="flex-1 relative w-full h-[600px] rounded-lg shadow-xl overflow-hidden"
                    initial={{ opacity: 0, x: 100 }}
                    animate={modelInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-600 blur-lg opacity-30 z-0"></div>

                    {/* Image or Canvas */}
                    <motion.img
                        src="assets/about.jpg"
                        alt="About Visualization"
                        className="absolute top-0 left-0 w-full h-full object-cover z-10"
                        initial={{ opacity: 0 }}
                        animate={modelInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    />

                    {/* Glassmorphism Effect */}
                    <div className="absolute bottom-5 left-5 w-[80%] bg-white bg-opacity-20 backdrop-blur-lg p-4 rounded-lg shadow-md z-20">
                        <h3 className="text-2xl font-semibold text-white">Dynamic Visuals</h3>
                        <p className="text-sm text-white">
                            Interactive 3D models and data visualization for smarter infrastructure insights.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
