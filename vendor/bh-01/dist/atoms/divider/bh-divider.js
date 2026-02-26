import { css as c, html as l } from "lit";
import { property as n, customElement as v } from "lit/decorators.js";
import { BaseElement as p } from "../../primitives/base-element.js";
var g = Object.defineProperty, b = Object.getOwnPropertyDescriptor, i = (h, e, o, t) => {
  for (var r = t > 1 ? void 0 : t ? b(e, o) : e, d = h.length - 1, s; d >= 0; d--)
    (s = h[d]) && (r = (t ? s(e, o, r) : s(r)) || r);
  return t && r && g(e, o, r), r;
};
let a = class extends p {
  constructor() {
    super(...arguments), this.vertical = !1, this.spacing = "md", this.gradient = !1;
  }
  render() {
    return l`
      <hr part="divider" aria-hidden="true" />
      <div class="vertical" part="divider" aria-hidden="true"></div>
    `;
  }
};
a.styles = [
  ...[p.styles].flat(),
  c`
      :host {
        display: block;
      }

      hr {
        border: none;
        height: 1px;
        background: var(--bh-divider-color, var(--bh-color-border-muted));
        box-shadow: var(--bh-divider-shadow, var(--bh-shadow-emboss));
        margin: 0;
      }

      /* Spacing */
      :host([spacing='sm']) {
        padding: var(--bh-spacing-2) 0;
      }

      :host,
      :host([spacing='md']) {
        padding: var(--bh-spacing-4) 0;
      }

      :host([spacing='lg']) {
        padding: var(--bh-spacing-8) 0;
      }

      /* Vertical */
      :host([vertical]) {
        display: inline-block;
        height: 100%;
        padding: 0;
      }

      :host([vertical]) hr {
        display: none;
      }

      .vertical {
        display: none;
        width: 1px;
        height: 100%;
        background: var(--bh-divider-color, var(--bh-color-border-muted));
        box-shadow: var(--bh-divider-shadow, var(--bh-shadow-emboss));
      }

      :host([vertical]) .vertical {
        display: block;
      }

      :host([vertical][spacing='sm']) {
        padding: 0 var(--bh-spacing-2);
      }

      :host([vertical][spacing='md']),
      :host([vertical]) {
        padding: 0 var(--bh-spacing-4);
      }

      :host([vertical][spacing='lg']) {
        padding: 0 var(--bh-spacing-8);
      }

      /* Gradient mode */
      :host([gradient]) hr {
        height: 2px;
        background: var(
          --bh-divider-gradient,
          linear-gradient(to right, var(--bh-color-primary), var(--bh-color-border-muted) 40%, transparent)
        );
        box-shadow: none;
      }

      :host([gradient][vertical]) .vertical {
        width: 2px;
        background: var(
          --bh-divider-gradient,
          linear-gradient(to bottom, var(--bh-color-primary), var(--bh-color-border-muted) 40%, transparent)
        );
        box-shadow: none;
      }
    `
];
i([
  n({ type: Boolean, reflect: !0 })
], a.prototype, "vertical", 2);
i([
  n({ reflect: !0 })
], a.prototype, "spacing", 2);
i([
  n({ type: Boolean, reflect: !0 })
], a.prototype, "gradient", 2);
a = i([
  v("bh-divider")
], a);
export {
  a as BhDivider
};
//# sourceMappingURL=bh-divider.js.map
