import { BaseElement } from '../../primitives/base-element.js';
export type InputSize = 'sm' | 'md' | 'lg';
/**
 * A text input component with support for inset prefix/suffix content.
 *
 * @slot prefix - Content inside the input, before the text (e.g. `<bh-icon name="search">`)
 * @slot suffix - Content inside the input, after the text (e.g. `<bh-icon name="x">`)
 *
 * @csspart wrapper - The outer container with border and background
 * @csspart input - The native `<input>` element
 *
 * @cssprop [--bh-input-bg=var(--bh-color-surface-raised)] - Input background
 * @cssprop [--bh-input-color=var(--bh-color-text)] - Input text color
 * @cssprop [--bh-input-border=var(--bh-color-border)] - Input border color
 * @cssprop [--bh-input-radius=var(--bh-radius-md)] - Input border radius
 *
 * @fires bh-input - Fired on each keystroke. `detail: { value: string }`
 * @fires bh-change - Fired on blur/commit. `detail: { value: string }`
 */
export declare class BhInput extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    size: InputSize;
    type: string;
    value: string;
    placeholder: string;
    name: string;
    label: string;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
    error: boolean;
    render(): import("lit-html").TemplateResult<1>;
    private _handleInput;
    private _handleChange;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-input': BhInput;
    }
}
//# sourceMappingURL=bh-input.d.ts.map