import { BaseElement } from '../../primitives/base-element.js';
/**
 * A collapsible side panel with header and body slots.
 *
 * @slot header - Panel header content (36px tall)
 * @slot - Panel body content (overflow auto)
 *
 * @csspart header - The header wrapper
 * @csspart body - The scrollable body wrapper
 *
 * @cssprop [--bh-sidebar-panel-width=250px] - Panel width
 * @cssprop [--bh-sidebar-panel-bg=var(--bh-color-surface)] - Panel background
 * @cssprop [--bh-sidebar-panel-border=var(--bh-color-border)] - Panel border color
 *
 * @fires bh-sidebar-collapse - Fired when the panel collapses or expands. `detail: { collapsed: boolean }`
 */
export declare class BhSidebarPanel extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    collapsed: boolean;
    private _firstUpdate;
    render(): import("lit-html").TemplateResult<1>;
    updated(changed: Map<string, unknown>): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-sidebar-panel': BhSidebarPanel;
    }
}
//# sourceMappingURL=bh-sidebar-panel.d.ts.map