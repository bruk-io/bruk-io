import { BaseElement } from '../../primitives/base-element.js';
/**
 * A checkbox input for boolean or multi-select choices.
 *
 * @slot - Label text displayed next to the checkbox
 *
 * @csspart checkbox - The visual checkbox indicator
 * @csspart label - The label text container
 *
 * @cssprop [--bh-checkbox-size=1.25rem] - Checkbox width and height
 * @cssprop [--bh-checkbox-radius=var(--bh-radius-sm)] - Checkbox border radius
 *
 * @fires bh-change - Fired when checked state changes. `detail: { checked: boolean }`
 */
export declare class BhCheckbox extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    checked: boolean;
    indeterminate: boolean;
    disabled: boolean;
    value: string;
    name: string;
    label: string;
    render(): import("lit-html").TemplateResult<1>;
    private _handleChange;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-checkbox': BhCheckbox;
    }
}
//# sourceMappingURL=bh-checkbox.d.ts.map