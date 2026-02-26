import { css as n, html as p } from "lit";
import { property as v, customElement as m } from "lit/decorators.js";
import { BaseElement as o } from "../../primitives/base-element.js";
var b = Object.defineProperty, c = Object.getOwnPropertyDescriptor, h = (d, s, r, i) => {
  for (var t = i > 1 ? void 0 : i ? c(s, r) : s, a = d.length - 1, l; a >= 0; a--)
    (l = d[a]) && (t = (i ? l(s, r, t) : l(t)) || t);
  return i && t && b(s, r, t), t;
};
let e = class extends o {
  constructor() {
    super(...arguments), this.sidebarOpen = !1;
  }
  render() {
    return p`
      <div class="grid" part="grid">
        <div class="activity">
          <slot name="activity"></slot>
        </div>
        <div class="sidebar">
          <slot name="sidebar"></slot>
        </div>
        <div class="main">
          <slot></slot>
        </div>
        <div class="status">
          <slot name="status"></slot>
        </div>
      </div>
    `;
  }
};
e.styles = [
  ...[o.styles].flat(),
  n`
      :host {
        display: block;
        height: 100vh;
        width: 100vw;
        background: var(--bh-shell-bg, var(--bh-color-bg));
      }

      .grid {
        display: grid;
        grid-template-columns:
          var(--bh-shell-activity-width, 48px)
          var(--bh-shell-sidebar-width, 0px)
          1fr;
        grid-template-rows: 1fr var(--bh-shell-status-height, 24px);
        grid-template-areas:
          "activity sidebar main"
          "status   status  status";
        height: 100%;
        width: 100%;
        transition: grid-template-columns var(--bh-transition-normal);
      }

      :host([sidebar-open]) .grid {
        --bh-shell-sidebar-width: 250px;
      }

      .activity {
        grid-area: activity;
        min-width: 0;
      }

      .sidebar {
        grid-area: sidebar;
        min-width: 0;
        overflow: hidden;
      }

      .main {
        grid-area: main;
        min-width: 0;
        overflow: auto;
      }

      .status {
        grid-area: status;
        min-width: 0;
      }
    `
];
h([
  v({ type: Boolean, reflect: !0, attribute: "sidebar-open" })
], e.prototype, "sidebarOpen", 2);
e = h([
  m("bh-app-shell")
], e);
export {
  e as BhAppShell
};
//# sourceMappingURL=bh-app-shell.js.map
