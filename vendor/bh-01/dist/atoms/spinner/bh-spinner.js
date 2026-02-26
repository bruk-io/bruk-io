import { css as c, nothing as m, html as f } from "lit";
import { property as p, customElement as g } from "lit/decorators.js";
import { BaseElement as h } from "../../primitives/base-element.js";
var v = Object.defineProperty, u = Object.getOwnPropertyDescriptor, n = (a, r, i, s) => {
  for (var e = s > 1 ? void 0 : s ? u(r, i) : r, o = a.length - 1, l; o >= 0; o--)
    (l = a[o]) && (e = (s ? l(r, i, e) : l(e)) || e);
  return s && e && v(r, i, e), e;
};
let t = class extends h {
  constructor() {
    super(...arguments), this.size = "md", this.label = "Loading";
  }
  render() {
    return f`
      <svg
        part="spinner"
        viewBox="0 0 24 24"
        fill="none"
        role="status"
        aria-label=${this.label || m}
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        ></path>
      </svg>
    `;
  }
};
t.styles = [
  ...[h.styles].flat(),
  c`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      svg {
        animation: spin 0.75s linear infinite;
        color: currentColor;
      }

      :host([size='sm']) svg {
        width: 1rem;
        height: 1rem;
      }

      svg,
      :host([size='md']) svg {
        width: 1.25rem;
        height: 1.25rem;
      }

      :host([size='lg']) svg {
        width: 1.5rem;
        height: 1.5rem;
      }

      circle {
        opacity: 0.25;
      }

      path {
        opacity: 0.75;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `
];
n([
  p({ reflect: !0 })
], t.prototype, "size", 2);
n([
  p()
], t.prototype, "label", 2);
t = n([
  g("bh-spinner")
], t);
export {
  t as BhSpinner
};
//# sourceMappingURL=bh-spinner.js.map
