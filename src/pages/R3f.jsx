import React, { useState, useEffect } from "react";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Environment, Lightformer, ScrollControls, Scroll, useScroll,
 useGLTF, SpotLight, Float } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Loader from "../components/Loader";

const Model = () => {
  const scroll = useScroll();
  const { width, height } = useThree((state) => state.viewport);
  const gltf = useLoader(
    GLTFLoader,
    import.meta.env.VITE_CYBERTRUCK_MODEL_URL
  );

  useFrame(() => (gltf.scene.rotation.y = scroll.offset * Math.PI * 2));

  return <primitive object={gltf.scene} scale={0.013} position={[0, -1, 0]} />;
};

const R3fPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 720);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="container-fluid" style={{ height: "1100px" }}>
    <Canvas
        style={{ background: "black" }}
        gl={{ logarithmicDepthBuffer: true, antialias: false }}
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [-35, 5, 20], fov: 25 }}
    >
        <Suspense fallback={<Loader />}>
        <hemisphereLight intensity={1} />
        <ambientLight intensity={0.1} />
        <SpotLight
            angle={1}
            color="white"
            penumbra={1}
            position={[0, 25, 5]}
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
            castShadow
        />
        <SpotLight
            angle={1}
            color="white"
            penumbra={1}
            position={[0, 25, 5]}
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
            castShadow
        />
        {/* <Bounds fit clip observe> */}
        {/* <Bounds fit clip observe damping={6} margin={1.2}> */}
        <ScrollControls pages={3}>
            <Float
            speed={1} 
            rotationIntensity={1} 
            floatIntensity={1} 
            >
            <Model />
            </Float>
            <Scroll html>
            <h1
                id="cybertruck-title"
                style={{
                position: "absolute",
                top: "8vh",
                left: "50vw",
                color: "white",
                fontSize: "3rem"
                }}
            >
                {" "}
                CYBERTRUCK
            </h1>

            <div style={{ width: "30vw" }}>
                <h1
                style={{
                    position: "absolute",
                    top: "100vh",
                    left: "70vw",
                    color: "white"
                }}
                >
                EXOSKELETON
                </h1>

                {!isMobile && (
                <p
                    style={{
                    position: "absolute",
                    top: "108vh",
                    left: "70vw",
                    paddingRight: "50%",
                    color: "white",
                    width: "40vw",
                    wordWrap: "break-word",
                    fontSize: "0.9rem"
                    }}
                >
                    Cybertruck is built with an exterior shell made for
                    ultimate durability and passenger protection. Starting
                    with a nearly impenetrable exoskeleton, every component is
                    designed for superior strength and endurance, from
                    Ultra-Hard 30X Cold-Rolled stainless-steel structural skin
                    to Tesla armor glass.
                </p>
                )}

                <h1
                style={{
                    position: "absolute",
                    top: "198.5vh",
                    left: "70vw",
                    color: "white",
                    width: "30vw",
                    fontSize: "1.5rem"
                }}
                >
                ULTRA-HARD 30X COLD-ROLLED STAINLESS STEEL
                </h1>

                {!isMobile && (
                <p
                    style={{
                    position: "absolute",
                    // top: isMobile? '235vh' : '209vh',
                    top: "210vh",
                    left: "70vw",
                    paddingRight: "50%",
                    color: "white",
                    width: "40vw",
                    overflowWrap: "breakWord",
                    fontSize: "0.9rem"
                    }}
                >
                    If there was something better, we’d use it. Help eliminate
                    dents, damage and long-term corrosion with a smooth
                    monochrome exoskeleton that puts the shell on the outside
                    of the car and provides you and your passengers maximum
                    protection.
                </p>
                )}

                <h1
                style={{
                    position: "absolute",
                    top: "260vh",
                    left: "10vw",
                    color: "white",
                    width: "40vw",
                    fontSize: "1.5rem"
                }}
                >
                TESLA ARMOR GLASS
                </h1>

                {!isMobile && (
                <p
                    style={{
                    position: "absolute",
                    // top: isMobile? '285vh' : '257vh',
                    top: "267vh",
                    left: "10vw",
                    paddingRight: "50%",
                    color: "white",
                    width: "40vw",
                    overflowWrap: "breakWord",
                    fontSize: "0.9rem"
                    }}
                >
                    Ultra-strong glass and polymer-layered composite can
                    absorb and redirect impact force for improved performance
                    and damage tolerance.
                </p>
                )}

                <h1
                style={{
                    position: "absolute",
                    top: "340vh",
                    left: "10vw",
                    color: "white",
                    width: "40vw",
                    fontSize: "1.5rem"
                }}
                >
                VERSATILE UTILITY
                </h1>

                {!isMobile && (
                <ul
                    style={{
                    position: "absolute",
                    top: "348vh",
                    left: "10vw",
                    color: "white",
                    width: "40vw",
                    fontSize: "0.9rem"
                    }}
                >
                    <li>Vault-like storage</li>
                    <li>Rugged strength</li>
                    <li>Adaptive air suspension</li>
                    <li>Flexible interior</li>
                    <li>Awesome adaptability</li>
                </ul>
                )}
            </div>

            {!isMobile && (
                <video
                style={{
                    position: "absolute",
                    top: "390vh",
                    left: "25vw",
                    width: "50vw",
                    height: "auto"
                }}
                autoPlay="autoPlay"
                muted
                controls
                >
                <source src="../assets/cybertruck.mp4" type="video/mp4" />
                Your browser does not support the video tag.
                </video>
            )}

            {/* <button
                className="order-btn"
                style={{ position: "absolute", top: "450vh", left: "50vw" }}
                onClick={() =>
                window.location.assign(
                    "https://www.tesla.com/cybertruck/design#payment"
                )
                }
            >
                ORDER NOW{" "}
            </button> */}
            <button className="order-btn" style={{ position: 'absolute', top: '430vh', left: '50vw' }} onClick={() => navigate('/order')}>ORDER NOW </button>
            </Scroll>
        </ScrollControls>
        <Environment resolution={512}>
            <Lightformer
            form="ring" 
            intensity={2} 
            color="red" 
            scale={[10, 5]} 
            target={[0, 0, 0]} 
            />
            <Lightformer
            form="ring"
            color="aqua"
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, 0]}
            scale={[10, 1, 1]}
            />
            <Lightformer
            intensity={2}
            form="ring"
            color="red"
            rotation-x={Math.PI / 2}
            position={[0, 4, 3]}
            scale={[10, 1, 1]}
            />
            <Lightformer
            intensity={2}
            color="red"
            rotation-x={Math.PI / 2}
            position={[0, 4, 6]}
            scale={[10, 1, 1]}
            />
            <Lightformer
            form="ring"
            intensity={2}
            color="pink"
            rotation-x={Math.PI / 2}
            position={[0, 4, 9]}
            scale={[10, 1, 1]}
            />
            <Lightformer
            form="circle"
            color="pink"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[20, 2, 0]}
            scale={[100, 2, 1]}
            />
            <Lightformer
            form="circle"
            color="lime"
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[50, 2, 0]}
            scale={[100, 2, 1]}
            />
            <Lightformer
            form="circle"
            color="pink"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[20, 2, 0]}
            scale={[100, 2, 1]}
            />
            <Lightformer
            form="circle"
            color="white"
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[50, 2, 0]}
            scale={[100, 2, 1]}
            />
            <Lightformer
            form="ring"
            color="blue"
            intensity={10}
            scale={2}
            position={[10, 5, 10]}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
            />
            <Lightformer
            form="ring"
            color="aqua"
            intensity={10}
            scale={2}
            position={[-10, -5, 10]}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
            />
        </Environment>
        {/* </Bounds> */}
        </Suspense>
    </Canvas>
    </div>
  );
};
useGLTF.preload(
    import.meta.env.VITE_CYBERTRUCK_MODEL_URL
);

export default R3fPage;
