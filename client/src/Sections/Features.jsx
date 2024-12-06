import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FeatureCard = ({ title, description, icon, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  return (
    <motion.div
      ref={ref}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="w-16 h-16 mb-4 text-black"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1, rotate: 360 } : { scale: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

const RisingCircle = () => {
  const { scrollYProgress } = useScroll();

  const yPos = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["130%", "0%"]  // Changed to rise more from bottom
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.7],
    [0, 1.6]  // Adjusted scale values
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7],
    [0, 0.8, 1]
  );


  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[200vw] aspect-square left-1/2 -translate-x-1/2" // Made wider
        style={{
          y: yPos,
          scale,
          opacity,
        }}
      >
        {/* Main gradient circle */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-700/80 to-indigo-900/90 blur-3xl" />
        
        {/* Animated overlay circles for dynamic effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-400/20 blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-indigo-500/20 blur-2xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};


const Features = () => {
  const [headerRef, headerInView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const features = [
    {
      title: "Real-time 3D Visualization",
      description: "Experience your projects in immersive 3D with real-time updates and interactive viewing angles.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      )
    },
    {
      title: "Smart Analytics",
      description: "Leverage advanced analytics and AI to gain deeper insights into your construction progress.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Collaborative Tools",
      description: "Work seamlessly with your team using our integrated collaboration and communication features.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative w-full min-h-screen py-20">
      {/* Rising circle background */}
      <RisingCircle />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          ref={headerRef}
          className="text-center mb-20"
          initial={{ opacity: 0, y: -50 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl sm:text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: -30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Powerful Features
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transform your construction management with our cutting-edge tools and features
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;