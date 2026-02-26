import { BaseElement } from '../../primitives/base-element.js';
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
/**
 * A tooltip that shows contextual text on hover/focus of its trigger content.
 * Pure CSS positioning — no floating-ui dependency.
 *
 * @slot - The trigger element that activates the tooltip
 *
 * @csspart tooltip - The tooltip popup element
 *
 * @cssprop [--bh-tooltip-bg=var(--bh-color-cod)] - Tooltip background
 * @cssprop [--bh-tooltip-color=var(--bh-color-white)] - Tooltip text color
 */
export declare class BhTooltip extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    content: string;
    placement: TooltipPlacement;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-tooltip': BhTooltip;
    }
}
//# sourceMappingURL=bh-tooltip.d.ts.map