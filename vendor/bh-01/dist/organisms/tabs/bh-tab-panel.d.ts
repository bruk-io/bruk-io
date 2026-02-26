import { BaseElement } from '../../primitives/base-element.js';
/**
 * Content panel associated with a tab. Hidden when not active.
 *
 * @slot - Panel content
 */
export declare class BhTabPanel extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    tabId: string;
    active: boolean;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-tab-panel': BhTabPanel;
    }
}
//# sourceMappingURL=bh-tab-panel.d.ts.map