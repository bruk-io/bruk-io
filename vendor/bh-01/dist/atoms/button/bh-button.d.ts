import { BaseElement } from '../../primitives/base-element.js';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
/**
 * A button component with multiple variants and sizes.
 *
 * @slot - Button label text
 * @slot prefix - Content before the label (e.g. `<bh-icon>`)
 * @slot suffix - Content after the label (e.g. `<bh-icon>`)
 *
 * @csspart button - The native `<button>` element
 *
 * @cssprop [--bh-button-bg] - Button background color
 * @cssprop [--bh-button-color] - Button text color
 * @cssprop [--bh-button-border=transparent] - Button border color
 * @cssprop [--bh-button-radius=var(--bh-radius-md)] - Button border radius
 *
 * @fires bh-click - Fired on click. `detail: { originalEvent: MouseEvent }`
 */
export declare class BhButton extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    variant: ButtonVariant;
    size: ButtonSize;
    disabled: boolean;
    iconOnly: boolean;
    label: string;
    type: 'button' | 'submit' | 'reset';
    render(): import("lit-html").TemplateResult<1>;
    private _handleClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-button': BhButton;
    }
}
//# sourceMappingURL=bh-button.d.ts.map