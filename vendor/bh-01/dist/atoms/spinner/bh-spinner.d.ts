import { BaseElement } from '../../primitives/base-element.js';
export type SpinnerSize = 'sm' | 'md' | 'lg';
/**
 * A CSS-animated loading spinner. Inherits color from its parent.
 *
 * @csspart spinner - The `<svg>` element
 */
export declare class BhSpinner extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    size: SpinnerSize;
    label: string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-spinner': BhSpinner;
    }
}
//# sourceMappingURL=bh-spinner.d.ts.map