function s(o, t, n, a = 1) {
  const i = new Uint8Array(t * n);
  if (o.length === 0 || n === 0 || t === 0) return i;
  const r = Math.max(...o), f = r > 0 ? o.map((c) => c / r) : o.map(() => 0), h = Math.max(0, f.length - t), e = f.slice(h), m = t - e.length;
  for (let c = 0; c < e.length; c++) {
    if (e[c] === 0) continue;
    const d = Math.round(e[c] * (n - 1));
    for (let l = 0; l <= d; l++) {
      const g = n - 1 - l;
      i[g * t + (m + c)] = a;
    }
  }
  return i;
}
function u(o, t, n, a = 1) {
  const i = new Uint8Array(t * n);
  if (n === 0 || t === 0) return i;
  const r = Math.max(0, Math.min(100, o)), f = Math.round(r / 100 * t), h = Math.floor(n / 2);
  for (let e = 0; e < f; e++)
    i[h * t + e] = a;
  return i;
}
function M(o, ...t) {
  const n = new Uint8Array(o);
  for (const a of t) {
    const i = Math.min(n.length, a.length);
    for (let r = 0; r < i; r++)
      a[r] !== 0 && (n[r] = a[r]);
  }
  return n;
}
export {
  u as barToGrid,
  M as compositeGrids,
  s as sparklineToGrid
};
//# sourceMappingURL=pixel-renderers.js.map
