import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Menu, UserRound, ChevronsRight, CirclePower } from 'lucide-react';
import AboutSection from './AboutSection';
import FeaturesSection from './FeaturesSection';
import PricingSection from './Pricing';
import Footer from './FooterSection';
import { Link } from 'react-router-dom';


const HeroSection = () => {
    return (
        
        <div className="min-h-screen bg-gradient-to-br from-[#caddf2] via-[#edf1f5] to-[#f7f8f9] px-4 pt-6 font-eloquia">
            <motion.div
                className="absolute top-1 -left-20 w-96 h-96 bg-gradient-to-tr from-blue-400 to-blue-700 rounded-full opacity-10"
                animate={{ y: [0, -40, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-60 right-10 w-60 h-60 bg-gradient-to-tr from-blue-400 to-blue-700 rounded-full opacity-10"
                animate={{ x: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
            {/* Navbar */}
            <motion.nav
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="rounded-full shadow-xl mx-auto max-w-7xl px-6 py-4 flex justify-between items-center"
            >
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center">
                        <img src="assets/Collab.png" alt="infrasnap" className='w-[150px] h-full object-cover' />
                    </div>
                    <span className="text-lg font-semibold text-[#232650]">InfraSnap</span>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-1 text-[#4b5563] cursor-pointer hover:text-[#1e40af] transition-colors">
                        Features
                        <ChevronDown className="w-4 h-4 opacity-70" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} className="text-[rgb(75,85,99)] cursor-pointer hover:text-[#1e40af] transition-colors">
                        Pricing
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-1 text-[#4b5563] cursor-pointer hover:text-[#1e40af] transition-colors">
                        Resources
                        <ChevronDown className="w-4 h-4 opacity-70" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} className="text-[#4b5563] cursor-pointer hover:text-[#1e40af] transition-colors">
                        Integrations
                    </motion.div>
                </div>
                <div className="flex items-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-2 bg-gradient-to-r from-[#101a32] to-[#0e449b] hover:from-[#0f52bd] hover:to-[#101a32] text-white px-5 py-2 rounded-full text-sm font-medium transition-all"
                    >
                        <UserRound className="w-6 h-6 rounded-full p-1 bg-gradient-to-t from-[#cbcccd] via-black to-[#030e29]" />
                        <Link to='/signup'>Sign Up</Link>
                    </motion.button>
                    <Menu className="md:hidden w-6 h-6 text-[#4b5563] cursor-pointer" />
                </div>
            </motion.nav>

            {/* Hero Content */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-center max-w-8xl mx-auto mt-8"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 shadow-sm"
                >
                    <CirclePower className='w-4 h-4 rounded-full bg-gradient-to-t from-[#101a32] to-[#1a4c9d] text-white' />
                    <span className="text-sm text-[#4b5563]">Start your journey</span>
                </motion.div>

                <h1 className="text-5xl md:text-6xl font-bold mb-2">
                    <span className="text-[#121d36]">
                        <span className='bg-gradient-to-t from-[#1a4c9d] to-[#101a32] bg-clip-text text-transparent mr-2'>Snapshot</span>
                        Your</span><br />
                    <span className="text-[#121d36]">
                        Way to Smarter Infrastructure
                    </span>
                </h1>

                <p className="text-[#4b5563] text-md mb-3 max-w-5xl mx-auto">
                    The all-in-one platform that empowers businesses to track, manage, and grow customer connections seamlessly.
                </p>

                {/* Flow Diagram */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <img
                        src="/assets/diagram.png"
                        alt="Customer Relationship Flow"
                        className="w-full max-w-8xl mx-auto"
                    />
                </motion.div>

                {/* CTA Buttons */}
                <div className="flex justify-center gap-9">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-2 bg-gradient-to-r from-[#101a32] to-[#0f52bd] hover:from-[#0e449b] hover:to-[#101a32] text-white px-5 py-2 rounded-full text-sm font-medium transition-all"
                    >
                        <span>Get Started</span>
                        <ChevronsRight className="w-7 h-7 rounded-full p-1 bg-gradient-to-t from-[#cbcccd] via-black to-[#030e29]" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="bg-white hover:bg-gray-50 text-[#1e40af] px-8 py-3 rounded-full font-medium border border-gray-200 transition-colors shadow-sm outline-8 outline-blue-500"
                    >
                        Schedule a Demo
                    </motion.button>
                </div>
            </motion.div>
            <AboutSection />
            <FeaturesSection />
            <PricingSection />
            <Footer />
        </div>
    );
};

export default HeroSection;
