import { BaseElement } from '../../primitives/base-element.js';
export type TableVariant = 'default' | 'striped' | 'bordered';
export type TableDensity = 'compact' | 'default' | 'comfortable';
export interface TableColumn {
    key: string;
    label: string;
    width?: string;
    align?: 'start' | 'center' | 'end';
}
/**
 * A data-driven table that renders columns and rows from properties.
 *
 * @csspart table - The `<table>` element
 * @csspart thead - The `<thead>` element
 * @csspart tbody - The `<tbody>` element
 * @csspart th - A header cell
 * @csspart td - A body cell
 * @csspart row - A body `<tr>` row
 *
 * @cssprop [--bh-table-bg=var(--bh-color-surface-raised)] - Table background
 * @cssprop [--bh-table-border=var(--bh-color-border)] - Table border color
 * @cssprop [--bh-table-header-bg=var(--bh-color-surface)] - Header background
 * @cssprop [--bh-table-stripe-bg=var(--bh-color-surface)] - Striped row background
 * @cssprop [--bh-table-hover-bg=var(--bh-color-secondary)] - Row hover background
 * @cssprop [--bh-table-radius=var(--bh-radius-lg)] - Table border radius
 */
export declare class BhTable extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    variant: TableVariant;
    density: TableDensity;
    stickyHeader: boolean;
    columns: TableColumn[];
    rows: Record<string, unknown>[];
    protected _renderHeaderCell(col: TableColumn): import("lit-html").TemplateResult<1>;
    protected get _displayRows(): Record<string, unknown>[];
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-table': BhTable;
    }
}
//# sourceMappingURL=bh-table.d.ts.map