import { css as b, nothing as p, html as d } from "lit";
import { property as c, customElement as u } from "lit/decorators.js";
import { BaseElement as n } from "../../primitives/base-element.js";
var v = Object.defineProperty, f = Object.getOwnPropertyDescriptor, h = (r, t, i, s) => {
  for (var e = s > 1 ? void 0 : s ? f(t, i) : t, l = r.length - 1, o; l >= 0; l--)
    (o = r[l]) && (e = (s ? o(t, i, e) : o(e)) || e);
  return s && e && v(t, i, e), e;
};
let a = class extends n {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "";
  }
  render() {
    return d`
      <label>
        <input
          type="checkbox"
          role="switch"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          aria-checked=${this.checked ? "true" : "false"}
          aria-label=${this.label || p}
          @change=${this._handleChange}
        />
        <span class="track" part="track">
          <span class="thumb" part="thumb"></span>
        </span>
        <span class="label" part="label"><slot>${this.label}</slot></span>
      </label>
    `;
  }
  _handleChange(r) {
    const t = r.target;
    this.checked = t.checked, this.dispatchEvent(
      new CustomEvent("bh-change", {
        bubbles: !0,
        composed: !0,
        detail: { checked: this.checked }
      })
    );
  }
};
a.styles = [
  ...[n.styles].flat(),
  b`
      :host {
        display: inline-flex;
        align-items: center;
        gap: var(--bh-spacing-2);
        cursor: pointer;
      }

      :host([disabled]) {
        opacity: 0.5;
        cursor: not-allowed;
      }

      input {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }

      .track {
        position: relative;
        width: var(--bh-switch-width, 2.5rem);
        height: var(--bh-switch-height, 1.5rem);
        border-radius: var(--bh-radius-full);
        background: var(--bh-color-secondary);
        transition: all var(--bh-transition-fast);
        flex-shrink: 0;
      }

      .thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: calc(var(--bh-switch-height, 1.5rem) - 4px);
        height: calc(var(--bh-switch-height, 1.5rem) - 4px);
        border-radius: var(--bh-radius-full);
        background: var(--bh-color-white);
        box-shadow: var(--bh-shadow-sm);
        transition: all var(--bh-transition-fast);
      }

      /* Checked */
      :host([checked]) .track {
        background: var(--bh-color-primary);
      }

      :host([checked]) .thumb {
        transform: translateX(calc(var(--bh-switch-width, 2.5rem) - var(--bh-switch-height, 1.5rem)));
      }

      /* Focus */
      input:focus-visible ~ .track {
        outline: 2px solid var(--bh-color-ring);
        outline-offset: 2px;
      }

      /* Label */
      .label {
        font-family: var(--bh-font-sans);
        font-size: var(--bh-text-base);
        line-height: var(--bh-leading-normal);
        color: var(--bh-color-text);
        user-select: none;
      }
    `
];
h([
  c({ type: Boolean, reflect: !0 })
], a.prototype, "checked", 2);
h([
  c({ type: Boolean, reflect: !0 })
], a.prototype, "disabled", 2);
h([
  c()
], a.prototype, "label", 2);
a = h([
  u("bh-switch")
], a);
export {
  a as BhSwitch
};
//# sourceMappingURL=bh-switch.js.map
