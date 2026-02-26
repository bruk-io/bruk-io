import { BaseElement } from '../../primitives/base-element.js';
/**
 * Wraps any form atom with a label, help text, and error message.
 * Handles ARIA linking across Shadow DOM boundaries.
 *
 * @slot - The form control (e.g. `<bh-input>`, `<bh-select>`)
 *
 * @csspart field - The outer wrapper
 * @csspart label - The label element
 * @csspart help-text - The help text element
 * @csspart error - The error message element
 *
 * @cssprop [--bh-form-field-gap=var(--bh-spacing-1-5)] - Gap between label, control, and messages
 * @cssprop [--bh-form-field-label-color=var(--bh-color-text)] - Label text color
 * @cssprop [--bh-form-field-error-color=var(--bh-color-danger)] - Error text color
 */
export declare class BhFormField extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    label: string;
    helpText: string;
    error: string;
    required: boolean;
    private _defaultSlot;
    private _uniqueId;
    render(): import("lit-html").TemplateResult<1>;
    updated(): void;
    private _onSlotChange;
    private _linkAria;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-form-field': BhFormField;
    }
}
//# sourceMappingURL=bh-form-field.d.ts.map