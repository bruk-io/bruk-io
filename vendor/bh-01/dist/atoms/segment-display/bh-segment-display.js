import { css as m, nothing as p, html as g } from "lit";
import { property as r, customElement as b } from "lit/decorators.js";
import { BaseElement as c } from "../../primitives/base-element.js";
var y = Object.defineProperty, d = Object.getOwnPropertyDescriptor, o = (e, a, n, l) => {
  for (var t = l > 1 ? void 0 : l ? d(a, n) : a, h = e.length - 1, i; h >= 0; h--)
    (i = e[h]) && (t = (l ? i(a, n, t) : i(t)) || t);
  return l && t && y(a, n, t), t;
};
let s = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.color = "primary", this.size = "md", this.ghost = !1, this.label = "";
  }
  /** Character used for ghost segments. Defaults to '8' for digits, '~' for alpha. */
  get _ghostText() {
    return this.value.toUpperCase().split("").map((e) => /[0-9]/.test(e) ? "8" : /[A-Z]/.test(e) ? "~" : e).join("");
  }
  render() {
    const e = this.value.toUpperCase();
    return this.ghost ? g`
        <span class="wrapper">
          <span
            class="display ghost"
            aria-hidden="true"
          >${this._ghostText}</span>
          <span
            class="display"
            part="display"
            role="status"
            aria-label=${this.label || p}
          >${e}</span>
        </span>
      ` : g`
      <span
        class="display"
        part="display"
        role="status"
        aria-label=${this.label || p}
      >${e}</span>
    `;
  }
};
s.styles = [
  ...[c.styles].flat(),
  m`
      :host {
        display: inline-block;
        font-family: 'DSEG14Classic', 'DSEG14', var(--bh-font-mono);
        text-transform: uppercase;
      }

      .display {
        font-size: var(--bh-segment-size, 14px);
        font-weight: normal;
        letter-spacing: var(--bh-segment-tracking, 1px);
        color: var(--bh-segment-color);
        text-shadow: 0 0 8px var(--bh-segment-glow);
        line-height: var(--bh-leading-none);
      }

      /* Ghost segments behind the lit text */
      :host([ghost]) .ghost {
        position: absolute;
        inset: 0;
        color: var(--bh-segment-off, var(--bh-color-surface-recessed));
        text-shadow: none;
        pointer-events: none;
        user-select: none;
      }

      :host([ghost]) .wrapper {
        position: relative;
        display: inline-block;
      }

      /* Sizes */
      :host([size='sm']) .display,
      :host([size='sm']) .ghost {
        --bh-segment-size: 10px;
        --bh-segment-tracking: 0.5px;
      }

      .display,
      .ghost,
      :host([size='md']) .display,
      :host([size='md']) .ghost {
        --bh-segment-size: 14px;
        --bh-segment-tracking: 1px;
      }

      :host([size='lg']) .display,
      :host([size='lg']) .ghost {
        --bh-segment-size: 20px;
        --bh-segment-tracking: 1.5px;
      }

      :host([size='xl']) .display,
      :host([size='xl']) .ghost {
        --bh-segment-size: 28px;
        --bh-segment-tracking: 2px;
      }

      /* Colors */
      :host,
      :host([color='primary']) {
        --bh-segment-color: var(--bh-color-primary);
        --bh-segment-glow: var(--bh-color-primary-glow, rgba(255, 107, 53, 0.25));
      }

      :host([color='success']) {
        --bh-segment-color: var(--bh-color-success);
        --bh-segment-glow: var(--bh-color-success-dim, rgba(42, 157, 78, 0.25));
      }

      :host([color='warning']) {
        --bh-segment-color: var(--bh-color-warning);
        --bh-segment-glow: rgba(245, 158, 11, 0.25);
      }

      :host([color='danger']) {
        --bh-segment-color: var(--bh-color-danger);
        --bh-segment-glow: rgba(220, 38, 38, 0.25);
      }

      :host([color='default']) {
        --bh-segment-color: var(--bh-color-text);
        --bh-segment-glow: transparent;
      }
    `
];
o([
  r()
], s.prototype, "value", 2);
o([
  r({ reflect: !0 })
], s.prototype, "color", 2);
o([
  r({ reflect: !0 })
], s.prototype, "size", 2);
o([
  r({ type: Boolean, reflect: !0 })
], s.prototype, "ghost", 2);
o([
  r()
], s.prototype, "label", 2);
s = o([
  b("bh-segment-display")
], s);
export {
  s as BhSegmentDisplay
};
//# sourceMappingURL=bh-segment-display.js.map
