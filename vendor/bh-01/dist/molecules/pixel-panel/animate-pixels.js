import { AsyncDirective as a } from "lit/async-directive.js";
import { directive as c } from "lit/directive.js";
import { noChange as i } from "lit";
class f extends a {
  constructor(e) {
    super(e), this._fps = 12, this._cols = 0, this._sweepCursor = 0, this._sweepSpeed = 1, this._rafId = 0, this._pending = !1, this._stepRafId = 0, this._tickSweep = () => {
      if (!this._target || !this._prev) return;
      this._sweepCursor += this._sweepSpeed;
      const t = this._cols, n = this._target.length / t;
      if (this._sweepCursor >= t) {
        this._current = this._target, this.setValue(this._target), this._prev = void 0, this._target = void 0, this._rafId = 0;
        return;
      }
      const r = new Uint8Array(this._target.length);
      for (let s = 0; s < n; s++)
        for (let h = 0; h < t; h++) {
          const _ = s * t + h;
          r[_] = h < this._sweepCursor ? this._target[_] : this._prev[_];
        }
      this.setValue(r), this._rafId = requestAnimationFrame(this._tickSweep);
    };
  }
  render(e, t) {
    const n = (t == null ? void 0 : t.transition) ?? "step", r = (t == null ? void 0 : t.fps) ?? 12, s = (t == null ? void 0 : t.cols) ?? 0;
    return this._fps = r, this._cols = s, n === "sweep" && s > 0 ? this._handleSweep(e) : this._handleStep(e);
  }
  _handleStep(e) {
    return this._current ? e === this._current ? i : (this._target = e, this._pending ? i : (this._pending = !0, this._stepRafId = requestAnimationFrame(() => {
      this._stepRafId = 0, this._pending = !1;
      const t = this._target;
      this._current = t, this._target = void 0, this.setValue(t);
    }), i)) : (this._current = e, e);
  }
  _handleSweep(e) {
    return this._current ? e === this._current ? i : (this._cancelSweep(), this._prev = this._current, this._target = e, this._sweepCursor = 0, this._sweepSpeed = Math.ceil(this._cols / Math.ceil(0.3 * this._fps)), this._tickSweep(), i) : (this._current = e, e);
  }
  _cancelSweep() {
    this._rafId && (cancelAnimationFrame(this._rafId), this._rafId = 0);
  }
  disconnected() {
    this._cancelSweep(), this._stepRafId && (cancelAnimationFrame(this._stepRafId), this._stepRafId = 0);
  }
  reconnected() {
    this._target && this._prev && this._sweepCursor < this._cols && (this._rafId = requestAnimationFrame(this._tickSweep));
  }
}
const d = c(f);
export {
  d as animatePixels
};
//# sourceMappingURL=animate-pixels.js.map
