import { nothing } from 'lit';
import { BaseElement } from '../../primitives/base-element.js';
import '../../atoms/icon/bh-icon.js';
export interface ContextMenuItem {
    id: string;
    label: string;
    icon?: string;
    disabled?: boolean;
    separator?: boolean;
}
/**
 * A right-click context menu overlay.
 *
 * @cssprop [--bh-context-menu-min-width=160px] - Minimum menu width
 *
 * @fires bh-select - Fired when a menu item is selected. `detail: { id: string, label: string }`
 */
export declare class BhContextMenu extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    open: boolean;
    x: number;
    y: number;
    items: ContextMenuItem[];
    private _selectedIndex;
    private get _actionableItems();
    show(x: number, y: number, items?: ContextMenuItem[]): void;
    hide(): void;
    private _onBackdropClick;
    private _onKeydown;
    private _selectItem;
    private _isSelected;
    protected render(): typeof nothing | import("lit-html").TemplateResult<1>;
    protected updated(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-context-menu': BhContextMenu;
    }
}
//# sourceMappingURL=bh-context-menu.d.ts.map