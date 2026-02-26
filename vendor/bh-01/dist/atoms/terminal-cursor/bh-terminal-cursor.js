import { css as c, html as u } from "lit";
import { property as h, customElement as m } from "lit/decorators.js";
import { BaseElement as l } from "../../primitives/base-element.js";
var b = Object.defineProperty, f = Object.getOwnPropertyDescriptor, n = (p, t, o, s) => {
  for (var r = s > 1 ? void 0 : s ? f(t, o) : t, i = p.length - 1, a; i >= 0; i--)
    (a = p[i]) && (r = (s ? a(t, o, r) : a(r)) || r);
  return s && r && b(t, o, r), r;
};
let e = class extends l {
  constructor() {
    super(...arguments), this.shape = "line", this.blink = !0;
  }
  render() {
    return u`<span part="cursor"></span>`;
  }
};
e.styles = [
  ...[l.styles].flat(),
  c`
      :host {
        display: inline-block;
      }

      span {
        display: inline-block;
        background: var(--bh-cursor-color, var(--bh-color-primary));
      }

      /* Shapes */
      span,
      :host([shape='line']) span {
        width: 2px;
        height: var(--bh-cursor-height, 1.2em);
      }

      :host([shape='block']) span {
        width: var(--bh-cursor-width, 8px);
        height: var(--bh-cursor-height, 1.2em);
      }

      :host([shape='underline']) span {
        width: var(--bh-cursor-width, 8px);
        height: 2px;
        vertical-align: bottom;
      }

      /* Blink animation */
      :host([blink]) span {
        animation: cursor-blink 1s ease-in-out infinite;
      }

      @keyframes cursor-blink {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.2;
        }
      }
    `
];
n([
  h({ reflect: !0 })
], e.prototype, "shape", 2);
n([
  h({ type: Boolean, reflect: !0 })
], e.prototype, "blink", 2);
e = n([
  m("bh-terminal-cursor")
], e);
export {
  e as BhTerminalCursor
};
//# sourceMappingURL=bh-terminal-cursor.js.map
