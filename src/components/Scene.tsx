import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import GenerativeForm from "./GenerativeForm";
import Particles from "./Particles";
import Effects from "./Effects";
import { scrollState, prefersReducedMotion } from "../lib/scrollState";

/** Camera choreography: a slow dolly + parallax tied to cursor and scroll. */
function CameraRig() {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    const p = scrollState.progress;
    const z = 4.6 - Math.sin(p * Math.PI) * 1.1; // push in mid-story
    target.current.set(pointer.x * 0.35, pointer.y * 0.25, z);
    camera.position.lerp(target.current, 0.04);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene() {
  const reduced = useMemo(() => prefersReducedMotion(), []);
  const enableDof = useMemo(
    () => typeof window !== "undefined" && window.innerWidth > 1024 && !reduced,
    [reduced]
  );

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={[1, Math.min(window.devicePixelRatio, 1.8)]}
        camera={{ position: [0, 0, 4.6], fov: 42 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#05060A"]} />
        <fog attach="fog" args={["#05060A", 7, 15]} />
        <Suspense fallback={null}>
          <GenerativeForm />
          <Particles count={reduced ? 250 : 900} />
          <Effects enableDof={enableDof} />
        </Suspense>
        {!reduced && <CameraRig />}
      </Canvas>
    </div>
  );
}
