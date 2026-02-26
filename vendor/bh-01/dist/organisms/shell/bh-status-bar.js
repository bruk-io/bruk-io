import { css as c, html as p } from "lit";
import { property as h, customElement as v } from "lit/decorators.js";
import { BaseElement as b } from "../../primitives/base-element.js";
var d = Object.defineProperty, g = Object.getOwnPropertyDescriptor, i = (n, s, a, t) => {
  for (var e = t > 1 ? void 0 : t ? g(s, a) : s, o = n.length - 1, l; o >= 0; o--)
    (l = n[o]) && (e = (t ? l(s, a, e) : l(e)) || e);
  return t && e && d(s, a, e), e;
};
let r = class extends b {
  constructor() {
    super(...arguments), this.message = "", this.error = !1;
  }
  render() {
    return p`
      <div class="bar" part="bar" role="status" aria-live="polite">
        <div class="start">
          ${this.message ? p`<span class="message">${this.message}</span>` : ""}
          <slot></slot>
        </div>
        <div class="end">
          <slot name="end"></slot>
        </div>
      </div>
    `;
  }
};
r.styles = [
  ...[b.styles].flat(),
  c`
      :host {
        display: block;
        height: var(--bh-spacing-6);
        background: var(--bh-status-bar-bg, var(--bh-color-surface));
        border-top: var(--bh-border-1) solid var(--bh-status-bar-border, var(--bh-color-border));
        color: var(--bh-status-bar-text, var(--bh-color-text-muted));
        font-size: var(--bh-text-xs);
        line-height: var(--bh-spacing-6);
      }

      .bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        padding: 0 var(--bh-spacing-3);
        gap: var(--bh-spacing-2);
      }

      .start,
      .end {
        display: flex;
        align-items: center;
        gap: var(--bh-spacing-2);
        min-width: 0;
      }

      .start {
        flex: 1;
        overflow: hidden;
      }

      .end {
        flex-shrink: 0;
      }

      .message {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      :host([error]) {
        color: var(--bh-status-bar-error-text, var(--bh-color-danger));
      }
    `
];
i([
  h()
], r.prototype, "message", 2);
i([
  h({ type: Boolean, reflect: !0 })
], r.prototype, "error", 2);
r = i([
  v("bh-status-bar")
], r);
export {
  r as BhStatusBar
};
//# sourceMappingURL=bh-status-bar.js.map
