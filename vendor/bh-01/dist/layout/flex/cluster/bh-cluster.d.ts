import { BaseElement } from '../../../primitives/base-element.js';
import type { LayoutGap, LayoutAlign, LayoutJustify } from '../../layout-types.js';
/**
 * Horizontal wrapping flow layout primitive.
 *
 * Arranges slotted children in a row with configurable gap, alignment, and
 * justification. Wraps by default. Purely structural — no visual styling.
 *
 * @slot - Default slot for content
 *
 * @cssprop [--bh-cluster-gap] - Override gap value
 */
export declare class BhCluster extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    gap: LayoutGap;
    justify: LayoutJustify;
    align: LayoutAlign;
    nowrap: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-cluster': BhCluster;
    }
}
//# sourceMappingURL=bh-cluster.d.ts.map