import { BaseElement } from '../../primitives/base-element.js';
export type DividerSpacing = 'sm' | 'md' | 'lg';
/**
 * An industrial horizontal (or vertical) rule with an embossed 3D look.
 *
 * @csspart divider - The rule element
 *
 * @cssprop [--bh-divider-color] - Divider line color
 * @cssprop [--bh-divider-shadow] - Divider shadow (defaults to emboss)
 * @cssprop [--bh-divider-gradient] - Custom gradient value when `gradient` attribute is set
 */
export declare class BhDivider extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    vertical: boolean;
    spacing: DividerSpacing;
    gradient: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-divider': BhDivider;
    }
}
//# sourceMappingURL=bh-divider.d.ts.map