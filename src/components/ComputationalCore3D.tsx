import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Cpu, Radio, Activity } from 'lucide-react';

export const ComputationalCore3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webGLFailed, setWebGLFailed] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let animId: number;
    let isVisible = true;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 7.5;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

      // 1. Central Core Geometric Polyhedron
      const coreGroup = new THREE.Group();
      scene.add(coreGroup);

      // Outer Wireframe Polyhedron
      const outerGeo = new THREE.IcosahedronGeometry(1.5, 1);
      const outerMat = new THREE.MeshBasicMaterial({
        color: 0xc6ff00,
        wireframe: true,
        transparent: true,
        opacity: 0.65,
      });
      const outerMesh = new THREE.Mesh(outerGeo, outerMat);
      coreGroup.add(outerMesh);

      // Inner Solid Faceted Nucleus
      const innerGeo = new THREE.OctahedronGeometry(0.85, 0);
      const innerMat = new THREE.MeshStandardMaterial({
        color: 0x11151a,
        roughness: 0.2,
        metalness: 0.85,
        emissive: 0xc6ff00,
        emissiveIntensity: 0.25,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      coreGroup.add(innerMesh);

      // 2. Holographic Gimbal Rings
      const ringGeo1 = new THREE.TorusGeometry(2.35, 0.015, 16, 120);
      const ringMat1 = new THREE.MeshBasicMaterial({
        color: 0xc6ff00,
        transparent: true,
        opacity: 0.45,
      });
      const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
      ring1.rotation.x = Math.PI / 3;
      coreGroup.add(ring1);

      const ringGeo2 = new THREE.TorusGeometry(2.8, 0.012, 16, 120);
      const ringMat2 = new THREE.MeshBasicMaterial({
        color: 0x929ba6,
        transparent: true,
        opacity: 0.25,
      });
      const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
      ring2.rotation.y = Math.PI / 4;
      coreGroup.add(ring2);

      // Small satellite nodes on the rings
      const satGeo = new THREE.SphereGeometry(0.06, 8, 8);
      const satMat = new THREE.MeshBasicMaterial({ color: 0xc6ff00 });
      const sat1 = new THREE.Mesh(satGeo, satMat);
      sat1.position.set(2.35, 0, 0);
      ring1.add(sat1);

      const sat2 = new THREE.Mesh(satGeo, satMat);
      sat2.position.set(-2.8, 0, 0);
      ring2.add(sat2);

      // 3. Orbital Particles Nebula
      const particleCount = 140;
      const particleGeo = new THREE.BufferGeometry();
      const posArray = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        const radius = 2.2 + Math.random() * 2.2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i + 2] = radius * Math.cos(phi);
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0xc6ff00,
        size: 0.045,
        transparent: true,
        opacity: 0.55,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      // Lighting
      const pointLight = new THREE.PointLight(0xc6ff00, 2, 10);
      pointLight.position.set(0, 0, 0);
      scene.add(pointLight);

      const ambientLight = new THREE.AmbientLight(0x171d24, 1.5);
      scene.add(ambientLight);

      // Target mouse variables for smooth interpolation
      let mouseX = 0;
      let mouseY = 0;
      let targetRotX = 0;
      let targetRotY = 0;

      const handlePointerMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotY = mouseX * 0.45;
        targetRotX = -mouseY * 0.45;
      };

      container.addEventListener('mousemove', handlePointerMove);

      // Scroll effect
      const handleScroll = () => {
        if (coreGroup) {
          const scrollFraction = window.scrollY / 1000;
          coreGroup.position.y = Math.sin(scrollFraction) * 0.2;
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });

      // Handle Resize
      const handleResize = () => {
        if (!container || !renderer || !camera) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
      window.addEventListener('resize', handleResize);

      // Intersection Observer to pause rendering when offscreen
      const observer = new IntersectionObserver(
        (entries) => {
          isVisible = entries[0].isIntersecting;
        },
        { threshold: 0.05 }
      );
      observer.observe(container);

      // Animation Loop
      let clock = new THREE.Clock();

      const animate = () => {
        animId = requestAnimationFrame(animate);
        if (!isVisible || prefersReducedMotion) return;

        const delta = clock.getDelta();
        const elapsedTime = clock.getElapsedTime();

        // Idle rotations
        outerMesh.rotation.y += 0.3 * delta;
        outerMesh.rotation.x += 0.15 * delta;

        innerMesh.rotation.y -= 0.5 * delta;
        innerMesh.rotation.z += 0.25 * delta;

        ring1.rotation.z += 0.45 * delta;
        ring2.rotation.z -= 0.3 * delta;

        particles.rotation.y += 0.08 * delta;

        // Smooth Mouse Lerping
        coreGroup.rotation.x += (targetRotX - coreGroup.rotation.x) * 0.06;
        coreGroup.rotation.y += (targetRotY - coreGroup.rotation.y) * 0.06;

        // Pulsing light intensity
        pointLight.intensity = 1.8 + Math.sin(elapsedTime * 2.5) * 0.6;

        renderer?.render(scene!, camera!);
      };

      animate();

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
        container.removeEventListener('mousemove', handlePointerMove);
        observer.disconnect();
        cancelAnimationFrame(animId);

        // Clean memory
        outerGeo.dispose();
        outerMat.dispose();
        innerGeo.dispose();
        innerMat.dispose();
        ringGeo1.dispose();
        ringMat1.dispose();
        ringGeo2.dispose();
        ringMat2.dispose();
        satGeo.dispose();
        satMat.dispose();
        particleGeo.dispose();
        particleMat.dispose();
        renderer?.dispose();
      };
    } catch (e) {
      console.warn('WebGL initialization failed, falling back to 2D telemetry canvas', e);
      setWebGLFailed(true);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      data-cursor-label="CORE 3D"
      className="relative w-full aspect-square max-w-[500px] mx-auto bg-[#11151A]/80 border border-white/10 p-4 sm:p-6 shadow-2xl backdrop-blur-sm group select-none overflow-hidden transition-all duration-300 hover:border-[#C6FF00]/40"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-ambient pointer-events-none" />

      {/* Cybernetic grid overlay */}
      <div className="absolute inset-0 bg-grid-cyber opacity-40 pointer-events-none" />

      {/* Fine Technical Corner Markers */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#C6FF00]/70" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#C6FF00]/70" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#C6FF00]/70" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#C6FF00]/70" />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10 font-mono text-[11px] text-[#929BA6]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#C6FF00] animate-lime-pulse" />
          <span className="text-[#F4F6F8] font-semibold tracking-wider">AIML.SYS // CORE-01</span>
        </div>
        <span className="text-[10px] text-[#929BA6] hidden sm:inline-block">HYD [17.54°N, 78.43°E]</span>
      </div>

      {/* 3D Canvas / WebGL viewport */}
      <div className="relative w-full h-[calc(100%-80px)] mt-2 flex items-center justify-center overflow-hidden">
        {!webGLFailed ? (
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
            <div className="w-20 h-20 rounded-full border border-[#C6FF00]/40 flex items-center justify-center animate-spin">
              <Cpu className="w-8 h-8 text-[#C6FF00]" />
            </div>
            <p className="font-mono text-xs text-[#929BA6]">COMPUTATIONAL MATRIX RUNNING</p>
          </div>
        )}

        {/* Central Overlay HUD Badge */}
        <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 bg-[#080A0D]/90 border border-white/10 font-mono text-[10px] text-[#929BA6] flex items-center gap-2 pointer-events-none backdrop-blur-md">
          <span className="w-1.5 h-1.5 bg-[#C6FF00]" />
          <span>THREE.JS // 60 FPS</span>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10 font-mono text-[11px] text-[#929BA6]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#F4F6F8]">
            <Radio className="w-3.5 h-3.5 text-[#C6FF00]" /> MLRIT
          </span>
          <span className="text-white/20">|</span>
          <span className="flex items-center gap-1 text-[#C6FF00]">
            <Activity className="w-3.5 h-3.5" /> ONLINE
          </span>
        </div>
        <span className="text-[10px] text-[#929BA6] uppercase tracking-widest">AIML · 2026</span>
      </div>
    </div>
  );
};
