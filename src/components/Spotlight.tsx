import { useRef, useState, type HTMLAttributes, type PointerEvent, type ReactNode } from 'react';

interface SpotlightProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  withTilt?: boolean;
  tiltMax?: number;
  glowColor?: string;
  borderColor?: string;
}

/**
 * High-Performance Spotlight & 3D Parallax Tilt Card
 * Supports dual cursor-following glow (background AND border) + optional 3D parallax tilt and specular glare.
 * Uses hardware-accelerated CSS variables and transforms; disabled automatically on touch or reduced motion.
 */
export function Spotlight({
  children,
  className = '',
  withTilt = false,
  tiltMax = 7,
  glowColor = 'rgba(198, 255, 0, 0.08)',
  borderColor = 'rgba(198, 255, 0, 0.35)',
  onPointerMove,
  onPointerLeave,
  style,
  ...rest
}: SpotlightProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transformStyle, setTransformStyle] = useState<string>('');

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const isFine = window.matchMedia('(pointer: fine)').matches && window.matchMedia('(hover: hover)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty('--mx', `${x.toFixed(1)}px`);
    el.style.setProperty('--my', `${y.toFixed(1)}px`);

    if (withTilt && isFine && !isReduced) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -((y - centerY) / centerY) * tiltMax;
      const rotateY = ((x - centerX) / centerX) * tiltMax;

      setTransformStyle(
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(4px)`
      );
    }

    if (!isHovered) setIsHovered(true);
    onPointerMove?.(e);
  };

  const handlePointerLeave = (e: PointerEvent<HTMLDivElement>) => {
    setIsHovered(false);
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
    onPointerLeave?.(e);
  };

  return (
    <div
      ref={cardRef}
      className={`spotlight relative border border-white/10 bg-[#11151A] rounded-none transition-transform duration-200 ease-out will-change-transform ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: transformStyle || undefined,
        ...style,
      }}
      {...rest}
    >
      {/* Dynamic Cursor Spotlight Border Glow */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-none opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at var(--mx, -500px) var(--my, -500px), ${borderColor}, transparent 70%)`,
          maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          WebkitMaskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
        aria-hidden="true"
      />

      {/* Dynamic Cursor Spotlight Background Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-none opacity-0 transition-opacity duration-300 overflow-hidden"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at var(--mx, -500px) var(--my, -500px), ${glowColor}, transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* Specular Glare Reflection on Tilt */}
      {withTilt && (
        <div
          className="pointer-events-none absolute inset-0 rounded-none opacity-0 transition-opacity duration-300 mix-blend-overlay"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: `radial-gradient(500px circle at var(--mx, -500px) var(--my, -500px), rgba(255,255,255,0.4), transparent 60%)`,
          }}
          aria-hidden="true"
        />
      )}

      {children}
    </div>
  );
}
