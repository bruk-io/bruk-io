import { css as d, nothing as b, html as c } from "lit";
import { property as i, customElement as u } from "lit/decorators.js";
import { BaseElement as p } from "../../primitives/base-element.js";
import "../../atoms/icon/bh-icon.js";
var v = Object.defineProperty, m = Object.getOwnPropertyDescriptor, o = (t, s, n, a) => {
  for (var e = a > 1 ? void 0 : a ? m(s, n) : s, h = t.length - 1, l; h >= 0; h--)
    (l = t[h]) && (e = (a ? l(s, n, e) : l(e)) || e);
  return a && e && v(s, n, e), e;
};
let r = class extends p {
  constructor() {
    super(...arguments), this.variant = "default", this.size = "md", this.dismissible = !1, this.selected = !1, this.disabled = !1;
  }
  render() {
    return c`
      <button
        part="chip"
        ?disabled=${this.disabled}
        aria-pressed=${this.selected ? "true" : b}
        @click=${this._handleClick}
      >
        <slot name="prefix"></slot>
        <slot></slot>
        ${this.dismissible ? c`<button
              class="dismiss"
              part="dismiss"
              aria-label="Remove"
              tabindex="-1"
              @click=${this._handleDismiss}
            ><bh-icon name="x"></bh-icon></button>` : b}
      </button>
    `;
  }
  _handleClick(t) {
    if (this.disabled) {
      t.preventDefault(), t.stopPropagation();
      return;
    }
    this.dispatchEvent(
      new CustomEvent("bh-click", {
        bubbles: !0,
        composed: !0,
        detail: { originalEvent: t }
      })
    );
  }
  _handleDismiss(t) {
    t.stopPropagation(), !this.disabled && this.dispatchEvent(
      new CustomEvent("bh-dismiss", {
        bubbles: !0,
        composed: !0,
        detail: {}
      })
    );
  }
};
r.styles = [
  ...[p.styles].flat(),
  d`
      :host {
        display: inline-block;
      }

      button {
        display: inline-flex;
        align-items: center;
        gap: var(--bh-spacing-1-5);
        border: var(--bh-border-1) solid transparent;
        cursor: pointer;
        font-family: var(--bh-font-sans);
        font-weight: var(--bh-font-medium);
        line-height: var(--bh-leading-none);
        border-radius: var(--bh-chip-radius, var(--bh-radius-full));
        background: var(--bh-chip-bg);
        color: var(--bh-chip-color);
        transition: all var(--bh-transition-fast);
      }

      /* Sizes */
      :host([size='sm']) button {
        font-size: var(--bh-text-xs);
        padding: var(--bh-spacing-0-5) var(--bh-spacing-2);
      }

      button,
      :host([size='md']) button {
        font-size: var(--bh-text-sm);
        padding: var(--bh-spacing-1) var(--bh-spacing-2-5);
      }

      /* Default */
      button,
      :host([variant='default']) button {
        --bh-chip-bg: var(--bh-color-secondary);
        --bh-chip-color: var(--bh-color-secondary-text);
      }

      :host([variant='default']) button:hover,
      button:hover {
        --bh-chip-bg: var(--bh-color-secondary-hover);
      }

      /* Primary */
      :host([variant='primary']) button {
        --bh-chip-bg: var(--bh-color-primary);
        --bh-chip-color: var(--bh-color-primary-text);
      }

      :host([variant='primary']) button:hover {
        --bh-chip-bg: var(--bh-color-primary-hover);
      }

      /* Success */
      :host([variant='success']) button {
        --bh-chip-bg: var(--bh-color-success);
        --bh-chip-color: var(--bh-color-text-inverse);
      }

      :host([variant='success']) button:hover {
        --bh-chip-bg: var(--bh-color-success-hover);
      }

      /* Warning */
      :host([variant='warning']) button {
        --bh-chip-bg: var(--bh-color-warning);
        --bh-chip-color: var(--bh-color-text);
      }

      :host([variant='warning']) button:hover {
        --bh-chip-bg: var(--bh-color-warning-hover);
      }

      /* Danger */
      :host([variant='danger']) button {
        --bh-chip-bg: var(--bh-color-danger);
        --bh-chip-color: var(--bh-color-danger-text);
      }

      :host([variant='danger']) button:hover {
        --bh-chip-bg: var(--bh-color-danger-hover);
      }

      /* Selected */
      :host([selected]) button {
        border-color: currentColor;
        box-shadow: 0 0 0 1px currentColor;
      }

      /* Focus */
      button:focus-visible {
        outline: 2px solid var(--bh-color-ring);
        outline-offset: 2px;
      }

      /* Disabled */
      :host([disabled]) button {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }

      /* Dismiss */
      .dismiss {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0;
        margin-left: var(--bh-spacing-0-5);
        border: none;
        background: none;
        color: inherit;
        cursor: pointer;
        border-radius: var(--bh-radius-full);
        width: 1em;
        height: 1em;
        line-height: 1;
        opacity: 0.7;
        transition: opacity var(--bh-transition-fast);
      }

      .dismiss:hover {
        opacity: 1;
      }

      .dismiss:focus-visible {
        outline: 2px solid var(--bh-color-ring);
        outline-offset: 1px;
      }

      .dismiss bh-icon {
        --bh-icon-size: 1em;
        color: inherit;
      }
    `
];
o([
  i({ reflect: !0 })
], r.prototype, "variant", 2);
o([
  i({ reflect: !0 })
], r.prototype, "size", 2);
o([
  i({ type: Boolean, reflect: !0 })
], r.prototype, "dismissible", 2);
o([
  i({ type: Boolean, reflect: !0 })
], r.prototype, "selected", 2);
o([
  i({ type: Boolean, reflect: !0 })
], r.prototype, "disabled", 2);
r = o([
  u("bh-chip")
], r);
export {
  r as BhChip
};
//# sourceMappingURL=bh-chip.js.map
