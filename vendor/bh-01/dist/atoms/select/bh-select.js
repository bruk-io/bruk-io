import { css as b, nothing as n, html as l } from "lit";
import { property as a, customElement as v } from "lit/decorators.js";
import { BaseElement as c } from "../../primitives/base-element.js";
var u = Object.defineProperty, g = Object.getOwnPropertyDescriptor, t = (r, o, p, i) => {
  for (var s = i > 1 ? void 0 : i ? g(o, p) : o, h = r.length - 1, d; h >= 0; h--)
    (d = r[h]) && (s = (i ? d(o, p, s) : d(s)) || s);
  return i && s && u(o, p, s), s;
};
let e = class extends c {
  constructor() {
    super(...arguments), this.size = "md", this.value = "", this.name = "", this.label = "", this.placeholder = "", this.options = [], this.optionGroups = [], this.disabled = !1, this.required = !1, this.error = !1;
  }
  render() {
    return l`
      <div class="wrapper" part="wrapper">
        <span class="prefix"><slot name="prefix"></slot></span>
        <select
          part="select"
          name=${this.name || n}
          aria-label=${this.label || n}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-invalid=${this.error ? "true" : n}
          @change=${this._handleChange}
        >
          ${this.placeholder ? l`<option value="" disabled ?selected=${!this.value}>${this.placeholder}</option>` : n}
          ${this.optionGroups.length > 0 ? this.optionGroups.map(
      (r) => l`
                  <optgroup label=${r.label}>
                    ${r.options.map(
        (o) => l`
                        <option
                          value=${o.value}
                          ?disabled=${o.disabled}
                          ?selected=${o.value === this.value}
                        >${o.label}</option>
                      `
      )}
                  </optgroup>
                `
    ) : this.options.map(
      (r) => l`
                  <option
                    value=${r.value}
                    ?disabled=${r.disabled}
                    ?selected=${r.value === this.value}
                  >${r.label}</option>
                `
    )}
        </select>
        <span class="chevron">
          <svg viewBox="0 0 16 16"><path d="M4 6l4 4 4-4"/></svg>
        </span>
      </div>
    `;
  }
  _handleChange(r) {
    const o = r.target;
    this.value = o.value, this.dispatchEvent(
      new CustomEvent("bh-change", {
        bubbles: !0,
        composed: !0,
        detail: { value: this.value }
      })
    );
  }
};
e.styles = [
  ...[c.styles].flat(),
  b`
      :host {
        display: block;
      }

      .wrapper {
        display: flex;
        align-items: center;
        width: 100%;
        background: var(--bh-select-bg, var(--bh-color-surface-raised));
        border: var(--bh-border-1) solid var(--bh-select-border, var(--bh-color-border));
        border-radius: var(--bh-select-radius, var(--bh-radius-md));
        box-shadow: var(--bh-shadow-inset);
        transition: all var(--bh-transition-fast);
        cursor: pointer;
      }

      select {
        flex: 1;
        min-width: 0;
        font-family: var(--bh-font-sans);
        line-height: var(--bh-leading-normal);
        color: var(--bh-select-color, var(--bh-color-text));
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
      }

      /* Prefix slot */
      .prefix {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        color: var(--bh-color-text-muted);
      }

      /* Chevron indicator */
      .chevron {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        color: var(--bh-color-text-muted);
        pointer-events: none;
      }

      .chevron svg {
        width: 1em;
        height: 1em;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      /* Sizes */
      :host([size='sm']) .wrapper {
        font-size: var(--bh-text-sm);
        gap: var(--bh-spacing-1-5);
        padding: var(--bh-spacing-1-5) var(--bh-spacing-3);
      }

      .wrapper,
      :host([size='md']) .wrapper {
        font-size: var(--bh-text-base);
        gap: var(--bh-spacing-2);
        padding: var(--bh-spacing-2) var(--bh-spacing-4);
      }

      :host([size='lg']) .wrapper {
        font-size: var(--bh-text-lg);
        gap: var(--bh-spacing-2);
        padding: var(--bh-spacing-2-5) var(--bh-spacing-6);
      }

      select {
        font-size: inherit;
      }

      /* Focus */
      .wrapper:focus-within {
        border-color: var(--bh-color-ring);
        box-shadow: 0 0 0 1px var(--bh-color-ring);
      }

      /* Error */
      :host([error]) .wrapper {
        border-color: var(--bh-color-danger);
      }

      :host([error]) .wrapper:focus-within {
        border-color: var(--bh-color-danger);
        box-shadow: 0 0 0 1px var(--bh-color-danger);
      }

      /* Disabled */
      :host([disabled]) .wrapper {
        opacity: 0.5;
        cursor: not-allowed;
      }

      :host([disabled]) select {
        cursor: not-allowed;
      }

      /* Placeholder styling */
      select:invalid {
        color: var(--bh-color-text-muted);
      }
    `
];
t([
  a({ reflect: !0 })
], e.prototype, "size", 2);
t([
  a()
], e.prototype, "value", 2);
t([
  a()
], e.prototype, "name", 2);
t([
  a()
], e.prototype, "label", 2);
t([
  a()
], e.prototype, "placeholder", 2);
t([
  a({ type: Array })
], e.prototype, "options", 2);
t([
  a({ type: Array, attribute: "option-groups" })
], e.prototype, "optionGroups", 2);
t([
  a({ type: Boolean, reflect: !0 })
], e.prototype, "disabled", 2);
t([
  a({ type: Boolean, reflect: !0 })
], e.prototype, "required", 2);
t([
  a({ type: Boolean, reflect: !0 })
], e.prototype, "error", 2);
e = t([
  v("bh-select")
], e);
export {
  e as BhSelect
};
//# sourceMappingURL=bh-select.js.map
