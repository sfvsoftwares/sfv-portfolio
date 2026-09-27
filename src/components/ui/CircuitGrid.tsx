'use client';

import { useEffect, useRef } from 'react';

interface CircuitGridProps {
  opacity?: number;
}

interface InteractiveTrace {
  nodeIndex: number;
  pulseProgress: number;
  pulseSpeed: number;
}

export default function CircuitGrid({ opacity = 0.15 }: CircuitGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Mouse tracking with smooth lerp
    const mouseTarget = { x: -1000, y: -1000, active: false };
    const mousePos = { x: -1000, y: -1000, opacity: 0 };

    const setupDPI = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    setupDPI();

    const gridSize = 45;
    const dots: { x: number; y: number }[] = [];
    const lines: { start: number; end: number; active: boolean; progress: number; speed: number }[] = [];

    // Create a structured grid of nodes
    for (let x = 0; x < width + gridSize; x += gridSize) {
      for (let y = 0; y < height + gridSize; y += gridSize) {
        if (Math.random() > 0.45) {
          dots.push({
            x: x + (Math.random() * 8 - 4),
            y: y + (Math.random() * 8 - 4),
          });
        }
      }
    }

    // Connect nodes into circuit traces (preferring straight lines)
    for (let i = 0; i < dots.length; i++) {
      const connections = Math.floor(Math.random() * 3) + 1;
      for (let c = 0; c < connections; c++) {
        let bestTarget = -1;
        let minDistance = Infinity;

        for (let j = 0; j < dots.length; j++) {
          if (i === j) continue;
          const dx = Math.abs(dots[j].x - dots[i].x);
          const dy = Math.abs(dots[j].y - dots[i].y);

          // Circuit-like connections: align either horizontally or vertically
          if ((dx < 12 || dy < 12) && dx + dy < gridSize * 2.8) {
            const dist = dx + dy;
            if (dist < minDistance) {
              minDistance = dist;
              bestTarget = j;
            }
          }
        }

        if (bestTarget !== -1) {
          const exists = lines.some(
            (l) => (l.start === i && l.end === bestTarget) || (l.start === bestTarget && l.end === i)
          );
          if (!exists) {
            lines.push({
              start: i,
              end: bestTarget,
              active: false,
              progress: 0,
              speed: Math.random() * 0.015 + 0.015,
            });
          }
        }
      }
    }

    // Active interactive mouse traces
    const interactiveTraces: InteractiveTrace[] = [];

    // Function to calculate standard 45-degree PCB trace path points
    const getPcbPath = (x1: number, y1: number, x2: number, y2: number): [number, number][] => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (absDx > absDy) {
        const signX = Math.sign(dx);
        const midX = x2 - absDy * signX;
        return [
          [x1, y1],
          [midX, y1],
          [x2, y2],
        ];
      } else {
        const signY = Math.sign(dy);
        const midY = y2 - absDx * signY;
        return [
          [x1, y1],
          [x1, midY],
          [x2, y2],
        ];
      }
    };

    // Calculate a point at progress t (0 to 1) along multi-segment path
    const getPointAlongPath = (points: [number, number][], t: number): [number, number] => {
      if (points.length < 2) return [points[0][0], points[0][1]];

      // Calculate segment lengths
      const lengths: number[] = [];
      let totalLength = 0;
      for (let i = 0; i < points.length - 1; i++) {
        const segDist = Math.hypot(points[i + 1][0] - points[i][0], points[i + 1][1] - points[i][1]);
        lengths.push(segDist);
        totalLength += segDist;
      }

      if (totalLength === 0) return [points[0][0], points[0][1]];

      const targetDist = t * totalLength;
      let accumulated = 0;

      for (let i = 0; i < lengths.length; i++) {
        if (accumulated + lengths[i] >= targetDist) {
          const segT = (targetDist - accumulated) / lengths[i];
          const x = points[i][0] + (points[i + 1][0] - points[i][0]) * segT;
          const y = points[i][1] + (points[i + 1][1] - points[i][1]) * segT;
          return [x, y];
        }
        accumulated += lengths[i];
      }

      return [points[points.length - 1][0], points[points.length - 1][1]];
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      if (mouseTarget.active) {
        mousePos.x += (mouseTarget.x - mousePos.x) * 0.12;
        mousePos.y += (mouseTarget.y - mousePos.y) * 0.12;
        mousePos.opacity += (1 - mousePos.opacity) * 0.08;
      } else {
        mousePos.opacity += (0 - mousePos.opacity) * 0.08;
      }

      // 1. Draw static and ambient background circuit traces
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(138, 43, 226, ${opacity * 0.45})`;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const start = dots[line.start];
        const end = dots[line.end];

        if (!start || !end) continue;

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();

        // Randomly trigger signal pulses
        if (!line.active && Math.random() < 0.006) {
          line.active = true;
          line.progress = 0;
        }

        // Draw animated signal pulse moving along ambient line
        if (line.active) {
          line.progress += line.speed;
          if (line.progress >= 1) {
            line.active = false;
          } else {
            const currentX = start.x + (end.x - start.x) * line.progress;
            const currentY = start.y + (end.y - start.y) * line.progress;

            ctx.fillStyle = '#C4B5FD';
            ctx.beginPath();
            ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 2. Draw ambient dots (circuit nodes)
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        ctx.fillStyle = `rgba(138, 43, 226, ${opacity * 0.9})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Interactive circuits following the mouse
      if (mousePos.opacity > 0.02) {
        const mouseRadius = 220;

        // Find closest nodes to mouse
        const nearbyNodes: { index: number; dist: number }[] = [];
        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];
          const dist = Math.hypot(mousePos.x - dot.x, mousePos.y - dot.y);
          if (dist < mouseRadius) {
            nearbyNodes.push({ index: i, dist });
          }
        }

        // Sort by distance and pick closest 4 to 6 nodes
        nearbyNodes.sort((a, b) => a.dist - b.dist);
        const activeConnections = nearbyNodes.slice(0, 5);

        // Synchronize interactive traces array
        for (let i = 0; i < activeConnections.length; i++) {
          const nodeIdx = activeConnections[i].index;
          let trace = interactiveTraces.find((t) => t.nodeIndex === nodeIdx);
          if (!trace) {
            trace = {
              nodeIndex: nodeIdx,
              pulseProgress: Math.random(),
              pulseSpeed: Math.random() * 0.015 + 0.012,
            };
            interactiveTraces.push(trace);
          }
        }

        // Prune traces that are no longer nearby
        for (let i = interactiveTraces.length - 1; i >= 0; i--) {
          if (!activeConnections.some((c) => c.index === interactiveTraces[i].nodeIndex)) {
            interactiveTraces.splice(i, 1);
          }
        }

        // Draw interactive PCB traces from nearby nodes to the cursor
        for (let i = 0; i < activeConnections.length; i++) {
          const conn = activeConnections[i];
          const node = dots[conn.index];
          const proximityFactor = Math.max(0, 1 - conn.dist / mouseRadius);
          const traceAlpha = proximityFactor * mousePos.opacity * 0.7;

          const pathPoints = getPcbPath(node.x, node.y, mousePos.x, mousePos.y);

          // Draw PCB routed trace
          ctx.beginPath();
          ctx.moveTo(pathPoints[0][0], pathPoints[0][1]);
          for (let p = 1; p < pathPoints.length; p++) {
            ctx.lineTo(pathPoints[p][0], pathPoints[p][1]);
          }
          ctx.lineWidth = 1.2;
          ctx.strokeStyle = `rgba(167, 139, 250, ${traceAlpha})`;
          ctx.stroke();

          // Highlight the origin node on the board
          ctx.fillStyle = `rgba(196, 181, 253, ${traceAlpha * 1.2})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 2.2, 0, Math.PI * 2);
          ctx.fill();

          // Animate electric signal pulse traveling from node into cursor
          const trace = interactiveTraces.find((t) => t.nodeIndex === conn.index);
          if (trace) {
            trace.pulseProgress += trace.pulseSpeed;
            if (trace.pulseProgress >= 1) {
              trace.pulseProgress = 0;
            }

            const [pulseX, pulseY] = getPointAlongPath(pathPoints, trace.pulseProgress);
            ctx.fillStyle = `rgba(255, 255, 255, ${traceAlpha * 1.4})`;
            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 2.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Draw cursor PCB contact pad / chip terminal
        const padAlpha = mousePos.opacity;

        // Outer concentric ring
        ctx.strokeStyle = `rgba(138, 43, 226, ${padAlpha * 0.45})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 9, 0, Math.PI * 2);
        ctx.stroke();

        // Inner solid terminal dot
        ctx.fillStyle = `rgba(196, 181, 253, ${padAlpha * 0.85})`;
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Cardinal micro ticks on terminal pad
        ctx.strokeStyle = `rgba(167, 139, 250, ${padAlpha * 0.5})`;
        ctx.beginPath();
        ctx.moveTo(mousePos.x - 12, mousePos.y);
        ctx.lineTo(mousePos.x - 9, mousePos.y);
        ctx.moveTo(mousePos.x + 9, mousePos.y);
        ctx.lineTo(mousePos.x + 12, mousePos.y);
        ctx.moveTo(mousePos.x, mousePos.y - 12);
        ctx.lineTo(mousePos.x, mousePos.y - 9);
        ctx.moveTo(mousePos.x, mousePos.y + 9);
        ctx.lineTo(mousePos.x, mousePos.y + 12);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse & Touch event listeners
    const handlePointerMove = (e: PointerEvent) => {
      mouseTarget.x = e.clientX;
      mouseTarget.y = e.clientY;
      mouseTarget.active = true;
    };

    const handlePointerLeave = () => {
      mouseTarget.active = false;
    };

    const handleResize = () => {
      setupDPI();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [opacity]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Top subtle ambient purple glow */}
      <div
        className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-purple-900/15 rounded-full blur-[140px]"
        aria-hidden="true"
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
