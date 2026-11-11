import { Bodies, Body, Composite, Engine, Events } from "matter-js";

type Obstacle = { body: Body; text: string; counted: boolean };
const interruptions = ["meeting", "quick sync", "one tiny fix", "scope creep"];

export function createRunner(canvas: HTMLCanvasElement, onScore: (score: number) => void, onEnd: (reason: string) => void) {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  const engine = Engine.create({ gravity: { x: 0, y: 1.5 } });
  let width = canvas.clientWidth;
  const height = 230;
  const groundY = 175;
  const runnerX = () => width < 500 ? 52 : 92;
  const runner = Bodies.rectangle(runnerX(), groundY - 18, 27, 34, { inertia: Infinity, friction: 0, frictionAir: 0, restitution: 0 });
  const ground = Bodies.rectangle(width / 2, groundY + 12, 3000, 24, { isStatic: true, friction: 0 });
  Composite.add(engine.world, [ground, runner]);
  const ghost = new Image();
  ghost.src = "/nap-ghost.webp";
  let obstacles: Obstacle[] = [];
  let score = 0;
  let travel = 0;
  let nextSpawn = 90;
  let obstacleIndex = 0;
  let running = true;
  let visible = true;
  let raf = 0;
  let last = 0;
  let accumulator = 0;
  const stepMs = 1000 / 60;

  function resize() {
    width = canvas.clientWidth;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = height * dpr;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    Body.setPosition(runner, { x: runnerX(), y: runner.position.y });
    draw();
  }
  function draw() {
    ctx!.clearRect(0, 0, width, height);
    ctx!.strokeStyle = "#363636";
    ctx!.lineWidth = 1;
    ctx!.beginPath();
    ctx!.moveTo(0, groundY + 0.5);
    ctx!.lineTo(width, groundY + 0.5);
    ctx!.stroke();
    ctx!.fillStyle = "#454545";
    for (let x = -(travel % 47); x < width; x += 47) ctx!.fillRect(x, groundY + 10, 5, 1);
    for (const obstacle of obstacles) {
      const { x, y } = obstacle.body.position;
      ctx!.fillStyle = "#252525";
      ctx!.fillRect(x - 13, y - 13, 26, 26);
      ctx!.strokeStyle = "#858585";
      ctx!.strokeRect(x - 12.5, y - 12.5, 25, 25);
      ctx!.fillStyle = "#a5a5a5";
      ctx!.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx!.textAlign = "center";
      ctx!.fillText(obstacle.text, x, groundY - 41);
    }
    ctx!.save();
    ctx!.filter = "brightness(0) invert(1)";
    if (ghost.complete && ghost.naturalWidth) ctx!.drawImage(ghost, runner.position.x - 17, runner.position.y - 23, 34, 38);
    else { ctx!.fillStyle = "#fff"; ctx!.fillRect(runner.position.x - 14, runner.position.y - 18, 28, 34); }
    ctx!.restore();
  }
  function end(reason: string) {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
    onEnd(reason);
  }
  Events.on(engine, "collisionStart", (event) => {
    for (const pair of event.pairs) {
      const other = pair.bodyA === runner ? pair.bodyB : pair.bodyB === runner ? pair.bodyA : null;
      const hit = obstacles.find((obstacle) => obstacle.body === other);
      if (hit) end(hit.text);
    }
  });
  function step() {
    const speed = Math.min(3.7 + score * 0.08, 5.1);
    travel += speed;
    if (travel >= nextSpawn) {
      const obstacle = Bodies.rectangle(width + 50, groundY - 13, 26, 26, { isStatic: true, isSensor: true });
      obstacles.push({ body: obstacle, text: interruptions[obstacleIndex % interruptions.length], counted: false });
      Composite.add(engine.world, obstacle);
      nextSpawn = travel + 295 + (obstacleIndex % 3) * 47;
      obstacleIndex++;
    }
    for (const obstacle of obstacles) {
      Body.setPosition(obstacle.body, { x: obstacle.body.position.x - speed, y: obstacle.body.position.y });
      if (!obstacle.counted && obstacle.body.position.x < runnerX() - 35) {
        obstacle.counted = true;
        onScore(++score);
      }
    }
    for (const obstacle of obstacles.filter((obstacle) => obstacle.body.position.x < -80)) Composite.remove(engine.world, obstacle.body);
    obstacles = obstacles.filter((obstacle) => obstacle.body.position.x >= -80);
    Engine.update(engine, stepMs);
    Body.setPosition(runner, { x: runnerX(), y: runner.position.y });
    Body.setVelocity(runner, { x: 0, y: runner.velocity.y });
  }
  function tick(now: number) {
    if (!running || !visible || document.hidden) { last = 0; return; }
    accumulator += Math.min(last ? now - last : stepMs, 80);
    last = now;
    while (accumulator >= stepMs && running) { step(); accumulator -= stepMs; }
    draw();
    if (running) raf = requestAnimationFrame(tick);
  }
  function resume() {
    cancelAnimationFrame(raf);
    last = 0;
    accumulator = 0;
    if (running && visible && !document.hidden) raf = requestAnimationFrame(tick);
  }
  const observer = new ResizeObserver(resize);
  const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
  observer.observe(canvas);
  intersection.observe(canvas);
  document.addEventListener("visibilitychange", resume);
  ghost.onload = draw;
  resize();
  resume();
  return {
    jump() {
      if (running && runner.position.y >= groundY - 20 && Math.abs(runner.velocity.y) < 1) Body.setVelocity(runner, { x: 0, y: -9.4 });
    },
    destroy() {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", resume);
      ghost.onload = null;
      Events.off(engine, "collisionStart");
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    },
  };
}
