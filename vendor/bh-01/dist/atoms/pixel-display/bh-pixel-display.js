import { css as g, nothing as n, html as c } from "lit";
import { property as h, customElement as v } from "lit/decorators.js";
import { BaseElement as b } from "../../primitives/base-element.js";
var u = Object.defineProperty, w = Object.getOwnPropertyDescriptor, p = (s, e, t, l) => {
  for (var r = l > 1 ? void 0 : l ? w(e, t) : e, a = s.length - 1, i; a >= 0; a--)
    (i = s[a]) && (r = (l ? i(e, t, r) : i(r)) || r);
  return l && r && u(e, t, r), r;
};
const d = ["off", "primary", "success", "warning", "danger"];
let o = class extends b {
  constructor() {
    super(...arguments), this.cols = 20, this.rows = 5, this.label = "", this._pixelEls = [];
  }
  render() {
    const s = this.cols * this.rows, e = this.label.length > 0;
    return c`
      <div
        class="grid"
        part="grid"
        role=${e ? "img" : n}
        aria-label=${e ? this.label : n}
        aria-hidden=${e ? n : "true"}
        style="--_cols:${this.cols};--_rows:${this.rows}"
      >
        ${Array.from(
      { length: s },
      () => c`<div class="px" part="pixel" aria-hidden="true"></div>`
    )}
      </div>
    `;
  }
  updated() {
    const s = this.data, e = this._prevData, t = this.shadowRoot.querySelector(".grid");
    if (!t) return;
    this._pixelEls = Array.from(t.querySelectorAll(".px"));
    const l = this.cols * this.rows;
    for (let r = 0; r < l && r < this._pixelEls.length; r++) {
      const a = s && r < s.length ? s[r] : 0, i = e && r < e.length ? e[r] : -1;
      if (a !== i) {
        const x = this._pixelEls[r];
        x.className = `px ${a > 0 && a < d.length ? d[a] : ""}`.trimEnd();
      }
    }
    s && (this._prevData = new Uint8Array(s));
  }
};
o.styles = [
  ...[b.styles].flat(),
  g`
      :host {
        display: inline-block;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(var(--_cols), var(--bh-pixel-size, 4px));
        grid-template-rows: repeat(var(--_rows), var(--bh-pixel-size, 4px));
        gap: var(--bh-pixel-gap, 1px);
      }

      .px {
        width: var(--bh-pixel-size, 4px);
        height: var(--bh-pixel-size, 4px);
        border-radius: var(--bh-pixel-radius, 1px);
        background: var(--bh-pixel-off, var(--bh-color-surface-recessed));
        transition: background 0.15s, box-shadow 0.15s;
      }

      .px.primary {
        background: var(--bh-color-primary);
        box-shadow: 0 0 var(--bh-pixel-glow, 4px) var(--bh-color-primary-glow);
      }

      .px.success {
        background: var(--bh-color-success);
        box-shadow: 0 0 var(--bh-pixel-glow, 4px) var(--bh-color-success-dim);
      }

      .px.warning {
        background: var(--bh-color-warning);
        box-shadow: 0 0 var(--bh-pixel-glow, 4px) var(--bh-color-warning-dim);
      }

      .px.danger {
        background: var(--bh-color-danger);
        box-shadow: 0 0 var(--bh-pixel-glow, 4px) rgba(239, 68, 68, 0.4);
      }
    `
];
p([
  h({ type: Number })
], o.prototype, "cols", 2);
p([
  h({ type: Number })
], o.prototype, "rows", 2);
p([
  h({ attribute: !1 })
], o.prototype, "data", 2);
p([
  h()
], o.prototype, "label", 2);
o = p([
  v("bh-pixel-display")
], o);
export {
  o as BhPixelDisplay
};
//# sourceMappingURL=bh-pixel-display.js.map
