import { BaseElement } from '../../primitives/base-element.js';
import '../../atoms/icon/bh-icon.js';
/**
 * An individual tree node that supports nesting, expand/collapse, and selection.
 *
 * @slot icon - Icon slot (before label)
 * @slot end - Trailing content slot (badges, actions)
 * @slot children - Nested tree items
 *
 * @csspart row - The clickable row element
 * @csspart chevron - The expand/collapse chevron
 * @csspart label - The label text
 *
 * @cssprop [--bh-tree-item-hover-bg=var(--bh-color-secondary)] - Hover background
 * @cssprop [--bh-tree-item-selected-bg=var(--bh-color-surface-raised)] - Selected background
 * @cssprop [--bh-tree-item-selected-color=var(--bh-color-primary)] - Selected text color
 *
 * @fires bh-tree-item-click - Fired on click. `detail: { value: string, label: string }`
 */
export declare class BhTreeItem extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    value: string;
    label: string;
    selected: boolean;
    expanded: boolean;
    indent: number;
    /**
     * @internal - managed by bh-tree for roving tabindex.
     * When true this item is the keyboard entry point into the tree.
     */
    roving: boolean;
    private _hasChildren;
    render(): import("lit-html").TemplateResult<1>;
    private _onChildrenSlotChange;
    private _handleClick;
    private _handleKeydown;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-tree-item': BhTreeItem;
    }
}
//# sourceMappingURL=bh-tree-item.d.ts.map