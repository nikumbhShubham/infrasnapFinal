const HeroContent = ({ isMobile, onLoaded }) => {
    const { progress } = useProgress();
    
    useEffect(() => {
        if (progress === 100) {
            onLoaded();
        }
    }, [progress, onLoaded]);

    return (
        <>
            <Environment preset="night" />
            <perspectiveCamera makeDefault position={[0, 1, 10]} />
            <HeroCamera isMobile={isMobile}>
                <Resident
                    scale={0.05}
                    position={[0, -2, 0]}
                    rotation={[0, 0, 0]}
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