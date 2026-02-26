import { BaseElement } from '../../../primitives/base-element.js';
import type { LayoutGap, LayoutAlign } from '../../layout-types.js';
/**
 * Vertical flow layout primitive.
 *
 * Arranges slotted children in a column with configurable gap and alignment.
 * Purely structural — no visual styling.
 *
 * @slot - Default slot for content
 *
 * @cssprop [--bh-stack-gap] - Override gap value
 */
export declare class BhStack extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    gap: LayoutGap;
    align: LayoutAlign;
    wrap: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-stack': BhStack;
    }
}
//# sourceMappingURL=bh-stack.d.ts.map