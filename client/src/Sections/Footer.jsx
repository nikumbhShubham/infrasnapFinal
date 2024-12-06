import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8 relative">


            {/* Footer Content */}
            <motion.div
                className="max-w-7xl mx-auto px-6 md:px-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">About Us</h3>
                        <p className="text-sm text-gray-400">
                            We empower smarter infrastructure with cutting-edge technology,
                            interactive visualizations, and robust analytics.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#about" className="hover:underline text-gray-400">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#services" className="hover:underline text-gray-400">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="hover:underline text-gray-400">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="#faq" className="hover:underline text-gray-400">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact</h3>
                        <ul className="space-y-2">
                            <li className="text-gray-400">Email: support@infrasnap.com</li>
                            <li className="text-gray-400">Phone: +91-9898989898</li>
                            <li className="text-gray-400">Address: Pune, India</li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-cyan-400"
                            >
                                <img src="assets/twitter.svg" alt="Twitter" className="w-6 h-6" />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-cyan-400"
                            >
                                <img src="assets/github.svg" alt="Facebook" className="w-6 h-6" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-cyan-400"
                            >
                                <img src="assets/instagram.svg" alt="Instagram" className="w-6 h-6" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-cyan-400"
                            >
                                <img src="assets/notion.svg" alt="LinkedIn" className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
                    <p>© 2024 InfraSnap. All rights reserved.</p>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;
