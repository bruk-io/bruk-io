import { BaseElement } from '../../primitives/base-element.js';
/**
 * A range slider input component.
 *
 * @csspart track - The native range input element
 * @csspart value - The value display span
 *
 * @cssprop [--bh-slider-thumb-size=14px] - Thumb diameter
 * @cssprop [--bh-slider-thumb-color=var(--bh-color-primary)] - Thumb color
 * @cssprop [--bh-slider-track-height=4px] - Track height
 * @cssprop [--bh-slider-track-color=var(--bh-color-surface-raised)] - Track background
 *
 * @fires bh-input - Fired during drag. `detail: { value: number }`
 * @fires bh-change - Fired on release. `detail: { value: number }`
 */
export declare class BhSlider extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    min: number;
    max: number;
    step: number;
    value: number;
    disabled: boolean;
    showValue: boolean;
    label: string;
    render(): import("lit-html").TemplateResult<1>;
    private _handleInput;
    private _handleChange;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-slider': BhSlider;
    }
}
//# sourceMappingURL=bh-slider.d.ts.map