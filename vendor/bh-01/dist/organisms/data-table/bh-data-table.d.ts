import { BhTable } from '../../molecules/table/bh-table.js';
import type { TableColumn, TableVariant, TableDensity } from '../../molecules/table/bh-table.js';
import '../../atoms/icon/bh-icon.js';
export type DataTableVariant = TableVariant;
export type DataTableDensity = TableDensity;
export type SortDirection = 'asc' | 'desc' | 'none';
export interface DataTableColumn extends TableColumn {
    sortable?: boolean;
}
/**
 * An interactive data table with sorting support.
 *
 * @csspart table - The `<table>` element
 * @csspart thead - The `<thead>` element
 * @csspart tbody - The `<tbody>` element
 * @csspart th - A header cell
 * @csspart td - A body cell
 * @csspart row - A body `<tr>` row
 * @csspart sort-button - A sortable header button
 *
 * @cssprop [--bh-table-bg=var(--bh-color-surface-raised)] - Table background
 * @cssprop [--bh-table-border=var(--bh-color-border)] - Table border color
 * @cssprop [--bh-table-header-bg=var(--bh-color-surface)] - Header background
 * @cssprop [--bh-table-stripe-bg=var(--bh-color-surface)] - Striped row background
 * @cssprop [--bh-table-hover-bg=var(--bh-color-secondary)] - Row hover background
 * @cssprop [--bh-table-radius=var(--bh-radius-lg)] - Table border radius
 *
 * @fires bh-sort - Fired when a sortable column header is clicked. `detail: { column: string, direction: SortDirection }`
 */
export declare class BhDataTable extends BhTable {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    columns: DataTableColumn[];
    private _sortColumn;
    private _sortDirection;
    private get _sortedRows();
    protected get _displayRows(): Record<string, unknown>[];
    protected _renderHeaderCell(col: TableColumn): import("lit-html").TemplateResult<1>;
    private _onSortClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-data-table': BhDataTable;
    }
}
//# sourceMappingURL=bh-data-table.d.ts.map