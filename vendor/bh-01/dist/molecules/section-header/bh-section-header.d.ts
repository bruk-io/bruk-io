import { BaseElement } from '../../primitives/base-element.js';
import '../../atoms/badge/bh-badge.js';
import '../../atoms/divider/bh-divider.js';
/**
 * A section title with optional count badge and horizontal rule filling remaining space.
 *
 * @slot - Custom title content (overrides `heading` prop)
 * @slot badge - Custom badge content (overrides count display)
 * @slot end - Trailing content after the line
 *
 * @csspart header - The outer flex container
 * @csspart title - The title text
 * @csspart badge - The badge wrapper
 * @csspart line - The horizontal rule
 *
 * @cssprop [--bh-section-header-color=var(--bh-color-text-muted)] - Title text color
 * @cssprop [--bh-section-header-size=var(--bh-text-xs)] - Title font size
 * @cssprop [--bh-section-header-tracking=var(--bh-tracking-widest)] - Title letter-spacing
 * @cssprop [--bh-section-header-line-color=var(--bh-color-border-muted)] - Line color
 */
export declare class BhSectionHeader extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    heading: string;
    count?: number;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-section-header': BhSectionHeader;
    }
}
//# sourceMappingURL=bh-section-header.d.ts.map