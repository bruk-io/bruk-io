import { type PropertyValues } from 'lit';
import { BaseElement } from '../../../primitives/base-element.js';
import type { LayoutGap } from '../../layout-types.js';
/**
 * Vertical layout with expanding center.
 *
 * Places content in top, center, and bottom slots. The center slot
 * expands to fill remaining space within the minimum height.
 *
 * @slot - Default slot for top content
 * @slot center - Center content that expands to fill space
 * @slot bottom - Bottom content
 *
 * @cssprop [--bh-cover-gap] - Override gap value
 * @cssprop [--bh-cover-min-height] - Override minimum height
 */
export declare class BhCover extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    gap: LayoutGap;
    minHeight: string;
    protected willUpdate(changed: PropertyValues<this>): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-cover': BhCover;
    }
}
//# sourceMappingURL=bh-cover.d.ts.map