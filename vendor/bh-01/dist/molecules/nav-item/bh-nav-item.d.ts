import { BaseElement } from '../../primitives/base-element.js';
/**
 * A navigation item for sidebars and navbars with icon + label + optional badge.
 * Renders as `<a>` when `href` is provided, `<button>` otherwise.
 *
 * @slot prefix - Icon slot (before label)
 * @slot - Label text
 * @slot suffix - Badge or indicator slot (after label)
 *
 * @csspart item - The inner `<a>` or `<button>` element
 *
 * @cssprop [--bh-nav-item-bg=transparent] - Item background color
 * @cssprop [--bh-nav-item-color=var(--bh-color-text)] - Item text color
 * @cssprop [--bh-nav-item-hover-bg=var(--bh-color-secondary)] - Hover background
 * @cssprop [--bh-nav-item-active-bg=var(--bh-color-secondary)] - Active background
 * @cssprop [--bh-nav-item-active-color=var(--bh-color-primary)] - Active text color
 *
 * @fires bh-click - Fired on click. `detail: { originalEvent: MouseEvent }`
 */
export declare class BhNavItem extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    active: boolean;
    disabled: boolean;
    href: string;
    target: string;
    render(): import("lit-html").TemplateResult<1>;
    private _handleClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-nav-item': BhNavItem;
    }
}
//# sourceMappingURL=bh-nav-item.d.ts.map