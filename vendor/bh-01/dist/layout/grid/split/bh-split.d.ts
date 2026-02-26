import { type PropertyValues } from 'lit';
import { BaseElement } from '../../../primitives/base-element.js';
import type { LayoutGap } from '../../layout-types.js';
/**
 * Explicit column ratio layout primitive.
 *
 * Arranges slotted children in a grid with configurable gap and column ratios.
 * Purely structural — no visual styling.
 *
 * @slot - Default slot for content
 *
 * @cssprop [--bh-split-gap] - Override gap value
 */
export declare class BhSplit extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    gap: LayoutGap;
    ratio: string;
    protected willUpdate(changedProperties: PropertyValues<this>): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-split': BhSplit;
    }
}
//# sourceMappingURL=bh-split.d.ts.map