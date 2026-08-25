import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  varying vec2 vUv;

  // cheap value noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    float crumple = (1.0 - uProgress);
    float n = noise(uv * 6.0 + uTime * 0.05) - 0.5;
    pos.z += n * crumple * 1.1;
    pos.x *= mix(0.55, 1.0, uProgress);
    pos.y += sin(uv.x * 10.0 + uTime * 0.3) * crumple * 0.18;
    pos.z += sin(uv.y * 14.0) * crumple * 0.25;

    vec4 worldPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * worldPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uProgress;
  uniform vec3 uBaseColor;
  varying vec2 vUv;

  void main() {
    vec4 tex = texture2D(uTexture, vUv);
    float reveal = smoothstep(vUv.x - 0.08, vUv.x + 0.08, uProgress * 1.15);
    vec3 color = mix(uBaseColor, tex.rgb, reveal);
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function createClothMaterial(texture: THREE.Texture) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uTexture: { value: texture },
      uBaseColor: { value: new THREE.Color("#efe6d2") },
    },
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide,
  });
}
