import { AStarFinder, Grid } from "pathfinding";
import { COLS, directionTo, homes, initialDots, key, maze, neighbor, opposite, playerStart, point, powerCells, vectors, walkable, type Direction, type Point } from "./map";

export type Phase = "ready" | "playing" | "dying" | "won" | "over";
export type Actor = { cell: Point; target: Point | null; progress: number; direction: Direction };
export type Ghost = Actor & { home: Point; color: string; cooldown: number; personality: number };
export type GameEvent = "dot" | "power" | "eat" | "hit" | "win";
const actor = (cell: Point, direction: Direction): Actor => ({ cell: { ...cell }, target: null, progress: 0, direction });
const manhattan = (a: Point, b: Point) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

export function position(a: Actor): Point {
  if (!a.target) return a.cell;
  let dx = a.target.x - a.cell.x;
  if (dx > COLS / 2) dx -= COLS;
  if (dx < -COLS / 2) dx += COLS;
  return { x: a.cell.x + dx * a.progress, y: a.cell.y + (a.target.y - a.cell.y) * a.progress };
}

export class GhostShift {
  phase: Phase = "ready";
  score: number;
  lives: number;
  level: number;
  dots = initialDots();
  powers = new Set(powerCells);
  player = actor(playerStart, "left");
  ghosts: Ghost[] = [];
  requested: Direction = "left";
  powerLeft = 0;
  combo = 0;
  elapsed = 0;
  timer = 1.1;
  immune = 0;
  toast = "";
  toastLeft = 0;
  private finder = new AStarFinder({ allowDiagonal: false });
  private grid = new Grid(maze);
  private events: GameEvent[] = [];

  constructor(level = 1, score = 0, lives = 3) {
    this.level = level; this.score = score; this.lives = lives;
    this.resetActors();
  }
  private resetActors() {
    this.player = actor(playerStart, "left");
    this.requested = "left";
    this.ghosts = homes.map((home, i) => ({
      ...actor(home, i === 0 ? "left" : "right"), home, personality: i,
      color: ["#e5a397", "#b4bde0", "#acc6ad"][i], cooldown: 1.7 + i * 1.3,
    }));
  }
  steer(direction: Direction) {
    this.requested = direction;
    if (this.player.target && opposite[this.player.direction] === direction) {
      const from = this.player.cell;
      this.player.cell = this.player.target;
      this.player.target = from;
      this.player.progress = 1 - this.player.progress;
      this.player.direction = direction;
    }
  }
  private move(a: Actor, distance: number, choose: () => Direction | null, arrive?: () => void) {
    while (distance > 0.000001) {
      if (!a.target) {
        const direction = choose();
        if (!direction) break;
        const next = neighbor(a.cell, direction);
        if (!next) break;
        a.direction = direction; a.target = next; a.progress = 0;
      }
      const amount = Math.min(1 - a.progress, distance);
      a.progress += amount; distance -= amount;
      if (a.progress >= 1 - 0.000001) {
        a.cell = a.target; a.target = null; a.progress = 0;
        arrive?.();
        if (this.phase !== "playing") break;
      }
    }
  }
  private chooseGhost(g: Ghost): Direction | null {
    const options = (Object.keys(vectors) as Direction[]).filter((d) => neighbor(g.cell, d));
    const forward = options.filter((d) => d !== opposite[g.direction]);
    const allowed = forward.length ? forward : options;
    if (!allowed.length) return null;
    if (this.powerLeft > 0) {
      return allowed.sort((a, b) => manhattan(neighbor(g.cell, b)!, this.player.cell) - manhattan(neighbor(g.cell, a)!, this.player.cell))[0];
    }
    // Distinct patterns: chase, ambush, and patrol. A* handles maze routing.
    const scatter = this.elapsed % 18 < 4;
    const corners = [{ x: 1, y: 1 }, { x: 23, y: 1 }, { x: 23, y: 15 }];
    let goal = scatter ? corners[g.personality] : this.player.target ?? this.player.cell;
    if (!scatter && g.personality === 1) {
      let ahead = { ...goal };
      for (let i = 0; i < 3; i++) ahead = neighbor(ahead, this.player.direction) ?? ahead;
      goal = ahead;
    }
    if (!scatter && g.personality === 2 && manhattan(g.cell, goal) < 5) goal = corners[2];
    // Block reversing at junctions without mutating the reusable pathfinding grid.
    const grid = this.grid.clone();
    const back = neighbor(g.cell, opposite[g.direction]);
    if (forward.length && back && key(back) !== key(goal)) grid.setWalkableAt(back.x, back.y, false);
    const path = this.finder.findPath(g.cell.x, g.cell.y, goal.x, goal.y, grid);
    if (path.length > 1) {
      const direction = directionTo(g.cell, { x: path[1][0], y: path[1][1] });
      if (allowed.includes(direction)) return direction;
    }
    return allowed[0];
  }
  private collect() {
    const index = key(this.player.cell);
    if (this.dots.delete(index)) { this.score += 10; this.events.push("dot"); }
    if (this.powers.delete(index)) {
      this.score += 50; this.powerLeft = 6.5; this.combo = 0;
      this.toast = "Power nap. Now you're the problem."; this.toastLeft = 2.6;
      this.events.push("power");
    }
    if (!this.dots.size && !this.powers.size) {
      this.phase = "won"; this.toast = "Inbox zero. For about five minutes."; this.events.push("win");
    }
  }
  private collisions() {
    const p = position(this.player);
    for (const ghost of this.ghosts) {
      if (ghost.cooldown > 0) continue;
      const g = position(ghost);
      const dx = Math.abs(p.x - g.x);
      if (Math.hypot(Math.min(dx, COLS - dx), p.y - g.y) > 0.66) continue;
      if (this.powerLeft > 0) {
        this.score += 200 * 2 ** Math.min(this.combo++, 3);
        ghost.cell = { ...ghost.home }; ghost.target = null; ghost.progress = 0; ghost.cooldown = 3;
        this.events.push("eat");
        this.toast = "Management has been put on mute."; this.toastLeft = 1.8;
      } else if (this.immune <= 0) {
        this.lives--; this.phase = "dying"; this.timer = 0.85; this.powerLeft = 0;
        this.events.push("hit");
        return;
      }
    }
  }
  update(seconds: number): GameEvent[] {
    this.events = [];
    // Fixed substeps prevent collisions from being skipped on slower devices.
    let remaining = Math.min(0.1, Math.max(0, seconds));
    while (remaining > 0.000001) {
      const dt = Math.min(remaining, 1 / 60); remaining -= dt;
      if (this.phase === "over" || this.phase === "won") break;
      if (this.phase === "ready" || this.phase === "dying") {
        this.timer -= dt;
        if (this.timer <= 0) {
          if (this.phase === "dying") {
            if (this.lives <= 0) { this.phase = "over"; continue; }
            this.resetActors(); this.phase = "ready"; this.timer = 0.8; this.immune = 1.5;
          } else this.phase = "playing";
        }
        continue;
      }
      this.elapsed += dt;
      this.powerLeft = Math.max(0, this.powerLeft - dt);
      this.immune = Math.max(0, this.immune - dt);
      this.toastLeft = Math.max(0, this.toastLeft - dt);
      this.move(this.player, dt * Math.min(5.6 + (this.level - 1) * 0.2, 6.5), () => {
        if (neighbor(this.player.cell, this.requested)) return this.requested;
        return neighbor(this.player.cell, this.player.direction) ? this.player.direction : null;
      }, () => this.collect());
      if (this.phase !== "playing") break;
      for (const ghost of this.ghosts) {
        ghost.cooldown = Math.max(0, ghost.cooldown - dt);
        if (ghost.cooldown > 0) continue;
        const speed = this.powerLeft > 0 ? 2.5 : Math.min(3.65 + ghost.personality * 0.18 + (this.level - 1) * 0.28, 5.5);
        this.move(ghost, dt * speed, () => this.chooseGhost(ghost));
      }
      this.collisions();
    }
    return this.events;
  }
  nextLevel() { return new GhostShift(this.level + 1, this.score, this.lives); }
}

export const allFloor = maze.flatMap((row, y) => row.flatMap((wall, x) => wall ? [] : [{ x, y }])).filter(walkable);
export { point };
