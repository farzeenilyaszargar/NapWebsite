import { COLS, ROWS, maze, point, vectors } from "./map";
import { position, type Actor, type GhostShift } from "./model";

export const WIDTH = 500;
export const HEIGHT = 340;
export function draw(ctx: CanvasRenderingContext2D, game: GhostShift, reduced: boolean) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = "#101010"; ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.lineWidth = 1.15; ctx.strokeStyle = "#3f4145";
  ctx.lineJoin = "round"; ctx.lineCap = "round";
  ctx.beginPath();
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
    if (!maze[y][x]) continue;
    const l = x * 20, t = y * 20;
    if (y && !maze[y - 1][x]) { ctx.moveTo(l, t); ctx.lineTo(l + 20, t); }
    if (y < ROWS - 1 && !maze[y + 1][x]) { ctx.moveTo(l, t + 20); ctx.lineTo(l + 20, t + 20); }
    if (x && !maze[y][x - 1]) { ctx.moveTo(l, t); ctx.lineTo(l, t + 20); }
    if (x < COLS - 1 && !maze[y][x + 1]) { ctx.moveTo(l + 20, t); ctx.lineTo(l + 20, t + 20); }
  }
  ctx.stroke();
  ctx.fillStyle = "#777875";
  for (const index of game.dots) { const p = point(index); ctx.beginPath(); ctx.arc(p.x * 20 + 10, p.y * 20 + 10, 1.4, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = "#e7ddc2";
  for (const index of game.powers) { const p = point(index); ctx.beginPath(); ctx.arc(p.x * 20 + 10, p.y * 20 + 10, 3.4 + (reduced ? 0 : Math.sin(game.elapsed * 3) * .4), 0, Math.PI * 2); ctx.fill(); }
  function ghost(a: Actor, color: string, alpha = 1, scared = false) {
    const p = position(a), v = vectors[a.direction];
    for (const offset of [-WIDTH, 0, WIDTH]) {
      ctx.save(); ctx.translate(p.x * 20 + 10 + offset, p.y * 20 + 10); ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.moveTo(-7.5, 6); ctx.lineTo(-7.5, -1); ctx.bezierCurveTo(-7.5, -11, 7.5, -11, 7.5, -1); ctx.lineTo(7.5, 6);
      ctx.quadraticCurveTo(6, 9, 3.8, 6.5); ctx.quadraticCurveTo(2, 5, 0, 7); ctx.quadraticCurveTo(-2, 9, -4, 6.5); ctx.quadraticCurveTo(-6, 5, -7.5, 6); ctx.fill();
      for (const x of [-3, 3]) {
        ctx.fillStyle = scared ? "#f2eeee" : "#22242b";
        ctx.beginPath(); ctx.ellipse(x + v.x * 1.1, -1 + v.y, 1.3, 1.9, 0, 0, Math.PI * 2); ctx.fill();
      }
      if (scared) { ctx.strokeStyle = "#f2eeee"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-3, 4); ctx.lineTo(-1, 3); ctx.lineTo(1, 4); ctx.lineTo(3, 3); ctx.stroke(); }
      ctx.restore();
    }
  }
  for (const g of game.ghosts) {
    const powered = game.powerLeft > 0 && g.cooldown <= 0;
    const flashing = !reduced && game.powerLeft < 1.5 && Math.floor(game.elapsed * 4) % 2 === 0;
    ghost(g, powered ? flashing ? "#8b94bd" : "#596d9f" : g.color, g.cooldown > 0 ? .35 : 1, powered);
  }
  ghost(game.player, "#f1f0eb", game.phase === "dying" ? Math.max(.1, game.timer) : game.immune && !reduced ? .6 + Math.sin(game.elapsed * 9) * .3 : 1);
}
