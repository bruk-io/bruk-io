import { BaseElement } from '../../primitives/base-element.js';
/**
 * A radio input for single-selection from a group. Group radios by giving them
 * the same `name` attribute.
 *
 * @slot - Label text displayed next to the radio
 *
 * @csspart radio - The visual radio indicator
 * @csspart label - The label text container
 *
 * @cssprop [--bh-radio-size=1.25rem] - Radio width and height
 *
 * @fires bh-change - Fired when selected. `detail: { checked: boolean, value: string }`
 */
export declare class BhRadio extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    checked: boolean;
    disabled: boolean;
    value: string;
    name: string;
    label: string;
    render(): import("lit-html").TemplateResult<1>;
    private _handleChange;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-radio': BhRadio;
    }
}
//# sourceMappingURL=bh-radio.d.ts.map