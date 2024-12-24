import {
  shaderMaterial,
  Center,
  OrbitControls,
  Sparkles,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#201919"),
    uColorEnd: new THREE.Color("#fff9f0"),
  },
  portalVertexShader,
  portalFragmentShader
);
extend({ PortalMaterial });

export default function Experience() {
  const portalMaterialRef = useRef();

  const bakedTexture = useTexture("./model/baked-final.jpg");
  bakedTexture.flipY = false;

  const { nodes } = useGLTF("./model/portal-final.glb");

  useFrame((state, delta) => {
    portalMaterialRef.current.uniforms.uTime.value += delta;
  });

  return (
    <>
      <color args={["#201919"]} attach="background" />
      <OrbitControls makeDefault />

      <Center>
        <mesh
          geometry={nodes.baked.geometry}
          position={nodes.baked.position}
          rotation={nodes.baked.rotation}
          scale={nodes.baked.scale}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>

        <mesh
          geometry={nodes.lampLight1.geometry}
          position={nodes.lampLight1.position}
          rotation={nodes.lampLight1.rotation}
          scale={nodes.lampLight1.scale}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh
          geometry={nodes.lampLight2.geometry}
          position={nodes.lampLight2.position}
          rotation={nodes.lampLight2.rotation}
          scale={nodes.lampLight2.scale}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
          scale={nodes.portalLight.scale}
        >
          <portalMaterial ref={portalMaterialRef} />
        </mesh>

        <Sparkles
          count={40}
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.4}
        />
      </Center>
    </>
  );
}
