import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "../lib/scrollState";

/**
 * The signature element of the site: a single procedural form that lives
 * behind the entire scroll story. Vertex displacement is driven by 3D
 * simplex noise; the surface is a metallic fresnel shader whose color
 * temperature shifts as the visitor moves through the chapters.
 * No static assets — geometry and material are fully procedural.
 */

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uFreq;
varying vec3 vNormalW;
varying vec3 vPosW;
varying float vNoise;

// --- 3D simplex noise (Ashima / Ian McEwan, public domain) ---
vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
  float n = snoise(normal * uFreq + uTime * 0.25);
  float n2 = snoise(normal * uFreq * 2.7 + uTime * 0.12) * 0.35;
  float displacement = (n + n2) * uAmp;
  vec3 displaced = position + normal * displacement;
  vNoise = n;

  // Approximate the displaced normal by sampling neighbors on the sphere.
  vec3 tangent = normalize(cross(normal, vec3(0.0, 1.0, 0.001)));
  vec3 bitangent = normalize(cross(normal, tangent));
  float eps = 0.08;
  vec3 nT = normalize(normal + tangent * eps);
  vec3 nB = normalize(normal + bitangent * eps);
  vec3 pT = nT * (1.0 + (snoise(nT * uFreq + uTime * 0.25) + snoise(nT * uFreq * 2.7 + uTime * 0.12) * 0.35) * uAmp);
  vec3 pB = nB * (1.0 + (snoise(nB * uFreq + uTime * 0.25) + snoise(nB * uFreq * 2.7 + uTime * 0.12) * 0.35) * uAmp);
  vec3 newNormal = normalize(cross(pT - displaced, pB - displaced));

  vNormalW = normalize(mat3(modelMatrix) * newNormal);
  vPosW = (modelMatrix * vec4(displaced, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform float uProgress;
uniform vec3 uColorA; // iris
uniform vec3 uColorB; // teal
uniform vec3 uColorC; // champagne
varying vec3 vNormalW;
varying vec3 vPosW;
varying float vNoise;

void main() {
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(cameraPosition - vPosW);

  // Fresnel rim — atmospheric glow at grazing angles.
  float fresnel = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.6);

  // Two moving key lights for a metallic, studio-lit read.
  vec3 L1 = normalize(vec3(sin(uTime * 0.3) * 2.0, 1.6, cos(uTime * 0.3) * 2.0));
  vec3 L2 = normalize(vec3(-1.5, -0.6, 1.2));
  float d1 = clamp(dot(N, L1), 0.0, 1.0);
  float d2 = clamp(dot(N, L2), 0.0, 1.0);
  vec3 H1 = normalize(L1 + V);
  float spec = pow(clamp(dot(N, H1), 0.0, 1.0), 48.0);

  // Chapter-driven color temperature: iris -> teal across the story,
  // with champagne reserved for the specular highlight (the luxury note).
  vec3 base = mix(uColorA, uColorB, smoothstep(0.15, 0.85, uProgress));
  base = mix(base * 0.14, base, d1 * 0.85 + d2 * 0.3);
  base += uColorC * spec * 0.9;
  base += mix(uColorA, uColorB, uProgress) * fresnel * 1.4;
  base += vNoise * 0.03;

  gl_FragColor = vec4(base, 1.0);
  #include <colorspace_fragment>
}
`;

export default function GenerativeForm() {
  const mesh = useRef<THREE.Mesh>(null!);
  const mat = useRef<THREE.ShaderMaterial>(null!);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.28 },
      uFreq: { value: 1.6 },
      uProgress: { value: 0 },
      uColorA: { value: new THREE.Color("#7A6CFF") },
      uColorB: { value: new THREE.Color("#4FD1C5") },
      uColorC: { value: new THREE.Color("#C9A96A") },
    }),
    []
  );

  useFrame((state, delta) => {
    const p = scrollState.progress;
    uniforms.uTime.value += delta;
    uniforms.uProgress.value = p;

    // The form breathes harder mid-story, then settles for the close.
    const storm = Math.sin(p * Math.PI);
    uniforms.uAmp.value = THREE.MathUtils.lerp(
      uniforms.uAmp.value,
      0.22 + storm * 0.3 + Math.min(Math.abs(scrollState.velocity) * 0.004, 0.15),
      0.06
    );
    uniforms.uFreq.value = 1.4 + p * 1.8;

    // Slow sovereign rotation + scroll-driven drift across the frame.
    mesh.current.rotation.y += delta * 0.12;
    mesh.current.rotation.x = THREE.MathUtils.lerp(
      mesh.current.rotation.x,
      p * Math.PI * 0.6,
      0.05
    );
    mesh.current.position.x = THREE.MathUtils.lerp(
      mesh.current.position.x,
      Math.sin(p * Math.PI * 2.0) * 1.1,
      0.05
    );
    mesh.current.position.y = THREE.MathUtils.lerp(
      mesh.current.position.y,
      -0.2 + Math.cos(p * Math.PI) * 0.3,
      0.05
    );
    const s = 1.0 + storm * 0.25;
    mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, s, 0.05));
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.35, 96]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
