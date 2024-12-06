import React, { useEffect, useState, useRef } from "react";

const CustomCursor = () => {
  const [isMoving, setIsMoving] = useState(false);
  const cursorRef = useRef(null); // Use a ref to directly manipulate DOM for smoother updates

  useEffect(() => {
    let timer;
    const cursor = cursorRef.current;

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      // Update cursor position using transform for better performance
      if (cursor) {
        cursor.style.transform = `translate(${x - 10}px, ${y - 10}px)`;
      }

      setIsMoving(true);

      // Clear any existing timer
      clearTimeout(timer);

      // Set a timer to detect when the mouse stops
      timer = setTimeout(() => {
        setIsMoving(false);
      }, 200); // Duration before the cursor is considered "at rest"
    };

    // Add mousemove event listener
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup the event listener and timer on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        width: isMoving ? "20px" : "10px", // Size changes based on movement
        height: isMoving ? "20px" : "10px",
        background: "linear-gradient(to right, #3b43da, #0e449b);",
        borderRadius: "50%",
        pointerEvents: "none", // Prevent interaction issues
        zIndex: 1000,
        transition: "width 0.2s ease, height 0.2s ease", // Smooth size transition
        willChange: "transform", // Hint the browser to optimize for transform changes
      }}
    ></div>
  );
};

export default CustomCursor;
