import { css as p, html as l, nothing as b } from "lit";
import { property as i, customElement as v } from "lit/decorators.js";
import { BaseElement as d } from "../../primitives/base-element.js";
var u = Object.defineProperty, m = Object.getOwnPropertyDescriptor, r = (o, a, n, s) => {
  for (var t = s > 1 ? void 0 : s ? m(a, n) : a, c = o.length - 1, h; c >= 0; c--)
    (h = o[c]) && (t = (s ? h(a, n, t) : h(t)) || t);
  return s && t && u(a, n, t), t;
};
let e = class extends d {
  constructor() {
    super(...arguments), this.checked = !1, this.indeterminate = !1, this.disabled = !1, this.value = "", this.name = "", this.label = "";
  }
  render() {
    const o = this.indeterminate ? l`<svg viewBox="0 0 16 16"><path d="M3 8h10" stroke-linecap="round"/></svg>` : l`<svg viewBox="0 0 16 16"><path d="M3 8l3.5 3.5L13 5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    return l`
      <label>
        <input
          type="checkbox"
          .checked=${this.checked}
          .indeterminate=${this.indeterminate}
          ?disabled=${this.disabled}
          name=${this.name || b}
          value=${this.value || b}
          aria-label=${this.label || b}
          @change=${this._handleChange}
        />
        <span class="checkbox" part="checkbox">${o}</span>
        <span class="label" part="label"><slot>${this.label}</slot></span>
      </label>
    `;
  }
  _handleChange(o) {
    const a = o.target;
    this.checked = a.checked, this.indeterminate = !1, this.dispatchEvent(
      new CustomEvent("bh-change", {
        bubbles: !0,
        composed: !0,
        detail: { checked: this.checked }
      })
    );
  }
};
e.styles = [
  ...[d.styles].flat(),
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

      .checkbox {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--bh-checkbox-size, 1.25rem);
        height: var(--bh-checkbox-size, 1.25rem);
        border: var(--bh-border-2) solid var(--bh-color-border);
        border-radius: var(--bh-checkbox-radius, var(--bh-radius-sm));
        background: var(--bh-color-surface-raised);
        transition: background var(--bh-transition-fast),
                    border-color var(--bh-transition-fast);
        flex-shrink: 0;
      }

      .checkbox svg {
        width: 0.75rem;
        height: 0.75rem;
        stroke: var(--bh-color-primary-text);
        stroke-width: 3;
        fill: none;
        opacity: 0;
        transition: opacity var(--bh-transition-fast);
      }

      /* Checked */
      :host([checked]) .checkbox {
        background: var(--bh-color-primary);
        border-color: var(--bh-color-primary);
      }

      :host([checked]) .checkbox svg {
        opacity: 1;
      }

      /* Indeterminate */
      :host([indeterminate]) .checkbox {
        background: var(--bh-color-primary);
        border-color: var(--bh-color-primary);
      }

      :host([indeterminate]) .checkbox svg {
        opacity: 1;
      }

      /* Focus */
      input:focus-visible ~ .checkbox {
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
r([
  i({ type: Boolean, reflect: !0 })
], e.prototype, "checked", 2);
r([
  i({ type: Boolean, reflect: !0 })
], e.prototype, "indeterminate", 2);
r([
  i({ type: Boolean, reflect: !0 })
], e.prototype, "disabled", 2);
r([
  i()
], e.prototype, "value", 2);
r([
  i()
], e.prototype, "name", 2);
r([
  i()
], e.prototype, "label", 2);
e = r([
  v("bh-checkbox")
], e);
export {
  e as BhCheckbox
};
//# sourceMappingURL=bh-checkbox.js.map
