import { BaseElement } from '../../primitives/base-element.js';
/**
 * A toggle switch for binary on/off settings. Unlike checkbox, a switch
 * implies an immediate effect rather than a form submission.
 *
 * @slot - Label text displayed next to the switch
 *
 * @csspart track - The switch track/rail
 * @csspart thumb - The sliding thumb indicator
 * @csspart label - The label text container
 *
 * @cssprop [--bh-switch-width=2.5rem] - Switch track width
 * @cssprop [--bh-switch-height=1.5rem] - Switch track height
 *
 * @fires bh-change - Fired when toggled. `detail: { checked: boolean }`
 */
export declare class BhSwitch extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    checked: boolean;
    disabled: boolean;
    label: string;
    render(): import("lit-html").TemplateResult<1>;
    private _handleChange;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-switch': BhSwitch;
    }
}
//# sourceMappingURL=bh-switch.d.ts.map