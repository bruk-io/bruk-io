import { css as b, html as p } from "lit";
import { property as i, customElement as d } from "lit/decorators.js";
import { BaseElement as u } from "../../primitives/base-element.js";
var v = Object.defineProperty, m = Object.getOwnPropertyDescriptor, r = (s, t, n, o) => {
  for (var a = o > 1 ? void 0 : o ? m(t, n) : t, l = s.length - 1, h; l >= 0; l--)
    (h = s[l]) && (a = (o ? h(t, n, a) : h(a)) || a);
  return o && a && v(t, n, a), a;
};
let e = class extends u {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.value = 0, this.disabled = !1, this.showValue = !1, this.label = "";
  }
  render() {
    return p`
      <div class="slider">
        <input
          part="track"
          type="range"
          .min=${String(this.min)}
          .max=${String(this.max)}
          .step=${String(this.step)}
          .value=${String(this.value)}
          ?disabled=${this.disabled}
          aria-label=${this.label || "Slider"}
          @input=${this._handleInput}
          @change=${this._handleChange}
        />
        ${this.showValue ? p`<span class="value" part="value">${this.value}</span>` : ""}
      </div>
    `;
  }
  _handleInput(s) {
    const t = s.target;
    this.value = Number(t.value), this.dispatchEvent(
      new CustomEvent("bh-input", {
        bubbles: !0,
        composed: !0,
        detail: { value: this.value }
      })
    );
  }
  _handleChange(s) {
    const t = s.target;
    this.value = Number(t.value), this.dispatchEvent(
      new CustomEvent("bh-change", {
        bubbles: !0,
        composed: !0,
        detail: { value: this.value }
      })
    );
  }
};
e.styles = [
  ...[u.styles].flat(),
  b`
      :host {
        display: block;
      }

      .slider {
        display: flex;
        align-items: center;
        gap: var(--bh-spacing-3);
      }

      input[type='range'] {
        -webkit-appearance: none;
        appearance: none;
        flex: 1;
        height: var(--bh-slider-track-height, 4px);
        background: var(--bh-slider-track-color, var(--bh-color-surface-raised));
        border-radius: var(--bh-radius-full);
        outline: none;
        margin: 0;
      }

      input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: var(--bh-slider-thumb-size, 14px);
        height: var(--bh-slider-thumb-size, 14px);
        border-radius: 50%;
        background: var(--bh-slider-thumb-color, var(--bh-color-primary));
        cursor: pointer;
        transition: box-shadow var(--bh-transition-fast);
      }

      input[type='range']:focus-visible::-webkit-slider-thumb {
        box-shadow: 0 0 0 var(--bh-border-2) var(--bh-color-ring);
      }

      input[type='range']::-moz-range-thumb {
        width: var(--bh-slider-thumb-size, 14px);
        height: var(--bh-slider-thumb-size, 14px);
        border: none;
        border-radius: 50%;
        background: var(--bh-slider-thumb-color, var(--bh-color-primary));
        cursor: pointer;
      }

      input[type='range']:focus-visible::-moz-range-thumb {
        box-shadow: 0 0 0 var(--bh-border-2) var(--bh-color-ring);
      }

      .value {
        font-family: var(--bh-font-mono);
        font-size: var(--bh-text-sm);
        color: var(--bh-color-text-muted);
        font-variant-numeric: tabular-nums;
        min-width: 2ch;
        text-align: end;
      }

      /* Disabled */
      :host([disabled]) {
        opacity: 0.5;
        pointer-events: none;
      }
    `
];
r([
  i({ type: Number })
], e.prototype, "min", 2);
r([
  i({ type: Number })
], e.prototype, "max", 2);
r([
  i({ type: Number })
], e.prototype, "step", 2);
r([
  i({ type: Number })
], e.prototype, "value", 2);
r([
  i({ type: Boolean, reflect: !0 })
], e.prototype, "disabled", 2);
r([
  i({ type: Boolean, reflect: !0, attribute: "show-value" })
], e.prototype, "showValue", 2);
r([
  i()
], e.prototype, "label", 2);
e = r([
  d("bh-slider")
], e);
export {
  e as BhSlider
};
//# sourceMappingURL=bh-slider.js.map
