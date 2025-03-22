import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

// Define the component for rendering the 3D model
const Model = () => {
  const { scene } = useGLTF("https://cdn.shopify.com/3d/models/34d56510907ddc90/TestBat18_1_.glb");

  return (
    <primitive object={scene} scale={0.5} position={[0, -1, 0]} />
  );
};

const ThreeDModel = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // This hook ensures the model is loaded before rendering
  useEffect(() => {
    const loadModel = async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000); // Simulate loading delay for optimization
      });
      setIsLoaded(true);
    };

    loadModel();
  }, []);

  return (
    <div style={{ height: "500px", width: "100%" }}>
      {isLoaded ? (
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }} style={{ height: "100%", width: "100%" }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Model />
          <OrbitControls />
        </Canvas>
      ) : (
        <p>Loading 3D model...</p>
      )}
    </div>
  );
};

export default ThreeDModel;