import React, { useRef, useEffect } from "react";

interface CellState {
  alpha: number;
  maxAlpha: number;
}

interface AnchorCell {
  colRatio: number;
  rowRatio: number;
  code: string;
}

const ANCHOR_CELLS: AnchorCell[] = [
  { colRatio: 0.12, rowRatio: 0.22, code: "01" },
  { colRatio: 0.88, rowRatio: 0.18, code: "02" },
  { colRatio: 0.25, rowRatio: 0.75, code: "03" },
  { colRatio: 0.72, rowRatio: 0.82, code: "04" },
  { colRatio: 0.48, rowRatio: 0.35, code: "05" },
  { colRatio: 0.92, rowRatio: 0.65, code: "06" },
];

export const HeroBackgroundGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isLoopRunningRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cellSize = window.innerWidth <= 768 ? 48 : 56;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;

    const isDarkMode = () => document.documentElement.classList.contains("dark");

    const activeCells = new Map<string, CellState>();

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      cols = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);

      drawBaseGrid();
    };

    const drawBaseGrid = () => {
      ctx.clearRect(0, 0, width, height);

      const dark = isDarkMode();

      // Fine structural grid lines (1px crisp lines)
      ctx.beginPath();
      ctx.strokeStyle = dark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.035)";
      ctx.lineWidth = 1;

      // Vertical lines
      for (let c = 0; c <= cols; c++) {
        const x = Math.round(c * cellSize) + 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }

      // Horizontal lines
      for (let r = 0; r <= rows; r++) {
        const y = Math.round(r * cellSize) + 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Draw anchor crosses at selected intersections
      ctx.strokeStyle = dark ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 0, 0, 0.12)";
      ctx.lineWidth = 1;

      ANCHOR_CELLS.forEach((anchor) => {
        const targetCol = Math.min(cols - 1, Math.floor(cols * anchor.colRatio));
        const targetRow = Math.min(rows - 1, Math.floor(rows * anchor.rowRatio));
        const x = targetCol * cellSize;
        const y = targetRow * cellSize;

        // Draw small corner cross "+"
        const arm = 3.5;
        ctx.beginPath();
        ctx.moveTo(x - arm, y);
        ctx.lineTo(x + arm, y);
        ctx.moveTo(x, y - arm);
        ctx.lineTo(x, y + arm);
        ctx.stroke();

        // Draw small numeric coordinate index
        ctx.font = "600 8px 'JetBrains Mono', monospace";
        ctx.fillStyle = dark ? "rgba(255, 255, 255, 0.22)" : "rgba(0, 0, 0, 0.15)";
        ctx.fillText(anchor.code, x + 5, y + 10);
      });
    };

    const render = () => {
      drawBaseGrid();

      if (activeCells.size > 0) {
        const dark = isDarkMode();

        activeCells.forEach((state, key) => {
          const [cStr, rStr] = key.split("_");
          const c = parseInt(cStr, 10);
          const r = parseInt(rStr, 10);

          const x = c * cellSize;
          const y = r * cellSize;

          if (dark) {
            // Dark mode: subtle, elegant illumination
            const fillAlpha = state.alpha * 0.045;
            ctx.fillStyle = `rgba(255, 255, 255, ${fillAlpha})`;
            ctx.fillRect(x + 1, y + 1, cellSize - 1, cellSize - 1);

            const strokeAlpha = state.alpha * 0.14;
            ctx.strokeStyle = `rgba(255, 255, 255, ${strokeAlpha})`;
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 0.5, y + 0.5, cellSize, cellSize);
          } else {
            // Light mode: soft obsidian shadow
            const fillAlpha = state.alpha * 0.035;
            ctx.fillStyle = `rgba(23, 23, 23, ${fillAlpha})`;
            ctx.fillRect(x + 1, y + 1, cellSize - 1, cellSize - 1);

            const strokeAlpha = state.alpha * 0.12;
            ctx.strokeStyle = `rgba(23, 23, 23, ${strokeAlpha})`;
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 0.5, y + 0.5, cellSize, cellSize);
          }

          state.alpha *= 0.935;
          if (state.alpha < 0.008) {
            activeCells.delete(key);
          }
        });
      }

      if (activeCells.size > 0) {
        animationFrameRef.current = requestAnimationFrame(render);
      } else {
        isLoopRunningRef.current = false;
        animationFrameRef.current = null;
      }
    };

    const startLoop = () => {
      if (!isLoopRunningRef.current && !prefersReducedMotion) {
        isLoopRunningRef.current = true;
        animationFrameRef.current = requestAnimationFrame(render);
      }
    };

    const activateCell = (clientX: number, clientY: number) => {
      if (prefersReducedMotion) return;

      const rect = container.getBoundingClientRect();
      const relX = clientX - rect.left;
      const relY = clientY - rect.top;

      if (relX < 0 || relX > rect.width || relY < 0 || relY > rect.height) return;

      const centerCol = Math.floor(relX / cellSize);
      const centerRow = Math.floor(relY / cellSize);

      for (let dc = -1; dc <= 1; dc++) {
        for (let dr = -1; dr <= 1; dr++) {
          const c = centerCol + dc;
          const r = centerRow + dr;

          if (c >= 0 && c < cols && r >= 0 && r < rows) {
            const key = `${c}_${r}`;
            const isCenter = dc === 0 && dr === 0;
            const targetAlpha = isCenter ? 1.0 : 0.32;

            const existing = activeCells.get(key);
            if (!existing || existing.alpha < targetAlpha) {
              activeCells.set(key, { alpha: targetAlpha, maxAlpha: targetAlpha });
            }
          }
        }
      }

      startLoop();
    };

    const handlePointerMove = (e: PointerEvent) => {
      activateCell(e.clientX, e.clientY);
    };

    // Watch for theme toggles dynamically
    const observer = new MutationObserver(() => {
      drawBaseGrid();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", resize);

    resize();

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
