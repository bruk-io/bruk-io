import { css as c, html as b } from "lit";
import { property as d, customElement as p } from "lit/decorators.js";
import { BaseElement as n } from "../../primitives/base-element.js";
var v = Object.defineProperty, y = Object.getOwnPropertyDescriptor, o = (r, t, h, s) => {
  for (var a = s > 1 ? void 0 : s ? y(t, h) : t, l = r.length - 1, i; l >= 0; l--)
    (i = r[l]) && (a = (s ? i(t, h, a) : i(a)) || a);
  return s && a && v(t, h, a), a;
};
let e = class extends n {
  constructor() {
    super(...arguments), this.variant = "default", this.density = "default", this.stickyHeader = !1, this.columns = [], this.rows = [];
  }
  _renderHeaderCell(r) {
    return b`
      <th
        part="th"
        class=${r.align ? `align-${r.align}` : ""}
        style=${r.width ? `width: ${r.width}` : ""}
      >
        ${r.label}
      </th>
    `;
  }
  get _displayRows() {
    return this.rows;
  }
  render() {
    return b`
      <div class="wrapper">
        <table part="table">
          <thead part="thead">
            <tr>
              ${this.columns.map((r) => this._renderHeaderCell(r))}
            </tr>
          </thead>
          <tbody part="tbody">
            ${this._displayRows.map(
      (r) => b`
                <tr part="row">
                  ${this.columns.map(
        (t) => b`
                      <td
                        part="td"
                        class=${t.align ? `align-${t.align}` : ""}
                      >
                        ${String(r[t.key] ?? "")}
                      </td>
                    `
      )}
                </tr>
              `
    )}
          </tbody>
        </table>
      </div>
    `;
  }
};
e.styles = [
  ...[n.styles].flat(),
  c`
      :host {
        display: block;
      }

      .wrapper {
        overflow-x: auto;
        border-radius: var(--bh-table-radius, var(--bh-radius-lg));
        border: var(--bh-border-1) solid var(--bh-table-border, var(--bh-color-border));
      }

      table {
        width: 100%;
        border-collapse: collapse;
        background: var(--bh-table-bg, var(--bh-color-surface-raised));
        font-family: var(--bh-font-sans);
        font-size: var(--bh-text-sm);
        line-height: var(--bh-leading-normal);
      }

      /* Header */
      thead {
        background: var(--bh-table-header-bg, var(--bh-color-surface));
      }

      th {
        font-weight: var(--bh-font-semibold);
        color: var(--bh-color-text-muted);
        text-align: left;
        white-space: nowrap;
        border-bottom: var(--bh-border-1) solid var(--bh-table-border, var(--bh-color-border));
      }

      /* Body */
      td {
        color: var(--bh-color-text);
        border-bottom: var(--bh-border-1) solid var(--bh-table-border, var(--bh-color-border));
      }

      tbody tr:last-child td {
        border-bottom: none;
      }

      /* Hover */
      tbody tr:hover {
        background: var(--bh-table-hover-bg, var(--bh-color-secondary));
      }

      /* Density — default */
      th,
      td,
      :host([density='default']) th,
      :host([density='default']) td {
        padding: var(--bh-spacing-3) var(--bh-spacing-4);
      }

      /* Density — compact */
      :host([density='compact']) th,
      :host([density='compact']) td {
        padding: var(--bh-spacing-1-5) var(--bh-spacing-3);
        font-size: var(--bh-text-xs);
      }

      /* Density — comfortable */
      :host([density='comfortable']) th,
      :host([density='comfortable']) td {
        padding: var(--bh-spacing-4) var(--bh-spacing-6);
      }

      /* Striped */
      :host([variant='striped']) tbody tr:nth-child(even) {
        background: var(--bh-table-stripe-bg, var(--bh-color-surface));
      }

      /* Bordered */
      :host([variant='bordered']) th,
      :host([variant='bordered']) td {
        border: var(--bh-border-1) solid var(--bh-table-border, var(--bh-color-border));
      }

      /* Alignment */
      .align-center {
        text-align: center;
      }

      .align-end {
        text-align: right;
      }

      /* Sticky header */
      :host([sticky-header]) thead th {
        position: sticky;
        top: 0;
        z-index: 1;
        background: var(--bh-table-header-bg, var(--bh-color-surface));
      }
    `
];
o([
  d({ reflect: !0 })
], e.prototype, "variant", 2);
o([
  d({ reflect: !0 })
], e.prototype, "density", 2);
o([
  d({ type: Boolean, reflect: !0, attribute: "sticky-header" })
], e.prototype, "stickyHeader", 2);
o([
  d({ type: Array })
], e.prototype, "columns", 2);
o([
  d({ type: Array })
], e.prototype, "rows", 2);
e = o([
  p("bh-table")
], e);
export {
  e as BhTable
};
//# sourceMappingURL=bh-table.js.map
