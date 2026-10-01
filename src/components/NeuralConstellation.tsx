import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function NeuralConstellation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId = 0;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.z = 45;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn("WebGL initialization skipped:", err);
      return;
    }

    const particleCount = 75;
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2 * Math.PI;
      const phi = Math.acos(2 * v - 1);
      const radius = Math.cbrt(Math.random()) * 22;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      velocities.push({
        x: (Math.random() - 0.5) * 0.05,
        y: (Math.random() - 0.5) * 0.05,
        z: (Math.random() - 0.5) * 0.05,
      });
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      color: 14483333, // #DCEE85 / #DCFF85
      size: 1.1,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });

    const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(pointsMesh);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 6915035,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(33750);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    const sphereGeometry = new THREE.IcosahedronGeometry(24, 2);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.07,
    });
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphereMesh);

    let mouseX = 0;
    let mouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX = (x / rect.width) * 2;
      mouseY = -(y / rect.height) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    let isIntersecting = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && !animId) {
          render();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const startTime = performance.now();

    const render = () => {
      if (!isIntersecting) {
        animId = 0;
        return;
      }
      animId = requestAnimationFrame(render);

      const elapsed = (performance.now() - startTime) * 0.001;

      smoothMouseX += (mouseX - smoothMouseX) * 0.05;
      smoothMouseY += (mouseY - smoothMouseY) * 0.05;

      pointsMesh.rotation.y = elapsed * 0.08 + smoothMouseX * 0.5;
      pointsMesh.rotation.x = elapsed * 0.04 + smoothMouseY * 0.5;

      sphereMesh.rotation.y = -elapsed * 0.04 + smoothMouseX * 0.3;
      sphereMesh.rotation.x = -elapsed * 0.02 + smoothMouseY * 0.3;

      linesMesh.rotation.y = pointsMesh.rotation.y;
      linesMesh.rotation.x = pointsMesh.rotation.x;

      const posArray = pointsGeometry.attributes.position.array as Float32Array;
      let lineIndex = 0;

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += velocities[i].x;
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3 + 2] += velocities[i].z;

        const distSq =
          posArray[i * 3] ** 2 + posArray[i * 3 + 1] ** 2 + posArray[i * 3 + 2] ** 2;
        if (distSq > 484) {
          velocities[i].x *= -1;
          velocities[i].y *= -1;
          velocities[i].z *= -1;
        }

        for (let j = i + 1; j < particleCount; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const d2 = dx * dx + dy * dy + dz * dz;

          if (d2 < 90.25) {
            linePositions[lineIndex++] = posArray[i * 3];
            linePositions[lineIndex++] = posArray[i * 3 + 1];
            linePositions[lineIndex++] = posArray[i * 3 + 2];
            linePositions[lineIndex++] = posArray[j * 3];
            linePositions[lineIndex++] = posArray[j * 3 + 1];
            linePositions[lineIndex++] = posArray[j * 3 + 2];
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;
      pointsGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    render();

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (renderer && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer?.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
