import { BaseElement } from '../../primitives/base-element.js';
import './bh-tab-bar.js';
import './bh-tab-panel.js';
/**
 * Orchestrator that wires a bh-tab-bar to bh-tab-panel children.
 *
 * @slot tab-bar - Slot for the bh-tab-bar element
 * @slot - Default slot for bh-tab-panel elements
 *
 * @fires bh-tab-change - Re-emitted when the active tab changes. `detail: { tabId: string }`
 */
export declare class BhTabs extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    active: string;
    render(): import("lit-html").TemplateResult<1>;
    updated(changed: Map<string, unknown>): void;
    private _handleTabChange;
    private _syncPanels;
    private _syncTabBar;
    private _getPanels;
    private _getTabBar;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-tabs': BhTabs;
    }
}
//# sourceMappingURL=bh-tabs.d.ts.map