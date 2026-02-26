import { BaseElement } from '../../primitives/base-element.js';
export type SelectSize = 'sm' | 'md' | 'lg';
export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export interface SelectOptionGroup {
    label: string;
    options: SelectOption[];
}
/**
 * A styled native select dropdown. Uses a real `<select>` under the hood
 * for full accessibility and mobile support.
 *
 * Pass options via the `options` property (array of `{ value, label }` objects).
 * For grouped options, use `optionGroups`.
 *
 * @slot prefix - Content before the select (e.g. icon)
 *
 * @csspart wrapper - The outer container with border and background
 * @csspart select - The native `<select>` element
 *
 * @cssprop [--bh-select-bg=var(--bh-color-surface-raised)] - Select background
 * @cssprop [--bh-select-color=var(--bh-color-text)] - Select text color
 * @cssprop [--bh-select-border=var(--bh-color-border)] - Select border color
 * @cssprop [--bh-select-radius=var(--bh-radius-md)] - Select border radius
 *
 * @fires bh-change - Fired when selection changes. `detail: { value: string }`
 */
export declare class BhSelect extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    size: SelectSize;
    value: string;
    name: string;
    label: string;
    placeholder: string;
    options: SelectOption[];
    optionGroups: SelectOptionGroup[];
    disabled: boolean;
    required: boolean;
    error: boolean;
    render(): import("lit-html").TemplateResult<1>;
    private _handleChange;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-select': BhSelect;
    }
}
//# sourceMappingURL=bh-select.d.ts.map