import { BaseElement } from '../../primitives/base-element.js';
export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';
/**
 * A multi-line text input for longer-form content like comments,
 * descriptions, and messages.
 *
 * @csspart wrapper - The outer container with border and background
 * @csspart textarea - The native `<textarea>` element
 *
 * @cssprop [--bh-textarea-bg=var(--bh-color-surface-raised)] - Textarea background
 * @cssprop [--bh-textarea-color=var(--bh-color-text)] - Textarea text color
 * @cssprop [--bh-textarea-border=var(--bh-color-border)] - Textarea border color
 * @cssprop [--bh-textarea-radius=var(--bh-radius-md)] - Textarea border radius
 *
 * @fires bh-input - Fired on each keystroke. `detail: { value: string }`
 * @fires bh-change - Fired on blur/commit. `detail: { value: string }`
 */
export declare class BhTextarea extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    size: TextareaSize;
    value: string;
    placeholder: string;
    name: string;
    label: string;
    rows: number;
    resize: TextareaResize;
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
        'bh-textarea': BhTextarea;
    }
}
//# sourceMappingURL=bh-textarea.d.ts.map