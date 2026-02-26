import { css as p, nothing as h, html as b } from "lit";
import { property as t, customElement as u } from "lit/decorators.js";
import { BaseElement as c } from "../../primitives/base-element.js";
var v = Object.defineProperty, f = Object.getOwnPropertyDescriptor, a = (d, o, i, s) => {
  for (var r = s > 1 ? void 0 : s ? f(o, i) : o, l = d.length - 1, n; l >= 0; l--)
    (n = d[l]) && (r = (s ? n(o, i, r) : n(r)) || r);
  return s && r && v(o, i, r), r;
};
let e = class extends c {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.value = "", this.name = "", this.label = "";
  }
  render() {
    return b`
      <label>
        <input
          type="radio"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          name=${this.name || h}
          value=${this.value || h}
          aria-label=${this.label || h}
          @change=${this._handleChange}
        />
        <span class="radio" part="radio">
          <span class="dot"></span>
        </span>
        <span class="label" part="label"><slot>${this.label}</slot></span>
      </label>
    `;
  }
  _handleChange() {
    this.checked = !0, this.dispatchEvent(
      new CustomEvent("bh-change", {
        bubbles: !0,
        composed: !0,
        detail: { checked: !0, value: this.value }
      })
    );
  }
};
e.styles = [
  ...[c.styles].flat(),
  p`
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

      .radio {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--bh-radio-size, 1.25rem);
        height: var(--bh-radio-size, 1.25rem);
        border: var(--bh-border-2) solid var(--bh-color-border);
        border-radius: var(--bh-radius-full);
        background: var(--bh-color-surface-raised);
        transition: border-color var(--bh-transition-fast);
        flex-shrink: 0;
      }

      .dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: var(--bh-radius-full);
        background: var(--bh-color-primary-text);
        opacity: 0;
        transform: scale(0);
        transition: opacity var(--bh-transition-fast),
                    transform var(--bh-transition-fast);
      }

      /* Checked */
      :host([checked]) .radio {
        background: var(--bh-color-primary);
        border-color: var(--bh-color-primary);
      }

      :host([checked]) .dot {
        opacity: 1;
        transform: scale(1);
      }

      /* Focus */
      input:focus-visible ~ .radio {
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
a([
  t({ type: Boolean, reflect: !0 })
], e.prototype, "checked", 2);
a([
  t({ type: Boolean, reflect: !0 })
], e.prototype, "disabled", 2);
a([
  t()
], e.prototype, "value", 2);
a([
  t()
], e.prototype, "name", 2);
a([
  t()
], e.prototype, "label", 2);
e = a([
  u("bh-radio")
], e);
export {
  e as BhRadio
};
//# sourceMappingURL=bh-radio.js.map
