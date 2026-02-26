import { BaseElement } from '../../primitives/base-element.js';
export type LedColor = 'success' | 'warning' | 'danger' | 'primary';
export type LedSize = 'sm' | 'md';
/**
 * A status LED indicator with optional pulse animation.
 *
 * @csspart led - The LED `<span>` element
 *
 * @cssprop [--bh-led-color] - LED fill color
 * @cssprop [--bh-led-size] - LED diameter
 * @cssprop [--bh-led-glow] - LED glow box-shadow color
 */
export declare class BhLed extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    color: LedColor;
    pulse: boolean;
    size: LedSize;
    label: string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-led': BhLed;
    }
}
//# sourceMappingURL=bh-led.d.ts.map