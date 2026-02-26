import { BaseElement } from '../../primitives/base-element.js';
export type ToolbarGap = 'xs' | 'sm' | 'md';
export type ToolbarVariant = 'default' | 'surface';
/**
 * A horizontal toolbar with start, center, and end slots.
 *
 * @slot start - Content aligned to the start (left)
 * @slot - Default slot, placed in center
 * @slot end - Content aligned to the end (right)
 *
 * @csspart toolbar - The toolbar container
 *
 * @cssprop [--bh-toolbar-bg=transparent] - Toolbar background
 * @cssprop [--bh-toolbar-border=var(--bh-color-border)] - Bottom border color when sticky
 */
export declare class BhToolbar extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    gap: ToolbarGap;
    variant: ToolbarVariant;
    sticky: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-toolbar': BhToolbar;
    }
}
//# sourceMappingURL=bh-toolbar.d.ts.map