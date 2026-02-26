import { type PropertyValues } from 'lit';
import { BaseElement } from '../../../primitives/base-element.js';
import type { LayoutGap } from '../../layout-types.js';
/**
 * Center content with optional max-width.
 *
 * Centers slotted children horizontally with configurable max-width,
 * gutters, and intrinsic sizing. Purely structural — no visual styling.
 *
 * @slot - Default slot for content
 *
 * @cssprop [--bh-center-max] - Override max-inline-size value
 * @cssprop [--bh-center-gutters] - Override padding-inline value
 */
export declare class BhCenter extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    max: string;
    gutters: LayoutGap;
    intrinsic: boolean;
    protected willUpdate(changed: PropertyValues<this>): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-center': BhCenter;
    }
}
//# sourceMappingURL=bh-center.d.ts.map