import { EffectComposer, Bloom, Noise, Vignette, DepthOfField } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

/**
 * Cinematic grade: soft bloom on the fresnel rim, film grain, vignette,
 * and a gentle depth of field on capable devices.
 */
export default function Effects({ enableDof }: { enableDof: boolean }) {
  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.85} luminanceThreshold={0.18} luminanceSmoothing={0.35} mipmapBlur />
      {enableDof ? (
        <DepthOfField focusDistance={0.012} focalLength={0.06} bokehScale={2.2} />
      ) : (
        <></>
      )}
      <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.5} />
      <Vignette eskil={false} offset={0.18} darkness={0.85} />
    </EffectComposer>
  );
}
