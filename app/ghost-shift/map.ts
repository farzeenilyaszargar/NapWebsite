export const COLS = 25;
export const ROWS = 17;
export type Point = { x: number; y: number };
export type Direction = "up" | "down" | "left" | "right";
export const vectors: Record<Direction, Point> = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };
export const opposite: Record<Direction, Direction> = { up: "down", down: "up", left: "right", right: "left" };
export const key = ({ x, y }: Point) => y * COLS + x;
export const point = (index: number): Point => ({ x: index % COLS, y: Math.floor(index / COLS) });

// An original compact maze: broad loops outside, tighter junctions in the middle.
export const maze = Array.from({ length: ROWS }, () => Array<number>(COLS).fill(1));
function horizontal(y: number, from: number, to: number) { for (let x = from; x <= to; x++) maze[y][x] = 0; }
function vertical(x: number, from: number, to: number) { for (let y = from; y <= to; y++) maze[y][x] = 0; }
for (const y of [1, 4, 8, 12, 15]) horizontal(y, 1, COLS - 2);
for (const x of [1, 6, 12, 18, 23]) vertical(x, 1, ROWS - 2);
for (const x of [9, 15]) vertical(x, 4, 12);
horizontal(6, 1, 6); horizontal(6, 18, 23);
horizontal(10, 6, 18);
maze[6][12] = 1; maze[7][12] = 1;
maze[13][6] = 1; maze[13][18] = 1;
horizontal(8, 0, COLS - 1);

export const playerStart: Point = { x: 12, y: 15 };
export const homes: Point[] = [{ x: 9, y: 8 }, { x: 12, y: 8 }, { x: 15, y: 8 }];
export const powerCells = [{ x: 1, y: 1 }, { x: 23, y: 1 }, { x: 1, y: 15 }, { x: 23, y: 15 }].map(key);
export const walkable = (p: Point) => p.y >= 0 && p.y < ROWS && p.x >= 0 && p.x < COLS && maze[p.y][p.x] === 0;
export function neighbor(p: Point, direction: Direction): Point | null {
  const v = vectors[direction];
  let x = p.x + v.x;
  const y = p.y + v.y;
  if (y === 8) x = (x + COLS) % COLS;
  const next = { x, y };
  return walkable(next) ? next : null;
}
export function directionTo(from: Point, to: Point): Direction {
  if (to.y < from.y) return "up";
  if (to.y > from.y) return "down";
  return (to.x > from.x && to.x - from.x < COLS - 1) || from.x - to.x === COLS - 1 ? "right" : "left";
}
export function initialDots() {
  const dots = new Set<number>();
  for (let y = 1; y < ROWS - 1; y++) for (let x = 1; x < COLS - 1; x++) {
    const index = key({ x, y });
    if (walkable({ x, y }) && !powerCells.includes(index) && !homes.some((p) => key(p) === index) && index !== key(playerStart)) dots.add(index);
  }
  return dots;
}
