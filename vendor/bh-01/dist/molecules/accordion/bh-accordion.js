import { css as p, html as b } from "lit";
import { property as h, customElement as m } from "lit/decorators.js";
import { BaseElement as i } from "../../primitives/base-element.js";
import "../../atoms/icon/bh-icon.js";
var v = Object.defineProperty, f = Object.getOwnPropertyDescriptor, a = (r, o, n, e) => {
  for (var t = e > 1 ? void 0 : e ? f(o, n) : o, c = r.length - 1, d; c >= 0; c--)
    (d = r[c]) && (t = (e ? d(o, n, t) : d(t)) || t);
  return e && t && v(o, n, t), t;
};
let l = class extends i {
  constructor() {
    super(...arguments), this.multiple = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("bh-toggle", this._handleItemToggle);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("bh-toggle", this._handleItemToggle);
  }
  _handleItemToggle(r) {
    if (this.multiple || !r.detail.open) return;
    const o = r.composedPath().find(
      (e) => e.tagName === "BH-ACCORDION-ITEM"
    ), n = this.querySelectorAll("bh-accordion-item");
    for (const e of n)
      e !== o && e.open && (e.open = !1);
  }
  render() {
    return b`<slot></slot>`;
  }
};
l.styles = [
  ...[i.styles].flat(),
  p`
      :host {
        display: block;
      }
    `
];
a([
  h({ type: Boolean, reflect: !0 })
], l.prototype, "multiple", 2);
l = a([
  m("bh-accordion")
], l);
let s = class extends i {
  constructor() {
    super(...arguments), this.label = "", this.open = !1;
  }
  render() {
    return b`
      <button
        class="header"
        part="header"
        aria-expanded=${this.open}
        aria-controls="accordion-content"
        @click=${this._toggle}
      >
        <slot name="header">${this.label}</slot>
        <bh-icon class="chevron" part="chevron" name="chevron-right" size="sm" aria-hidden="true"></bh-icon>
      </button>
      <div class="content-wrapper">
        <div id="accordion-content" class="content" part="content">
          <div class="content-inner">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
  _toggle() {
    this.open = !this.open, this.dispatchEvent(
      new CustomEvent("bh-toggle", {
        bubbles: !0,
        composed: !0,
        detail: { open: this.open, label: this.label }
      })
    );
  }
};
s.styles = [
  ...[i.styles].flat(),
  p`
      :host {
        display: block;
        border-bottom: var(--bh-border-1) solid var(--bh-accordion-border, var(--bh-color-border));
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--bh-spacing-3) var(--bh-spacing-4);
        cursor: pointer;
        user-select: none;
        font-family: var(--bh-font-sans);
        font-size: var(--bh-text-sm);
        color: var(--bh-color-text);
        background: none;
        border: none;
        width: 100%;
        text-align: start;
      }

      .header:hover {
        background: var(--bh-color-surface);
      }

      .header:focus-visible {
        outline: var(--bh-border-2) solid var(--bh-color-ring);
        outline-offset: -2px;
      }

      .chevron {
        display: inline-flex;
        transition: transform var(--bh-transition-fast);
        color: var(--bh-color-text-muted);
        flex-shrink: 0;
      }

      :host([open]) .chevron {
        transform: rotate(90deg);
      }

      .content-wrapper {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--bh-transition-fast);
      }

      :host([open]) .content-wrapper {
        grid-template-rows: 1fr;
      }

      .content {
        overflow: hidden;
      }

      .content-inner {
        padding: 0 var(--bh-spacing-4) var(--bh-spacing-3);
      }
    `
];
a([
  h()
], s.prototype, "label", 2);
a([
  h({ type: Boolean, reflect: !0 })
], s.prototype, "open", 2);
s = a([
  m("bh-accordion-item")
], s);
export {
  l as BhAccordion,
  s as BhAccordionItem
};
//# sourceMappingURL=bh-accordion.js.map
