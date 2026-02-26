import { BaseElement } from '../../primitives/base-element.js';
/**
 * Individual tab item for use inside bh-tab-bar.
 *
 * @slot - Tab label content
 *
 * @csspart button - The inner button element
 *
 * @cssprop [--bh-tab-color=var(--bh-color-text-muted)] - Default text color
 * @cssprop [--bh-tab-active-color=var(--bh-color-text)] - Active text color
 * @cssprop [--bh-tab-active-border=var(--bh-color-primary)] - Active bottom border color
 *
 * @fires bh-tab-click - Fired on click. `detail: { tabId: string }`
 */
export declare class BhTab extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    tabId: string;
    label: string;
    active: boolean;
    render(): import("lit-html").TemplateResult<1>;
    private _handleClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-tab': BhTab;
    }
}
//# sourceMappingURL=bh-tab.d.ts.map