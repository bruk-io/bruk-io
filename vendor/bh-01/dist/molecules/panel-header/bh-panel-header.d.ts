import { BaseElement } from '../../primitives/base-element.js';
/**
 * A small uppercase section header for sidebar panels.
 *
 * @slot end - Actions rendered at the end of the header
 *
 * @csspart header - The header container
 * @csspart label - The label text
 *
 * @cssprop [--bh-panel-header-height=36px] - Header height
 * @cssprop [--bh-panel-header-text=var(--bh-color-text-muted)] - Label color
 */
export declare class BhPanelHeader extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    label: string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-panel-header': BhPanelHeader;
    }
}
//# sourceMappingURL=bh-panel-header.d.ts.map