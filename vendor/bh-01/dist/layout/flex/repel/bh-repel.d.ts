import { BaseElement } from '../../../primitives/base-element.js';
import type { LayoutGap, LayoutAlign } from '../../layout-types.js';
/**
 * Push children to opposite ends.
 *
 * Arranges slotted children along the main axis with space-between
 * justification and configurable gap and alignment.
 * Purely structural — no visual styling.
 *
 * @slot - Default slot for content
 *
 * @cssprop [--bh-repel-gap] - Override gap value
 */
export declare class BhRepel extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    gap: LayoutGap;
    align: LayoutAlign;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-repel': BhRepel;
    }
}
//# sourceMappingURL=bh-repel.d.ts.map