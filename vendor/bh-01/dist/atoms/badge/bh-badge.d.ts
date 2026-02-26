import { BaseElement } from '../../primitives/base-element.js';
export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md';
/**
 * A pill-shaped badge for status indicators and counts.
 *
 * @slot - Badge content (text or number)
 *
 * @csspart badge - The inner `<span>` element
 *
 * @cssprop [--bh-badge-bg] - Badge background color
 * @cssprop [--bh-badge-color] - Badge text color
 */
export declare class BhBadge extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    variant: BadgeVariant;
    size: BadgeSize;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-badge': BhBadge;
    }
}
//# sourceMappingURL=bh-badge.d.ts.map