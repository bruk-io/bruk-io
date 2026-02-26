import { css as h, nothing as m, html as c } from "lit";
import { property as n, customElement as f } from "lit/decorators.js";
import { BaseElement as b } from "../../primitives/base-element.js";
import "../../atoms/led/bh-led.js";
var d = Object.defineProperty, u = Object.getOwnPropertyDescriptor, a = (p, s, o, r) => {
  for (var t = r > 1 ? void 0 : r ? u(s, o) : s, l = p.length - 1, i; l >= 0; l--)
    (i = p[l]) && (t = (r ? i(s, o, t) : i(t)) || t);
  return r && t && d(s, o, t), t;
};
let e = class extends b {
  constructor() {
    super(...arguments), this.title = "Terminal", this.status = "", this.statusColor = "success";
  }
  render() {
    return c`
      <div class="bar" part="bar">
        <div class="bar-left">
          <bh-led color="danger" size="sm"></bh-led>
          <bh-led color="warning" size="sm"></bh-led>
          <bh-led color="success" size="sm"></bh-led>
          <span class="title" part="title">${this.title}</span>
        </div>
        <div class="bar-right">
          ${this.status ? c`
                <span class="status" part="status">
                  <bh-led color=${this.statusColor} size="sm" pulse></bh-led>
                  ${this.status}
                </span>
              ` : m}
        </div>
      </div>
    `;
  }
};
e.styles = [
  ...[b.styles].flat(),
  h`
      :host {
        display: block;
      }

      .bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: var(--bh-terminal-bar-height, 32px);
        padding: 0 12px;
        background: var(--bh-terminal-bar-bg, var(--bh-color-surface-recessed));
        border-bottom: 1px solid var(--bh-color-border);
        box-shadow: var(--bh-shadow-emboss);
        user-select: none;
      }

      .bar-left {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .title {
        font-family: var(--bh-font-mono);
        font-size: 10px;
        font-weight: var(--bh-font-medium);
        letter-spacing: 2px;
        text-transform: uppercase;
        color: var(--bh-color-text-tertiary);
        margin-left: 8px;
      }

      .bar-right {
        display: flex;
        align-items: center;
      }

      .status {
        display: flex;
        align-items: center;
        gap: 5px;
        font-family: var(--bh-font-mono);
        font-size: 8px;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: var(--bh-color-text-tertiary);
      }
    `
];
a([
  n()
], e.prototype, "title", 2);
a([
  n()
], e.prototype, "status", 2);
a([
  n({ reflect: !0, attribute: "status-color" })
], e.prototype, "statusColor", 2);
e = a([
  f("bh-terminal-bar")
], e);
export {
  e as BhTerminalBar
};
//# sourceMappingURL=bh-terminal-bar.js.map
