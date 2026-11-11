# Nap

[nap.cx](https://nap.cx) is the website for Nap, a native Mac interface for coding agents.

The `hexinspo` branch is a minimal dark landing page with Ghost Shift, an original ghost maze game. Collect dots, dodge rivals, and turn the tables with power dots. Supports arrow keys / WASD, swipe, and touch buttons. Space pauses; sound is optional and off by default. Simulation and PathFinding.js rival routing load only when play starts.

Run `npm ci`, then `npm run dev -- --port 3000`. Verify with `npm run build`, `npm run lint`, and `node scripts/test-ghost-shift.cjs`. The macOS download remains accessible without playing or enabling JavaScript.
