import { BaseElement } from '../../primitives/base-element.js';
import './bh-tree-item.js';
/**
 * A tree container that manages selection across nested bh-tree-items.
 *
 * @slot - Tree items (bh-tree-item elements)
 *
 * @fires bh-select - Fired when a tree item is selected. `detail: { value: string, label: string }`
 */
export declare class BhTree extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    selected: string;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changed: Map<string, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
    private _onItemClick;
    private _updateSelection;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-tree': BhTree;
    }
}
//# sourceMappingURL=bh-tree.d.ts.map