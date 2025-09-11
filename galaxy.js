// galaxy.js
export async function initGalaxy(container) {
  const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js");

  // Clear previous canvas
  container.innerHTML = "";

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 6;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // --- Stars ---
  const starCount = 1200;
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    const radius = THREE.MathUtils.randFloat(2, 8);
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    // Random star color
    const c = new THREE.Color().setHSL(Math.random() * 0.7, 0.7, 0.9);
    colors[i3] = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  // ShaderMaterial = no background haze
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 }
    },
    vertexShader: `
      uniform float uTime;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 2.5 + sin(uTime + position.x * 5.0) * 1.2;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;   // crisp circle
        gl_FragColor = vec4(vColor, 1.0); // fully opaque
      }
    `,
    vertexColors: true,
    transparent: false, // 🔑 disables blending haze
    depthWrite: false
  });

  const stars = new THREE.Points(geometry, material);
  scene.add(stars);

  // --- Animate ---
  function animate(time) {
    requestAnimationFrame(animate);
    material.uniforms.uTime.value = time * 0.002;
    stars.rotation.y += 0.0050;
    stars.rotation.x += 0.0003;
    renderer.render(scene, camera);
  }
  animate(0);

  // --- Resize ---
  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}
