import { type PropertyValues } from 'lit';
import { BaseElement } from '../../../primitives/base-element.js';
import type { LayoutGap } from '../../layout-types.js';
/**
 * Responsive auto-fit grid layout primitive.
 *
 * Arranges slotted children in columns that auto-fit to the container
 * with a configurable minimum column width and gap.
 * Purely structural — no visual styling.
 *
 * @slot - Default slot for content
 *
 * @cssprop [--bh-grid-gap] - Override gap value
 * @cssprop [--bh-grid-min] - Override minimum column width
 */
export declare class BhGrid extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    gap: LayoutGap;
    min: string;
    protected willUpdate(changed: PropertyValues<this>): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-grid': BhGrid;
    }
}
//# sourceMappingURL=bh-grid.d.ts.map