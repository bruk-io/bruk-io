import { BaseElement } from '../../primitives/base-element.js';
export type LinkVariant = 'default' | 'muted' | 'accent';
/**
 * A styled anchor element with variant support and optional external indicator.
 *
 * @slot - Link text content
 *
 * @csspart link - The `<a>` element
 *
 * @cssprop [--bh-link-color=var(--bh-color-link)] - Link text color
 *
 * @fires bh-click - Fired on click. `detail: { originalEvent: MouseEvent }`
 */
export declare class BhLink extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    href: string;
    target: string;
    variant: LinkVariant;
    external: boolean;
    render(): import("lit-html").TemplateResult<1>;
    private _handleClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-link': BhLink;
    }
}
//# sourceMappingURL=bh-link.d.ts.map