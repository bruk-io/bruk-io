import { BaseElement } from '../../primitives/base-element.js';
/**
 * An M×N grid of square pixels with on/off glow, used for LED-style displays.
 *
 * The `data` property is a flat row-major `Uint8Array` of length `cols * rows`.
 * Each byte is a palette index: 0 = off, 1 = primary, 2 = success, 3 = warning, 4 = danger.
 *
 * **Important:** Lit only triggers updates on reference change, not mutation.
 * Assign a new `Uint8Array` each time data changes.
 *
 * @csspart grid - The CSS Grid container
 * @csspart pixel - Each individual pixel div
 *
 * @cssprop [--bh-pixel-size=4px] - Pixel width and height
 * @cssprop [--bh-pixel-gap=1px] - Gap between pixels
 * @cssprop [--bh-pixel-off=var(--bh-color-surface-recessed)] - Off-state pixel color
 * @cssprop [--bh-pixel-radius=1px] - Pixel border-radius
 * @cssprop [--bh-pixel-glow=4px] - Glow spread on lit pixels
 */
export declare class BhPixelDisplay extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    cols: number;
    rows: number;
    data?: Uint8Array;
    label: string;
    private _prevData?;
    private _pixelEls;
    protected render(): import("lit-html").TemplateResult<1>;
    protected updated(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-pixel-display': BhPixelDisplay;
    }
}
//# sourceMappingURL=bh-pixel-display.d.ts.map