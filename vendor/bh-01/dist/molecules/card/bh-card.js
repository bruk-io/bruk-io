import { css as p, html as d } from "lit";
import { property as c, state as l, customElement as g } from "lit/decorators.js";
import { BaseElement as b } from "../../primitives/base-element.js";
var v = Object.defineProperty, f = Object.getOwnPropertyDescriptor, t = (a, r, n, s) => {
  for (var o = s > 1 ? void 0 : s ? f(r, n) : r, h = a.length - 1, i; h >= 0; h--)
    (i = a[h]) && (o = (s ? i(r, n, o) : i(o)) || o);
  return s && o && v(r, n, o), o;
};
let e = class extends b {
  constructor() {
    super(...arguments), this.variant = "default", this.padding = "md", this.cornerAccents = !1, this._hasHeader = !1, this._hasHeaderActions = !1, this._hasFooter = !1;
  }
  get _showHeader() {
    return this._hasHeader || this._hasHeaderActions;
  }
  render() {
    return d`
      <div class="card" part="card">
        ${this._showHeader ? d`<div class="header" part="header">
              <div class="header-start"><slot name="header" @slotchange=${this._onHeaderSlotChange}></slot></div>
              <div class="header-end"><slot name="header-actions" @slotchange=${this._onHeaderActionsSlotChange}></slot></div>
            </div>` : d`<slot name="header" @slotchange=${this._onHeaderSlotChange}></slot>
                 <slot name="header-actions" @slotchange=${this._onHeaderActionsSlotChange}></slot>`}
        <div class="body" part="body">
          <slot></slot>
        </div>
        ${this._hasFooter ? d`<div class="footer" part="footer"><slot name="footer" @slotchange=${this._onFooterSlotChange}></slot></div>` : d`<slot name="footer" @slotchange=${this._onFooterSlotChange}></slot>`}
      </div>
    `;
  }
  _onHeaderSlotChange(a) {
    const r = a.target;
    this._hasHeader = r.assignedNodes({ flatten: !0 }).length > 0;
  }
  _onHeaderActionsSlotChange(a) {
    const r = a.target;
    this._hasHeaderActions = r.assignedNodes({ flatten: !0 }).length > 0;
  }
  _onFooterSlotChange(a) {
    const r = a.target;
    this._hasFooter = r.assignedNodes({ flatten: !0 }).length > 0;
  }
};
e.styles = [
  ...[b.styles].flat(),
  p`
      :host {
        display: block;
      }

      .card {
        position: relative;
        background: var(--bh-card-bg, var(--bh-color-surface-raised));
        border-radius: var(--bh-card-radius, var(--bh-radius-lg));
        overflow: hidden;
      }

      /* Corner accents */
      :host([corner-accents]) .card::before,
      :host([corner-accents]) .card::after {
        content: '';
        position: absolute;
        width: 12px;
        height: 12px;
        border-color: var(--bh-card-accent-color, var(--bh-color-border));
        border-style: solid;
        border-width: 0;
        transition: border-color 0.2s, box-shadow 0.2s;
        pointer-events: none;
        z-index: 1;
      }

      :host([corner-accents]) .card::before {
        top: 0;
        left: 0;
        border-top-width: 2px;
        border-left-width: 2px;
        border-top-left-radius: var(--bh-card-radius, var(--bh-radius-lg));
      }

      :host([corner-accents]) .card::after {
        bottom: 0;
        right: 0;
        border-bottom-width: 2px;
        border-right-width: 2px;
        border-bottom-right-radius: var(--bh-card-radius, var(--bh-radius-lg));
      }

      :host([corner-accents]) .card:hover::before,
      :host([corner-accents]) .card:hover::after {
        border-color: var(--bh-card-accent-hover-color, var(--bh-color-primary));
        box-shadow: 0 0 6px var(--bh-card-accent-glow, var(--bh-color-primary-glow));
      }

      /* Default — shadow, no border */
      .card,
      :host([variant='default']) .card {
        box-shadow: var(--bh-card-shadow, var(--bh-shadow-md));
        border: var(--bh-border-1) solid transparent;
      }

      /* Outlined — border, no shadow */
      :host([variant='outlined']) .card {
        border: var(--bh-border-1) solid var(--bh-card-border, var(--bh-color-border));
        box-shadow: none;
      }

      /* Flat — no border, no shadow */
      :host([variant='flat']) .card {
        border: var(--bh-border-1) solid transparent;
        box-shadow: none;
      }

      /* Padding */
      .body {
        padding: var(--bh-spacing-4);
      }

      :host([padding='none']) .body {
        padding: 0;
      }

      :host([padding='sm']) .body {
        padding: var(--bh-spacing-2);
      }

      :host([padding='md']) .body {
        padding: var(--bh-spacing-4);
      }

      :host([padding='lg']) .body {
        padding: var(--bh-spacing-6);
      }

      /* Header */
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--bh-spacing-2);
        padding: var(--bh-spacing-4);
        border-bottom: var(--bh-border-1) solid var(--bh-color-border);
      }

      :host([padding='sm']) .header {
        padding: var(--bh-spacing-2);
      }

      :host([padding='lg']) .header {
        padding: var(--bh-spacing-6);
      }

      :host([padding='none']) .header {
        padding: var(--bh-spacing-4);
      }

      .header-start {
        display: flex;
        align-items: center;
        gap: var(--bh-spacing-2);
        min-width: 0;
      }

      .header-end {
        display: flex;
        align-items: center;
        gap: var(--bh-spacing-2);
        flex-shrink: 0;
      }

      /* Footer */
      .footer {
        padding: var(--bh-spacing-4);
        border-top: var(--bh-border-1) solid var(--bh-color-border);
      }

      :host([padding='sm']) .footer {
        padding: var(--bh-spacing-2);
      }

      :host([padding='lg']) .footer {
        padding: var(--bh-spacing-6);
      }

      :host([padding='none']) .footer {
        padding: var(--bh-spacing-4);
      }
    `
];
t([
  c({ reflect: !0 })
], e.prototype, "variant", 2);
t([
  c({ reflect: !0 })
], e.prototype, "padding", 2);
t([
  c({ type: Boolean, reflect: !0, attribute: "corner-accents" })
], e.prototype, "cornerAccents", 2);
t([
  l()
], e.prototype, "_hasHeader", 2);
t([
  l()
], e.prototype, "_hasHeaderActions", 2);
t([
  l()
], e.prototype, "_hasFooter", 2);
e = t([
  g("bh-card")
], e);
export {
  e as BhCard
};
//# sourceMappingURL=bh-card.js.map
