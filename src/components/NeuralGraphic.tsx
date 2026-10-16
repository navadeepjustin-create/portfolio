import { useMemo } from 'react';
import { motion } from 'motion/react';
import { EASE } from './Reveal';

const WIDTH = 520;
const HEIGHT = 400;
const LAYERS = [4, 6, 6, 3];
const LAYER_LABELS = ['input', 'hidden', 'hidden', 'output'];

interface NodePoint {
  x: number;
  y: number;
  layer: number;
  index: number;
}

/** A calm, decorative neural-network diagram. No data is implied. */
export function NeuralGraphic() {
  const { nodes, edges } = useMemo(() => {
    const padX = 56;
    const spacing = 56;
    const stepX = (WIDTH - padX * 2) / (LAYERS.length - 1);
    const points: NodePoint[][] = LAYERS.map((count, layer) => {
      const total = (count - 1) * spacing;
      const startY = (HEIGHT - 28) / 2 - total / 2;
      return Array.from({ length: count }, (_, index) => ({
        x: padX + layer * stepX,
        y: startY + index * spacing,
        layer,
        index,
      }));
    });
    const lines: Array<{ from: NodePoint; to: NodePoint; flow: boolean }> = [];
    points.forEach((layerPoints, layer) => {
      if (layer === points.length - 1) return;
      layerPoints.forEach((from) => {
        points[layer + 1].forEach((to) => {
          // Deterministic "random": a few edges carry a moving signal.
          const flow = (from.index * 7 + to.index * 3 + layer * 5) % 6 === 0;
          lines.push({ from, to, flow });
        });
      });
    });
    return { nodes: points.flat(), edges: lines };
  }, []);

  return (
    <div className="relative">
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-accent/30 via-transparent to-accent-2/20" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/80 p-4 sm:p-6">
        <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-faint">
          <span>model.view</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-2" aria-hidden="true" />
            learning
          </span>
        </div>
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label="Decorative diagram of a small neural network with an input layer, two hidden layers and an output layer."
          className="h-auto w-full"
        >
          <defs>
            <linearGradient id="edge-grad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#7c86ff" />
              <stop offset="1" stopColor="#4db5ff" />
            </linearGradient>
            <radialGradient id="node-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#aab0ff" />
            </radialGradient>
          </defs>

          <g>
            {edges.map((edge, i) => (
              <line
                key={`base-${i}`}
                x1={edge.from.x}
                y1={edge.from.y}
                x2={edge.to.x}
                y2={edge.to.y}
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="1"
              />
            ))}
            {edges
              .filter((e) => e.flow)
              .map((edge, i) => (
                <line
                  key={`flow-${i}`}
                  className="edge-flow"
                  style={{ animationDelay: `${(i % 7) * -0.4}s` }}
                  x1={edge.from.x}
                  y1={edge.from.y}
                  x2={edge.to.x}
                  y2={edge.to.y}
                  stroke="url(#edge-grad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.85"
                />
              ))}
          </g>

          <g>
            {nodes.map((node, i) => (
              <motion.g
                key={`${node.layer}-${node.index}`}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.03, ease: EASE }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              >
                <circle cx={node.x} cy={node.y} r="11" fill="rgba(124,134,255,0.12)" />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="4.5"
                  fill="url(#node-grad)"
                  className={(node.index + node.layer * 2) % 3 === 0 ? 'node-pulse' : undefined}
                  style={{ animationDelay: `${(i % 5) * -0.7}s` }}
                />
              </motion.g>
            ))}
          </g>

          <g fontFamily="Geist Mono, monospace" fontSize="11" fill="#8a8d9a" textAnchor="middle">
            {LAYER_LABELS.map((label, layer) => (
              <text key={layer} x={56 + layer * ((WIDTH - 112) / (LAYERS.length - 1))} y={HEIGHT - 12}>
                {label}
              </text>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
