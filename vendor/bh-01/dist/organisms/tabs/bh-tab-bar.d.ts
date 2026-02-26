import { BaseElement } from '../../primitives/base-element.js';
import './bh-tab.js';
/**
 * Horizontal tab bar that holds bh-tab items.
 *
 * @slot - Tab items (bh-tab elements)
 *
 * @cssprop [--bh-tab-bar-height=36px] - Bar height
 * @cssprop [--bh-tab-bar-bg=transparent] - Background color
 * @cssprop [--bh-tab-bar-border=var(--bh-color-border)] - Bottom border color
 *
 * @fires bh-tab-change - Fired when a tab is selected. `detail: { tabId: string }`
 */
export declare class BhTabBar extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    active: string;
    render(): import("lit-html").TemplateResult<1>;
    updated(changed: Map<string, unknown>): void;
    private _syncActive;
    private _handleTabClick;
    private _getTabs;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-tab-bar': BhTabBar;
    }
}
//# sourceMappingURL=bh-tab-bar.d.ts.map