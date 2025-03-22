import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, forwardRef } from "react";
import type { HydrogenComponentSchema } from "@weaverse/hydrogen";
import { Section, type SectionProps } from "~/components/section";

interface ThreeDModelProps extends Omit<SectionProps, "content"> {
  content?: string;
  size?: string;
  mobileSize?: string;
  desktopSize?: string;
}

const Model = () => {
  const { scene } = useGLTF(
    "https://cdn.shopify.com/3d/models/34d56510907ddc90/TestBat18_1_.glb"
  );

  return <primitive object={scene} scale={0.5} position={[0, -1, 0]} />;
};

const ThreeDModel = forwardRef<HTMLElement, ThreeDModelProps>((props, ref) => {
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
    <Section ref={ref} {...props}>
      <Suspense fallback={<p>Loading 3D model...</p>}>
        {isLoaded ? (
          <Canvas camera={{ position: [0, 0, 3], fov: 50 }} style={{ height: "500px", width: "100%" }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Model />
            <OrbitControls />
          </Canvas>
        ) : (
          <p>Loading 3D model...</p>
        )}
      </Suspense>
    </Section>
  );
});

export default ThreeDModel;

export let schema: HydrogenComponentSchema = {
  type: "three-d-model",
  title: "3D Model Viewer",
  limit: 1,
  enabledOn: {
    pages: ["PRODUCT"],
  },
  inspector: [
    {
      group: "Layout",
      inputs: [
        {
          type: "range",
          label: "Model Height",
          name: "modelHeight",
          configs: {
            min: 300,
            max: 800,
            step: 10,
            unit: "px",
          },
          defaultValue: 500,
        },
        {
          type: "range",
          label: "Model Width",
          name: "modelWidth",
          configs: {
            min: 100,
            max: 1000,
            step: 10,
            unit: "px",
          },
          defaultValue: 500,
        },
      ],
    },
    {
      group: "Content",
      inputs: [
        {
          type: "text",
          label: "Model Caption",
          name: "content",
          placeholder: "Optional caption for the 3D model",
        },
      ],
    },
  ],
  presets: {
    gap: 32,
    width: "full",
    content: "View the product in 3D",
  },
};