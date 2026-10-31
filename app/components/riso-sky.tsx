"use client";

import { useEffect, useRef } from "react";

// A drifting cloud field printed as two-ink risograph halftone: blue sky screened at 15°,
// orange light screened at 75° and slightly misregistered, inks multiplied over paper grain.
const fragment = `
precision highp float;
uniform vec2 res;
uniform float time;
uniform float cell;
uniform float warmth;
uniform float seed;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7)) + seed) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 6; i++) { v += a * noise(p); p = p * 2.03 + vec2(17.3, 9.1); a *= 0.5; }
  return v;
}
float field(vec2 uv) {
  vec2 q = vec2(fbm(uv * 1.3 + vec2(0.0, time * 0.01)), fbm(uv * 1.3 + vec2(5.2, 1.3)));
  return fbm(uv * 1.5 + 1.6 * q + vec2(time * 0.018, time * 0.004));
}
float screen(vec2 px, float angle, float value) {
  float s = sin(angle), c = cos(angle);
  vec2 p = mat2(c, -s, s, c) * px / cell;
  vec2 d = fract(p) - 0.5;
  float r = sqrt(clamp(value, 0.0, 1.0)) * 0.62;
  float aa = 1.2 / cell;
  return 1.0 - smoothstep(r - aa, r + aa, length(d));
}
void main() {
  vec2 px = gl_FragCoord.xy;
  vec2 uv = px / res.y;
  float h = px.y / res.y;
  float cloud = smoothstep(0.42, 0.78, field(uv));
  float sky = clamp((1.0 - cloud) * (0.35 + 0.6 * h) + 0.05, 0.0, 1.0);
  vec2 shifted = px + vec2(2.5, -2.0) * (cell / 7.0);
  float cloudShifted = smoothstep(0.42, 0.78, field(shifted / res.y));
  float light = clamp(cloudShifted * (1.0 - h * 0.9) * warmth + (1.0 - h) * 0.12 * warmth, 0.0, 1.0);

  vec3 paper = vec3(0.957, 0.937, 0.902);
  vec3 blue = vec3(0.0, 0.471, 0.749);
  vec3 orange = vec3(1.0, 0.424, 0.184);
  float a = screen(px, radians(15.0), sky * 0.9);
  float b = screen(shifted, radians(75.0), light * 0.85);
  vec3 col = paper * mix(vec3(1.0), blue, a * 0.92) * mix(vec3(1.0), orange, b * 0.9);
  col -= (hash(px + fract(time) * 91.0) - 0.5) * 0.045;
  gl_FragColor = vec4(col, 1.0);
}`;

const vertex = "attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }";

type Props = { className?: string; warmth?: number; seed?: number };

export default function RisoSky({ className, warmth = 0.7, seed = 0 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!canvas || !gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const [res, time, cell] = [uniform("res"), uniform("time"), uniform("cell")];
    gl.uniform1f(uniform("warmth"), warmth);
    gl.uniform1f(uniform("seed"), seed);

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0, scheduled = false, visible = true;
    const start = performance.now() - seed * 1000;

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(canvas.clientWidth * scale);
      canvas.height = Math.round(canvas.clientHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(res, canvas.width, canvas.height);
      gl.uniform1f(cell, 7 * scale);
    };
    const draw = () => {
      scheduled = false;
      gl.uniform1f(time, (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      // Clouds drift slowly; 30 fps is plenty and keeps the GPU quiet.
      if (!still && visible) { scheduled = true; frame = window.setTimeout(() => requestAnimationFrame(draw), 33); }
    };
    // Starts the loop again after it paused, without ever running two loops.
    const wake = () => { if (!scheduled) draw(); };

    let onScreen = true;
    const update = () => { visible = onScreen && document.visibilityState === "visible"; if (visible) wake(); };
    const sizeObserver = new ResizeObserver(() => { resize(); wake(); });
    sizeObserver.observe(canvas);
    const viewObserver = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; update(); });
    viewObserver.observe(canvas);
    const onVisibility = update;
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    canvas.dataset.ready = "true";
    wake();
    return () => {
      window.clearTimeout(frame);
      sizeObserver.disconnect();
      viewObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [warmth, seed]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
