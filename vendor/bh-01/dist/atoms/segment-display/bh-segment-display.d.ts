import { BaseElement } from '../../primitives/base-element.js';
export type SegmentColor = 'primary' | 'success' | 'warning' | 'danger' | 'default';
export type SegmentSize = 'sm' | 'md' | 'lg' | 'xl';
/**
 * A 14-segment LED display using the DSEG14 font for that Teenage Engineering /
 * Braun aesthetic.  Renders uppercase text and digits in glowing segment style.
 *
 * The DSEG14 font supports: A-Z, 0-9, and common symbols (+, -, ., :, etc.).
 * Text is automatically uppercased.
 *
 * @csspart display - The inner `<span>` element
 *
 * @cssprop [--bh-segment-color=var(--bh-color-primary)] - Segment fill color
 * @cssprop [--bh-segment-glow=var(--bh-color-primary-glow)] - Segment glow color
 * @cssprop [--bh-segment-off=var(--bh-color-surface-recessed)] - Ghost segment color
 * @cssprop [--bh-segment-size=14px] - Font size
 * @cssprop [--bh-segment-tracking=1px] - Letter spacing
 */
export declare class BhSegmentDisplay extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    /** The text to display. Automatically uppercased. */
    value: string;
    color: SegmentColor;
    size: SegmentSize;
    /** Show ghost (unlit) segments behind the active ones for the classic LCD look. */
    ghost: boolean;
    label: string;
    /** Character used for ghost segments. Defaults to '8' for digits, '~' for alpha. */
    private get _ghostText();
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-segment-display': BhSegmentDisplay;
    }
}
//# sourceMappingURL=bh-segment-display.d.ts.map