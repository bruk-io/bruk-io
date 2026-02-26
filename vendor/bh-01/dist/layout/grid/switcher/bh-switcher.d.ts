import { type PropertyValues } from 'lit';
import { BaseElement } from '../../../primitives/base-element.js';
import type { LayoutGap } from '../../layout-types.js';
/**
 * Columns that collapse below a threshold.
 *
 * Uses CSS Grid auto-fit to switch between multi-column and single-column
 * layouts based on available width. Purely structural — no visual styling.
 *
 * @slot - Default slot for content
 *
 * @cssprop [--bh-switcher-gap] - Override gap value
 * @cssprop [--bh-switcher-threshold] - Override threshold value
 */
export declare class BhSwitcher extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    gap: LayoutGap;
    threshold: string;
    limit: number;
    protected willUpdate(changed: PropertyValues<this>): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-switcher': BhSwitcher;
    }
}
//# sourceMappingURL=bh-switcher.d.ts.map