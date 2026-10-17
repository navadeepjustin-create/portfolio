import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Program, Mesh, Triangle, type OGLRenderingContext } from 'ogl';

interface HeroShaderProps {
  className?: string;
}

const VERTEX_SHADER = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uPointer;

  // Simplex-inspired fast 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    st.x *= uResolution.x / uResolution.y;

    vec2 mouse = uPointer;
    mouse.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.15;

    // Multi-octave organic drift with soft mouse interaction
    float d = distance(st, mouse);
    float mouseInfluence = smoothstep(0.8, 0.0, d) * 0.25;

    vec2 q = vec2(
      snoise(st * 1.2 + vec2(t * 0.4, t * 0.2)),
      snoise(st * 1.2 + vec2(-t * 0.3, t * 0.5))
    );

    vec2 r = vec2(
      snoise(st * 1.8 + 2.0 * q + vec2(t * 0.2, -t * 0.3) + mouseInfluence),
      snoise(st * 1.8 + 2.0 * q + vec2(-t * 0.2, t * 0.4) - mouseInfluence)
    );

    float f = snoise(st * 1.5 + 2.5 * r + t * 0.2);
    f = 0.5 + 0.5 * f;

    // Color palette tokens:
    // Base obsidian #080A0D (0.031, 0.039, 0.051)
    // Dark graphite #11151A (0.067, 0.082, 0.102)
    // Deep surface #171D24 (0.090, 0.114, 0.141)
    // Electric lime #C6FF00 (0.776, 1.0, 0.0)
    vec3 colBase = vec3(0.031, 0.039, 0.051);
    vec3 colGraphite = vec3(0.067, 0.082, 0.102);
    vec3 colSurface = vec3(0.090, 0.114, 0.141);
    vec3 colLime = vec3(0.776, 1.0, 0.0);

    vec3 color = mix(colBase, colGraphite, clamp(f * 1.4, 0.0, 1.0));
    color = mix(color, colSurface, clamp(length(q) * 0.8, 0.0, 1.0));

    // Subtle, expensive electric lime luminescence
    float limeAccent = smoothstep(0.72, 0.98, f) * 0.12;
    // Add soft radial halo around mouse
    limeAccent += smoothstep(0.5, 0.0, d) * 0.04;

    color = mix(color, colLime, limeAccent);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export const HeroShader: React.FC<HeroShaderProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    // 1. Accessibility & device capability checks
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches || !window.matchMedia('(hover: hover)').matches;

    if (prefersReducedMotion || isTouch) {
      setUseFallback(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let renderer: Renderer | null = null;
    let gl: OGLRenderingContext | null = null;
    let animationFrameId: number;
    let isVisible = true;
    let targetPointer = [0.5, 0.5];
    let currentPointer = [0.5, 0.5];

    try {
      renderer = new Renderer({
        alpha: true,
        dpr: Math.min(window.devicePixelRatio || 1, 1.5),
        powerPreference: 'low-power',
      });
      gl = renderer.gl;

      if (!gl) {
        setUseFallback(true);
        return;
      }

      gl.clearColor(0.031, 0.039, 0.051, 1);
      const canvas = gl.canvas as HTMLCanvasElement;
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.style.opacity = '0.85';
      container.appendChild(canvas);

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: VERTEX_SHADER,
        fragment: FRAGMENT_SHADER,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: [container.clientWidth, container.clientHeight] },
          uPointer: { value: [0.5, 0.5] },
        },
      });

      const mesh = new Mesh(gl, { geometry, program });

      const resize = () => {
        if (!container || !renderer || !gl) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        program.uniforms.uResolution.value = [width, height];
      };

      window.addEventListener('resize', resize);
      resize();

      // Mouse tracking for subtle organic flow
      const handlePointerMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        if (rect.height <= 0 || rect.width <= 0) return;
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1.0 - (e.clientY - rect.top) / rect.height; // Flip Y for WebGL
        targetPointer = [Math.max(0, Math.min(1, x)), Math.max(0, Math.min(1, y))];
      };

      window.addEventListener('mousemove', handlePointerMove, { passive: true });

      // IntersectionObserver: Pause when offscreen to preserve battery and 60fps
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting;
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(container);

      let startTime = performance.now();

      const render = (time: number) => {
        animationFrameId = requestAnimationFrame(render);
        if (!isVisible || !renderer || !gl) return;

        // Smooth cursor interpolation
        currentPointer[0] += (targetPointer[0] - currentPointer[0]) * 0.05;
        currentPointer[1] += (targetPointer[1] - currentPointer[1]) * 0.05;

        program.uniforms.uTime.value = (time - startTime) * 0.001;
        program.uniforms.uPointer.value = currentPointer;

        renderer.render({ scene: mesh });
      };

      animationFrameId = requestAnimationFrame(render);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousemove', handlePointerMove);
        observer.disconnect();
        if (canvas && canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
        if (gl) {
          const loseContext = gl.getExtension('WEBGL_lose_context');
          if (loseContext) loseContext.loseContext();
        }
      };
    } catch {
      setUseFallback(true);
    }
  }, []);

  if (useFallback) {
    return (
      <div
        className={`absolute inset-0 bg-radial-ambient pointer-events-none transition-opacity duration-700 ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};
