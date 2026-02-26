import { css as u, nothing as p, html as b } from "lit";
import { property as t, customElement as c } from "lit/decorators.js";
import { live as v } from "lit/directives/live.js";
import { BaseElement as d } from "../../primitives/base-element.js";
var f = Object.defineProperty, g = Object.getOwnPropertyDescriptor, r = (s, a, l, i) => {
  for (var o = i > 1 ? void 0 : i ? g(a, l) : a, n = s.length - 1, h; n >= 0; n--)
    (h = s[n]) && (o = (i ? h(a, l, o) : h(o)) || o);
  return i && o && f(a, l, o), o;
};
let e = class extends d {
  constructor() {
    super(...arguments), this.size = "md", this.type = "text", this.value = "", this.placeholder = "", this.name = "", this.label = "", this.disabled = !1, this.readonly = !1, this.required = !1, this.error = !1;
  }
  render() {
    return b`
      <div class="wrapper" part="wrapper">
        <span class="prefix"><slot name="prefix"></slot></span>
        <input
          part="input"
          type=${this.type}
          .value=${v(this.value)}
          placeholder=${this.placeholder || p}
          name=${this.name || p}
          aria-label=${this.label || p}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          aria-invalid=${this.error ? "true" : p}
          @input=${this._handleInput}
          @change=${this._handleChange}
        />
        <span class="suffix"><slot name="suffix"></slot></span>
      </div>
    `;
  }
  _handleInput(s) {
    const a = s.target;
    this.value = a.value, this.dispatchEvent(
      new CustomEvent("bh-input", {
        bubbles: !0,
        composed: !0,
        detail: { value: this.value }
      })
    );
  }
  _handleChange(s) {
    const a = s.target;
    this.value = a.value, this.dispatchEvent(
      new CustomEvent("bh-change", {
        bubbles: !0,
        composed: !0,
        detail: { value: this.value }
      })
    );
  }
};
e.styles = [
  ...[d.styles].flat(),
  u`
      :host {
        display: block;
      }

      .wrapper {
        display: flex;
        align-items: center;
        width: 100%;
        background: var(--bh-input-bg, var(--bh-color-surface-raised));
        border: var(--bh-border-1) solid var(--bh-input-border, var(--bh-color-border));
        border-radius: var(--bh-input-radius, var(--bh-radius-md));
        box-shadow: var(--bh-shadow-inset);
        transition: all var(--bh-transition-fast);
      }

      input {
        flex: 1;
        min-width: 0;
        font-family: var(--bh-font-sans);
        line-height: var(--bh-leading-normal);
        color: var(--bh-input-color, var(--bh-color-text));
        background: transparent;
        border: none;
        outline: none;
      }

      input::placeholder {
        color: var(--bh-color-text-muted);
      }

      /* Slots */
      .prefix,
      .suffix {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        color: var(--bh-color-text-muted);
      }

      /* Sizes — wrapper padding */
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

      /* Sizes — input font inherits from wrapper */
      input {
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

      :host([disabled]) input {
        cursor: not-allowed;
      }

      /* Readonly */
      :host([readonly]) .wrapper {
        background: var(--bh-color-surface);
      }
    `
];
r([
  t({ reflect: !0 })
], e.prototype, "size", 2);
r([
  t()
], e.prototype, "type", 2);
r([
  t()
], e.prototype, "value", 2);
r([
  t()
], e.prototype, "placeholder", 2);
r([
  t()
], e.prototype, "name", 2);
r([
  t()
], e.prototype, "label", 2);
r([
  t({ type: Boolean, reflect: !0 })
], e.prototype, "disabled", 2);
r([
  t({ type: Boolean, reflect: !0 })
], e.prototype, "readonly", 2);
r([
  t({ type: Boolean, reflect: !0 })
], e.prototype, "required", 2);
r([
  t({ type: Boolean, reflect: !0 })
], e.prototype, "error", 2);
e = r([
  c("bh-input")
], e);
export {
  e as BhInput
};
//# sourceMappingURL=bh-input.js.map
