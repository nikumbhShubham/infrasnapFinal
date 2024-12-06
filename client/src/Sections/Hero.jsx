import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, useProgress } from '@react-three/drei';
import { useInView } from 'react-intersection-observer';
import { Suspense } from 'react';
import { Environment } from '@react-three/drei';
import { useMediaQuery } from 'react-responsive';
import LoadingScreen from '../components/LoadingScreeen.jsx';
import HeroCamera from '../components/HeroCamera.jsx';
import { motion } from 'framer-motion';
import Resident from '../components/Resident.jsx';

const Hero = ({ onLoad, isLoading }) => {
    const isSmall = useMediaQuery({ maxWidth: 440 });
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

    const { progress } = useProgress();

    const [textRef, textInView] = useInView({
        triggerOnce: false,
        threshold: 0.2,
    });

    return (
        <section className='min-h-screen w-full flex flex-col relative hero_back overflow-hidden'>
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 m-30 c-space gap-2 z-10 pb-4"
                style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s' }}>
                
                <motion.p
                    ref={textRef}
                    className={`text-center font-semibold headline font-montserrat leading-tight ${isSmall ? 'text-lg' : isTablet ? 'text-2xl' : 'text-4xl'}`}
                    initial={{ opacity: 0, y: -100 }}
                    animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Snapshot Your Way to Smarter Infrastructure
                </motion.p>

                <motion.p
                    className={`text-center font-bold sub_head font-montserrat leading-tight ${isSmall ? 'text-xl' : isTablet ? 'text-3xl' : 'text-5xl'}`}
                    initial={{ opacity: 0, y: -100 }}
                    animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    Analyze and optimize construction progress seamlessly.
                </motion.p>

                <div className="flex justify-center mt-4">
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-lg font-medium">
                        Get Started
                    </button>
                </div>
            </div>

            <div className='w-full h-full absolute inset-0'>
                <Canvas shadows className='w-full h-full'>
                    <Suspense fallback={<Html center><LoadingScreen progress={progress} /></Html>}>
                        {/* Pass isMobile and isTablet as props */}
                        <HeroContent isMobile={isMobile} isTablet={isTablet} onLoaded={onLoad} />
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
}

// New component to handle 3D content
const HeroContent = ({ isMobile, isTablet, onLoaded }) => {
    const { progress } = useProgress();

    useEffect(() => {
        if (progress === 100) {
            onLoaded();
        }
    }, [progress, onLoaded]);

    return (
        <>
            <Environment preset="night" />
            <perspectiveCamera makeDefault position={[0, isMobile ? 1 : 1.5, isMobile ? 8 : 10]} />
            <HeroCamera isMobile={isMobile}>
                <Resident
                    scale={isMobile ? 0.03 : (isTablet ? 0.04 : 0.05)}
                    position={[0, -2, 0]}
                    rotation={[0, Math.PI / 4, 0]} // Adjust rotation for better visibility
                    castShadow
                    receiveShadow
                />
            </HeroCamera>
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 10, 5]} intensity={1} />
            <spotLight position={[-10, 10, 10]} angle={0.3} intensity={0.8} />
        </>
    );
};

export default Hero;