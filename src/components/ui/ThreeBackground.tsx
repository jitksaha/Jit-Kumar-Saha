import React, { useRef, useEffect } from "react";
import * as THREE from "three";

interface ThreeBackgroundProps {
  variant?: "orb" | "torus" | "particles";
  className?: string;
  accentColor?: number;
}

export function ThreeBackground({
  variant = "orb",
  className = "absolute inset-0 w-full h-full pointer-events-none opacity-45",
  accentColor = 0xdcff85,
}: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const disposables: {
      geometry?: THREE.BufferGeometry;
      material?: THREE.Material | THREE.Material[];
    }[] = [];

    const group = new THREE.Group();
    scene.add(group);

    if (variant === "torus") {
      const geom = new THREE.TorusGeometry(12, 3.2, 16, 100);
      const mat = new THREE.MeshBasicMaterial({
        color: 0x1a2406,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      });
      const mesh = new THREE.Mesh(geom, mat);
      group.add(mesh);
      disposables.push({ geometry: geom, material: mat });

      const count = 180;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const radius = 12 + Math.cos(3 * u) * 3.2;
        positions[i * 3] = radius * Math.cos(2 * u) + (Math.random() - 0.5) * 4;
        positions[i * 3 + 1] =
          radius * Math.sin(2 * u) + (Math.random() - 0.5) * 4;
        positions[i * 3 + 2] =
          -Math.sin(3 * u) * 3.2 + (Math.random() - 0.5) * 4;
      }
      const pGeom = new THREE.BufferGeometry();
      pGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const pMat = new THREE.PointsMaterial({
        color: accentColor,
        size: 1.5,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(pGeom, pMat);
      group.add(points);
      disposables.push({ geometry: pGeom, material: pMat });
    } else if (variant === "orb") {
      const geom = new THREE.IcosahedronGeometry(14, 2);
      const mat = new THREE.MeshBasicMaterial({
        color: 0x223309,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const mesh = new THREE.Mesh(geom, mat);
      group.add(mesh);
      disposables.push({ geometry: geom, material: mat });

      const count = 120;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const r = Math.random() * 11;
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      const pGeom = new THREE.BufferGeometry();
      pGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const pMat = new THREE.PointsMaterial({
        color: accentColor,
        size: 1.6,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(pGeom, pMat);
      group.add(points);
      disposables.push({ geometry: pGeom, material: pMat });

      const ringGeom = new THREE.RingGeometry(18, 0.2, 64, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x69833b,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.rotation.x = Math.PI / 3;
      group.add(ring);
      disposables.push({ geometry: ringGeom, material: ringMat });
    } else {
      // particles + ambient 3D geometric constellation
      const count = 160;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 70;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      }
      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        color: accentColor,
        size: 2.0,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(geom, mat);
      group.add(points);
      disposables.push({ geometry: geom, material: mat });

      // Ambient 3D wireframe lattice
      const wireGeom = new THREE.IcosahedronGeometry(22, 1);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x163300,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      });
      const wireMesh = new THREE.Mesh(wireGeom, wireMat);
      group.add(wireMesh);
      disposables.push({ geometry: wireGeom, material: wireMat });
    }

    let targetX = 0;
    let targetY = 0;
    let currX = 0;
    let currY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      targetX = (relX / (rect.width || 1)) * 2;
      targetY = -(relY / (rect.height || 1)) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / (h || 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          renderLoop();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const startTime = performance.now();
    const renderLoop = () => {
      if (!isVisible) {
        animId = 0;
        return;
      }
      animId = requestAnimationFrame(renderLoop);
      const elapsed = (performance.now() - startTime) * 0.001;
      currX += (targetX - currX) * 0.04;
      currY += (targetY - currY) * 0.04;
      group.rotation.y = elapsed * 0.12 + currX * 0.4;
      group.rotation.x = elapsed * 0.06 + currY * 0.4;
      renderer.render(scene, camera);
    };
    renderLoop();

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      disposables.forEach(({ geometry, material }) => {
        geometry?.dispose();
        if (Array.isArray(material)) {
          material.forEach((m) => m.dispose());
        } else {
          material?.dispose();
        }
      });
    };
  }, [variant, accentColor]);

  return <div ref={containerRef} className={className} />;
}
