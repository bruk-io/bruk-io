import { css as p, nothing as d, html as b } from "lit";
import { state as c, customElement as f } from "lit/decorators.js";
import { BhTable as h } from "../../molecules/table/bh-table.js";
import { BhIcon as u } from "../../atoms/icon/bh-icon.js";
var _ = Object.defineProperty, m = Object.getOwnPropertyDescriptor, l = (t, r, s, i) => {
  for (var o = i > 1 ? void 0 : i ? m(r, s) : r, e = t.length - 1, a; e >= 0; e--)
    (a = t[e]) && (o = (i ? a(r, s, o) : a(o)) || o);
  return i && o && _(r, s, o), o;
};
u.register("sort-asc", '<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>');
u.register("sort-desc", '<path d="M12 5v14"/><path d="m5 12 7 7 7-7"/>');
let n = class extends h {
  constructor() {
    super(...arguments), this._sortColumn = "", this._sortDirection = "none";
  }
  get _sortedRows() {
    if (this._sortDirection === "none" || !this._sortColumn)
      return this.rows;
    const t = this._sortColumn, r = this._sortDirection === "asc" ? 1 : -1;
    return [...this.rows].sort((s, i) => {
      const o = s[t], e = i[t];
      return o == null && e == null ? 0 : o == null ? 1 : e == null ? -1 : typeof o == "number" && typeof e == "number" ? (o - e) * r : String(o).localeCompare(String(e)) * r;
    });
  }
  get _displayRows() {
    return this._sortedRows;
  }
  _renderHeaderCell(t) {
    if (!t.sortable)
      return super._renderHeaderCell(t);
    const s = this._sortColumn === t.key && this._sortDirection !== "none";
    return b`
      <th
        part="th"
        class=${t.align ? `align-${t.align}` : ""}
        style=${t.width ? `width: ${t.width}` : ""}
        aria-sort=${s ? this._sortDirection === "asc" ? "ascending" : "descending" : d}
      >
        <button
          class="sort-button"
          part="sort-button"
          @click=${() => this._onSortClick(t.key)}
        >
          ${t.label}
          <span class="sort-icon ${s ? "active" : ""}">
            <bh-icon name=${s && this._sortDirection === "desc" ? "sort-desc" : "sort-asc"}></bh-icon>
          </span>
        </button>
      </th>
    `;
  }
  _onSortClick(t) {
    let r;
    this._sortColumn === t ? this._sortDirection === "none" ? r = "asc" : this._sortDirection === "asc" ? r = "desc" : r = "none" : r = "asc", this._sortColumn = t, this._sortDirection = r, this.dispatchEvent(
      new CustomEvent("bh-sort", {
        bubbles: !0,
        composed: !0,
        detail: { column: t, direction: r }
      })
    );
  }
};
n.styles = [
  ...[h.styles].flat(),
  p`
      /* Sort button */
      .sort-button {
        display: inline-flex;
        align-items: center;
        gap: var(--bh-spacing-1);
        padding: 0;
        border: none;
        background: none;
        color: inherit;
        font: inherit;
        font-weight: inherit;
        cursor: pointer;
        white-space: nowrap;
      }

      .sort-button:hover {
        color: var(--bh-color-text);
      }

      .sort-button:focus-visible {
        outline: 2px solid var(--bh-color-ring);
        outline-offset: 2px;
        border-radius: var(--bh-radius-sm);
      }

      /* Sort icons */
      .sort-icon {
        display: inline-flex;
        flex-shrink: 0;
        opacity: 0.3;
        transition: opacity var(--bh-transition-fast);
      }

      .sort-icon.active {
        opacity: 1;
      }

      .sort-icon bh-icon {
        --bh-icon-size: 1em;
      }
    `
];
l([
  c()
], n.prototype, "_sortColumn", 2);
l([
  c()
], n.prototype, "_sortDirection", 2);
n = l([
  f("bh-data-table")
], n);
export {
  n as BhDataTable
};
//# sourceMappingURL=bh-data-table.js.map
