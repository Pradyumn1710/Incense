"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, PresentationControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { div } from "framer-motion/client";

function Model({ url }) {
    // useGLTF suspends until the model is loaded
    const { scene } = useGLTF(url);

    // Center the model: adjust each mesh's position by subtracting its center
    scene.traverse((child) => {
        if (child.isMesh) {
            const box = new THREE.Box3().setFromObject(child);
            const center = box.getCenter(new THREE.Vector3());
            child.position.sub(center);
        }
    });

    return <primitive object={scene} scale={1.5} position={[0, 0, 0]} />;
}

export default function ModelViewer() {
    return (
        <div className="min-h-screen bg-[#0a192f] text-white flex flex-col p-6">
            <h1 className="text-3xl font-bold mb-8 text-center text-[#64ffda]">
                3D Sensor Model
            </h1>
            <div className="flex flex-col lg:flex-row gap-8 flex-grow">
                {/* 3D Model Viewer */}
                <div className="w-full lg:w-1/2 bg-[#112240] rounded-lg shadow-lg border border-gray-600 overflow-hidden h-[500px] lg:h-auto">
                    <Canvas
                        camera={{ position: [0, 0, 5], fov: 50 }}
                        gl={{
                            preserveDrawingBuffer: true,
                            powerPreference: "high-performance",
                            toneMappingExposure: 1.5,
                        }}
                    >
                        {/* Brighter lighting */}
                        <ambientLight intensity={1.5} />
                        <directionalLight position={[5, 5, 5]} intensity={2} />
                        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />

                        <Suspense
                            fallback={
                                <Html center>
                                    <div className="text-white">Loading 3D model...</div>
                                </Html>
                            }
                        >
                            <PresentationControls
                                global
                                zoom={0.8}
                                rotation={[0, 0, 0]}
                                polar={[-Math.PI / 4, Math.PI / 4]}
                                azimuth={[-Math.PI / 4, Math.PI / 4]}
                            >
                                <Model url="/sample.glb" />
                            </PresentationControls>
                            <Environment preset="city" />
                        </Suspense>
                    </Canvas>
                </div>

                {/* Information Section */}
                <div className="w-full lg:w-1/2 bg-[#112240] rounded-lg shadow-lg p-6 border border-gray-600">
                    <h2 className="text-2xl font-bold mb-4">Incense Emissions Analyzer</h2>
                    <div className="space-y-6 overflow-auto max-h-[400px] pr-2">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Description</h3>
                            <p className="text-gray-300">
                                It has an array of sensors—including PM₂.₅, VOC, and temperature sensors—and wireless modules (Wi‑Fi/Bluetooth) that transmit real‑time data on incense emissions. Advanced AI algorithms process this data to monitor indoor air quality.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Components</h3>
                            <p className="text-gray-300">
                                The prototype integrates environmental sensors, renewable energy sources (like solar panels or kinetic converters), an AI processor for data analysis, and connectivity modules for seamless data logging and remote alerts.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Operation</h3>
                            <p className="text-gray-300">
                                Continuously monitoring incense emissions, the device provides immediate feedback if pollutant levels exceed safe limits, while logging data over time to help users balance tradition with health and environmental responsibility.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-600">
                        <p className="text-sm text-gray-400">
                            <strong>Note:</strong> This prototype seamlessly blends traditional incense burning practices with modern AI and renewable energy technology to ensure safe indoor air quality.
                        </p>
                    </div>
                </div>


            </div>
        </div>
  );
}
