import React from "react";
import { Send, SendHorizontal } from 'lucide-react'
const Footer = () => {
    return (
        <section className=" text-white p-8 rounded-t-3xl w-full bg-[url('assets/footer.png')] bg-cover bg-center ">
            {/* Navigation Links */}
            <div className="flex justify-center items-center flex-wrap space-x-6">
                <a
                    href="#"
                    className="text-sm font-medium hover:text-blue-300 transition duration-200"
                >
                    Features
                </a>
                <a
                    href="#"
                    className="text-sm font-medium hover:text-blue-300 transition duration-200"
                >
                    Pricing
                </a>
                <a
                    href="#"
                    className="text-sm font-medium hover:text-blue-300 transition duration-200"
                >
                    Resources
                </a>
                <a
                    href="#"
                    className="text-sm font-medium hover:text-blue-300 transition duration-200"
                >
                    Integrations
                </a>
            </div>

            {/* Subscribe Section */}
            <div className="mt-8 text-center">
                <h2 className="text-2xl lg:text-5xl font-semibold mb-8">Stay Connected</h2>
                <div className="flex justify-center items-center bg-[#3e7cde] p-4 rounded-full  w-[550px] mx-auto">
                    <input
                        type="email"
                        placeholder="Email address"
                        className="rounded-l-full py-2 px-4 bg-transparent text-white w-64 focus:outline-none"
                    />
                    <button className="flex items-center gap-2 bg-gradient-to-r from-[#101a32] to-[#0f52bd] hover:from-[#0e449b] hover:to-[#101a32] text-white px-5 py-2 rounded-full text-sm font-medium transition-all">
                        <Send className="w-8 h-8  rounded-full p-2 bg-gradient-to-t from-[#cbcccd] via-black to-[#030e29] " /> {/* Adjust the size as needed */}
                        <span>Get Started</span>
                    </button>
                </div>
            </div>

            {/* Footer Links */}
            <div className="flex justify-between items-center mt-10 text-sm flex-wrap px-4">
                <div className="space-x-4">
                    <a
                        href="#"
                        className="hover:text-blue-300 transition duration-200 px-2 py-1 rounded-full border"
                    >
                        Terms of Service
                    </a>
                    <a
                        href="#"
                        className="hover:text-blue-300 transition duration-200 px-2 py-1 rounded-full border"
                    >
                        Privacy Policy
                    </a>
                </div>
                <div className="space-x-4 space-y-12">
                    <a
                        href="#"
                        className="hover:text-blue-300 transition duration-200 px-2 py-1 rounded-full border"
                    >
                        Facebook
                    </a>
                    <a
                        href="#"
                        className="hover:text-blue-300 transition duration-200 px-2 py-1 rounded-full border "
                    >
                        Instagram
                    </a>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="mt-4 text-center text-sm text-gray-400">
                © 2024. All Rights Reserved. Infrasnap.
            </div>
        </section>
    );
};

export default Footer;
