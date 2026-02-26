import { css as h, html as p } from "lit";
import { property as b, customElement as m } from "lit/decorators.js";
import { BaseElement as l } from "../../primitives/base-element.js";
var f = Object.defineProperty, d = Object.getOwnPropertyDescriptor, c = (e, t, a, o) => {
  for (var r = o > 1 ? void 0 : o ? d(t, a) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (o ? i(t, a, r) : i(r)) || r);
  return o && r && f(t, a, r), r;
};
let s = class extends l {
  constructor() {
    super(...arguments), this.hints = [];
  }
  render() {
    return p`
      <div class="bar" part="bar">
        ${this.hints.map(
      (e) => p`
            <span class="hint">
              <kbd>${e.key}</kbd> ${e.label}
            </span>
          `
    )}
      </div>
    `;
  }
};
s.styles = [
  ...[l.styles].flat(),
  h`
      :host {
        display: block;
      }

      .bar {
        display: flex;
        align-items: center;
        height: 24px;
        padding: 0 12px;
        gap: 16px;
        background: var(--bh-color-surface-recessed);
        border-top: 1px solid var(--bh-color-border);
      }

      .hint {
        font-family: var(--bh-font-mono);
        font-size: 8px;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: var(--bh-color-text-tertiary);
      }

      kbd {
        color: var(--bh-color-primary);
        font-family: inherit;
      }

      @media (hover: none) and (pointer: coarse) {
        :host {
          display: none;
        }
      }
    `
];
c([
  b({ attribute: !1 })
], s.prototype, "hints", 2);
s = c([
  m("bh-terminal-hint-bar")
], s);
export {
  s as BhTerminalHintBar
};
//# sourceMappingURL=bh-terminal-hint-bar.js.map
