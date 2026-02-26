import { css as b, nothing as l, html as c } from "lit";
import { property as t, customElement as v } from "lit/decorators.js";
import { live as u } from "lit/directives/live.js";
import { BaseElement as d } from "../../primitives/base-element.js";
var f = Object.defineProperty, x = Object.getOwnPropertyDescriptor, r = (s, a, h, i) => {
  for (var o = i > 1 ? void 0 : i ? x(a, h) : a, n = s.length - 1, p; n >= 0; n--)
    (p = s[n]) && (o = (i ? p(a, h, o) : p(o)) || o);
  return i && o && f(a, h, o), o;
};
let e = class extends d {
  constructor() {
    super(...arguments), this.size = "md", this.value = "", this.placeholder = "", this.name = "", this.label = "", this.rows = 3, this.resize = "vertical", this.disabled = !1, this.readonly = !1, this.required = !1, this.error = !1;
  }
  render() {
    return c`
      <div class="wrapper" part="wrapper">
        <textarea
          part="textarea"
          .value=${u(this.value)}
          placeholder=${this.placeholder || l}
          name=${this.name || l}
          aria-label=${this.label || l}
          rows=${this.rows}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          aria-invalid=${this.error ? "true" : l}
          @input=${this._handleInput}
          @change=${this._handleChange}
        ></textarea>
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
  b`
      :host {
        display: block;
      }

      .wrapper {
        display: flex;
        width: 100%;
        background: var(--bh-textarea-bg, var(--bh-color-surface-raised));
        border: var(--bh-border-1) solid var(--bh-textarea-border, var(--bh-color-border));
        border-radius: var(--bh-textarea-radius, var(--bh-radius-md));
        box-shadow: var(--bh-shadow-inset);
        transition: all var(--bh-transition-fast);
      }

      textarea {
        flex: 1;
        min-width: 0;
        font-family: var(--bh-font-sans);
        line-height: var(--bh-leading-normal);
        color: var(--bh-textarea-color, var(--bh-color-text));
        background: transparent;
        border: none;
        outline: none;
        resize: vertical;
      }

      textarea::placeholder {
        color: var(--bh-color-text-muted);
      }

      /* Resize */
      :host([resize='none']) textarea { resize: none; }
      :host([resize='vertical']) textarea { resize: vertical; }
      :host([resize='horizontal']) textarea { resize: horizontal; }
      :host([resize='both']) textarea { resize: both; }

      /* Sizes */
      :host([size='sm']) .wrapper {
        font-size: var(--bh-text-sm);
        padding: var(--bh-spacing-1-5) var(--bh-spacing-3);
      }

      .wrapper,
      :host([size='md']) .wrapper {
        font-size: var(--bh-text-base);
        padding: var(--bh-spacing-2) var(--bh-spacing-4);
      }

      :host([size='lg']) .wrapper {
        font-size: var(--bh-text-lg);
        padding: var(--bh-spacing-2-5) var(--bh-spacing-6);
      }

      textarea {
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

      :host([disabled]) textarea {
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
  t({ type: Number })
], e.prototype, "rows", 2);
r([
  t({ reflect: !0 })
], e.prototype, "resize", 2);
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
  v("bh-textarea")
], e);
export {
  e as BhTextarea
};
//# sourceMappingURL=bh-textarea.js.map
