import { css as c, nothing as b, html as d } from "lit";
import { property as a, customElement as u } from "lit/decorators.js";
import { BaseElement as n } from "../../primitives/base-element.js";
var m = Object.defineProperty, g = Object.getOwnPropertyDescriptor, r = (i, s, t, l) => {
  for (var e = l > 1 ? void 0 : l ? g(s, t) : s, p = i.length - 1, h; p >= 0; p--)
    (h = i[p]) && (e = (l ? h(s, t, e) : h(e)) || e);
  return l && e && m(s, t, e), e;
};
let o = class extends n {
  constructor() {
    super(...arguments), this.color = "success", this.pulse = !1, this.size = "md", this.label = "";
  }
  render() {
    return d`
      <span
        part="led"
        role="status"
        aria-label=${this.label || b}
      ></span>
    `;
  }
};
o.styles = [
  ...[n.styles].flat(),
  c`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      span {
        display: block;
        width: var(--bh-led-size, 8px);
        height: var(--bh-led-size, 8px);
        border-radius: var(--bh-radius-full);
        background: var(--bh-led-color);
        box-shadow: 0 0 6px var(--bh-led-glow);
      }

      /* Sizes */
      :host([size='sm']) span {
        --bh-led-size: 6px;
      }

      span,
      :host([size='md']) span {
        --bh-led-size: 8px;
      }

      /* Colors */
      span,
      :host([color='success']) span {
        --bh-led-color: var(--bh-color-success);
        --bh-led-glow: var(--bh-color-success-dim, rgba(42, 157, 78, 0.15));
      }

      :host([color='warning']) span {
        --bh-led-color: var(--bh-color-warning);
        --bh-led-glow: rgba(245, 158, 11, 0.25);
      }

      :host([color='danger']) span {
        --bh-led-color: var(--bh-color-danger);
        --bh-led-glow: rgba(220, 38, 38, 0.25);
      }

      :host([color='primary']) span {
        --bh-led-color: var(--bh-color-primary);
        --bh-led-glow: var(--bh-color-primary-glow, rgba(255, 107, 53, 0.12));
      }

      /* Pulse animation */
      :host([pulse]) span {
        animation: led-pulse 2s ease-in-out infinite;
      }

      @keyframes led-pulse {
        0%, 100% {
          opacity: 1;
          box-shadow: 0 0 6px var(--bh-led-glow);
        }
        50% {
          opacity: 0.6;
          box-shadow: 0 0 12px var(--bh-led-glow);
        }
      }
    `
];
r([
  a({ reflect: !0 })
], o.prototype, "color", 2);
r([
  a({ type: Boolean, reflect: !0 })
], o.prototype, "pulse", 2);
r([
  a({ reflect: !0 })
], o.prototype, "size", 2);
r([
  a()
], o.prototype, "label", 2);
o = r([
  u("bh-led")
], o);
export {
  o as BhLed
};
//# sourceMappingURL=bh-led.js.map
