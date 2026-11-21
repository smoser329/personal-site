"use client";
import { useEffect, useRef, useCallback, useState } from "react";

const CELL = 20;
const COLS = 20;
const ROWS = 20;
const W = COLS * CELL;
const H = ROWS * CELL;

type Dir = { x: number; y: number };
type Pt = { x: number; y: number };

function rand(): Pt {
  return { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    snake: [{ x: 10, y: 10 }],
    dir: { x: 1, y: 0 } as Dir,
    next: { x: 1, y: 0 } as Dir,
    food: rand(),
    score: 0,
    alive: false,
    started: false,
  });
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<"idle" | "playing" | "dead">("idle");
  const rafRef = useRef<number>(0);
  const lastTickRef = useRef<number>(0);
  const SPEED = 120;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s = stateRef.current;

    ctx.fillStyle = "#0b0c0e";
    ctx.fillRect(0, 0, W, H);

    // grid dots
    ctx.fillStyle = "#24262b";
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        ctx.beginPath();
        ctx.arc(x * CELL + CELL / 2, y * CELL + CELL / 2, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // food
    const f = s.food;
    ctx.fillStyle = "#f3a83b";
    ctx.beginPath();
    ctx.arc(f.x * CELL + CELL / 2, f.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
    ctx.fill();

    // snake
    s.snake.forEach((seg, i) => {
      const alpha = 0.6 + 0.4 * (i === 0 ? 1 : (s.snake.length - i) / s.snake.length);
      ctx.fillStyle = i === 0 ? `rgba(236,231,222,${alpha})` : `rgba(180,175,166,${alpha * 0.75})`;
      const pad = i === 0 ? 1 : 2;
      ctx.beginPath();
      ctx.roundRect(seg.x * CELL + pad, seg.y * CELL + pad, CELL - pad * 2, CELL - pad * 2, 4);
      ctx.fill();
    });
  }, []);

  const tick = useCallback((ts: number) => {
    const s = stateRef.current;
    if (!s.alive) return;
    if (ts - lastTickRef.current < SPEED) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    lastTickRef.current = ts;

    s.dir = s.next;
    const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };

    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
      s.alive = false;
      setStatus("dead");
      draw();
      return;
    }
    if (s.snake.some((seg) => seg.x === head.x && seg.y === head.y)) {
      s.alive = false;
      setStatus("dead");
      draw();
      return;
    }

    s.snake.unshift(head);
    if (head.x === s.food.x && head.y === s.food.y) {
      s.score++;
      setScore(s.score);
      let newFood: Pt;
      do { newFood = rand(); } while (s.snake.some((seg) => seg.x === newFood.x && seg.y === newFood.y));
      s.food = newFood;
    } else {
      s.snake.pop();
    }

    draw();
    rafRef.current = requestAnimationFrame(tick);
  }, [draw]);

  const start = useCallback(() => {
    const s = stateRef.current;
    s.snake = [{ x: 10, y: 10 }];
    s.dir = { x: 1, y: 0 };
    s.next = { x: 1, y: 0 };
    s.food = rand();
    s.score = 0;
    s.alive = true;
    s.started = true;
    setScore(0);
    setStatus("playing");
    lastTickRef.current = 0;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const s = stateRef.current;
      const map: Record<string, Dir> = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
      };
      if (map[e.key]) {
        const nd = map[e.key];
        if (nd.x !== -s.dir.x || nd.y !== -s.dir.y) s.next = nd;
        e.preventDefault();
      }
      if ((e.key === " " || e.key === "Enter") && !s.alive) start();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [start]);

  // touch controls
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    const s = stateRef.current;
    if (Math.abs(dx) > Math.abs(dy)) {
      const nd = dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 };
      if (nd.x !== -s.dir.x) s.next = nd;
    } else {
      const nd = dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 };
      if (nd.y !== -s.dir.y) s.next = nd;
    }
    touchStart.current = null;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="rounded-2xl border border-line"
          style={{ maxWidth: "100%", display: "block" }}
        />
        {status !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-ink/80 backdrop-blur-sm">
            {status === "dead" && (
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute mb-2">Game Over</p>
            )}
            {status === "dead" && (
              <p className="font-display text-4xl font-semibold text-fg mb-6">Score: {score}</p>
            )}
            {status === "idle" && (
              <p className="font-mono text-xs text-mute mb-5">Use arrow keys or WASD</p>
            )}
            <button
              onClick={start}
              className="px-6 py-2.5 bg-amber hover:bg-fg text-ink text-sm font-semibold rounded-full transition-colors"
            >
              {status === "dead" ? "Play Again" : "Start Game"}
            </button>
          </div>
        )}
      </div>
      {status === "playing" && (
        <p className="font-mono text-xs text-mute">
          Score: <span className="text-amber">{score}</span>
        </p>
      )}
    </div>
  );
}
