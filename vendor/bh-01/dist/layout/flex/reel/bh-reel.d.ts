import { type PropertyValues } from 'lit';
import { BaseElement } from '../../../primitives/base-element.js';
import type { LayoutGap } from '../../layout-types.js';
/**
 * Horizontal scroll strip layout primitive.
 *
 * Arranges slotted children in a horizontal scrollable row with configurable
 * gap, item width, and optional scroll snapping. Purely structural.
 *
 * @slot - Default slot for content
 *
 * @cssprop [--bh-reel-gap] - Override gap value
 * @cssprop [--bh-reel-item-width] - Override item width
 */
export declare class BhReel extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    gap: LayoutGap;
    itemWidth: string;
    snap: boolean;
    protected willUpdate(changed: PropertyValues<this>): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-reel': BhReel;
    }
}
//# sourceMappingURL=bh-reel.d.ts.map