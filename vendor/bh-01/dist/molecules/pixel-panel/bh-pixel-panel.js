import { css as c, html as h } from "lit";
import { property as o, customElement as f } from "lit/decorators.js";
import { BaseElement as b } from "../../primitives/base-element.js";
import { PixelDataController as d } from "./pixel-data-controller.js";
import { animatePixels as u } from "./animate-pixels.js";
import "../../atoms/pixel-display/bh-pixel-display.js";
import "../card/bh-card.js";
var v = Object.defineProperty, m = Object.getOwnPropertyDescriptor, s = (t, e, l, i) => {
  for (var a = i > 1 ? void 0 : i ? m(e, l) : e, p = t.length - 1, n; p >= 0; p--)
    (n = t[p]) && (a = (i ? n(e, l, a) : n(a)) || a);
  return i && a && v(e, l, a), a;
};
let r = class extends b {
  constructor() {
    super(...arguments), this.label = "", this.value = "", this.footerStart = "", this.footerEnd = "", this.cols = 0, this.rows = 0, this.type = "sparkline", this.transition = "step", this.fps = 12, this.color = 1, this.bufferSize = 0;
  }
  get _managed() {
    return this.cols > 0 && this.rows > 0;
  }
  willUpdate(t) {
    this._managed && (this._ctrl ? (t.has("cols") || t.has("rows") || t.has("type") || t.has("color") || t.has("bufferSize")) && this._ctrl.configure({
      cols: this.cols,
      rows: this.rows,
      type: this.type,
      color: this.color,
      bufferSize: this.bufferSize || this.cols
    }) : this._ctrl = new d(this, {
      cols: this.cols,
      rows: this.rows,
      type: this.type,
      color: this.color,
      bufferSize: this.bufferSize || this.cols
    }));
  }
  push(t) {
    var e;
    (e = this._ctrl) == null || e.push(t);
  }
  set(t) {
    var e;
    (e = this._ctrl) == null || e.set(t);
  }
  setText(t) {
    var e;
    (e = this._ctrl) == null || e.setText(t);
  }
  setGrid(t) {
    var e;
    (e = this._ctrl) == null || e.setGrid(t);
  }
  _renderDisplay() {
    return h`
      <bh-pixel-display
        .cols=${this.cols}
        .rows=${this.rows}
        .data=${u(this._ctrl.grid, {
      transition: this.transition,
      fps: this.fps,
      cols: this.cols
    })}
        label=${this.label}
      ></bh-pixel-display>
    `;
  }
  render() {
    return h`
      <bh-card class="panel" part="panel" variant="outlined" padding="none" role="group" aria-label=${this.label || "panel"}>
        <div class="header" part="header">
          <span class="label" part="label"><slot name="label">${this.label}</slot></span>
          <span class="value" part="value"><slot name="value">${this.value}</slot></span>
        </div>
        <div class="body" part="body">
          ${this._managed ? this._renderDisplay() : h`<slot></slot>`}
        </div>
        <div class="footer" part="footer">
          <span><slot name="footer-start">${this.footerStart}</slot></span>
          <span><slot name="footer-end">${this.footerEnd}</slot></span>
        </div>
      </bh-card>
    `;
  }
};
r.styles = [
  ...[b.styles].flat(),
  c`
      :host {
        display: inline-block;
      }

      bh-card {
        --bh-card-bg: var(--bh-pixel-panel-bg, var(--bh-color-surface));
        --bh-card-border: var(--bh-pixel-panel-border, var(--bh-color-border));
        --bh-card-radius: var(--bh-pixel-panel-radius, var(--bh-radius-lg));
        --bh-card-shadow: none;
      }

      .header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--bh-spacing-2);
        padding: var(--bh-spacing-2) var(--bh-spacing-3);
      }

      .label {
        font-family: var(--bh-font-mono);
        font-size: var(--bh-text-2xs);
        font-weight: var(--bh-font-semibold);
        letter-spacing: var(--bh-tracking-wider);
        text-transform: uppercase;
        color: var(--bh-color-text-muted);
      }

      .value {
        font-family: var(--bh-font-mono);
        font-size: var(--bh-text-2xs);
        font-weight: var(--bh-font-semibold);
        color: var(--bh-color-text);
      }

      .body {
        padding: 0 var(--bh-spacing-3) var(--bh-spacing-2);
      }

      .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--bh-spacing-2);
        padding: var(--bh-spacing-1-5) var(--bh-spacing-3);
        border-top: var(--bh-border-1) solid var(--bh-color-border-muted);
        font-family: var(--bh-font-mono);
        font-size: var(--bh-text-2xs);
        color: var(--bh-color-text-muted);
      }
    `
];
s([
  o()
], r.prototype, "label", 2);
s([
  o()
], r.prototype, "value", 2);
s([
  o({ attribute: "footer-start" })
], r.prototype, "footerStart", 2);
s([
  o({ attribute: "footer-end" })
], r.prototype, "footerEnd", 2);
s([
  o({ type: Number })
], r.prototype, "cols", 2);
s([
  o({ type: Number })
], r.prototype, "rows", 2);
s([
  o()
], r.prototype, "type", 2);
s([
  o()
], r.prototype, "transition", 2);
s([
  o({ type: Number })
], r.prototype, "fps", 2);
s([
  o({ type: Number })
], r.prototype, "color", 2);
s([
  o({ type: Number, attribute: "buffer-size" })
], r.prototype, "bufferSize", 2);
r = s([
  f("bh-pixel-panel")
], r);
export {
  r as BhPixelPanel
};
//# sourceMappingURL=bh-pixel-panel.js.map
