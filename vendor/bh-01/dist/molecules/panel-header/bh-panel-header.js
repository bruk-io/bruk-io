import { css as h, html as d } from "lit";
import { property as c, customElement as b } from "lit/decorators.js";
import { BaseElement as i } from "../../primitives/base-element.js";
var v = Object.defineProperty, f = Object.getOwnPropertyDescriptor, o = (p, t, s, r) => {
  for (var e = r > 1 ? void 0 : r ? f(t, s) : t, l = p.length - 1, n; l >= 0; l--)
    (n = p[l]) && (e = (r ? n(t, s, e) : n(e)) || e);
  return r && e && v(t, s, e), e;
};
let a = class extends i {
  constructor() {
    super(...arguments), this.label = "";
  }
  render() {
    return d`
      <div class="header" part="header">
        <span class="label" part="label">${this.label}</span>
        <div class="end">
          <slot name="end"></slot>
        </div>
      </div>
    `;
  }
};
a.styles = [
  ...[i.styles].flat(),
  h`
      :host {
        display: block;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: var(--bh-panel-header-height, 36px);
        padding: 0 var(--bh-spacing-3);
        gap: var(--bh-spacing-2);
      }

      .label {
        font-size: var(--bh-text-xs);
        font-weight: var(--bh-font-semibold);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--bh-panel-header-text, var(--bh-color-text-muted));
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-width: 0;
      }

      .end {
        display: flex;
        align-items: center;
        gap: var(--bh-spacing-1);
        flex-shrink: 0;
      }
    `
];
o([
  c()
], a.prototype, "label", 2);
a = o([
  b("bh-panel-header")
], a);
export {
  a as BhPanelHeader
};
//# sourceMappingURL=bh-panel-header.js.map
