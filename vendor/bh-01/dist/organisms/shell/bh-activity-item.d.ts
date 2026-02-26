import { BaseElement } from '../../primitives/base-element.js';
/**
 * An individual item in the activity bar.
 *
 * @slot - Icon content (e.g. `<bh-icon>`)
 *
 * @csspart button - The native `<button>` element
 *
 * @cssprop [--bh-activity-item-size=40px] - Item width and height
 * @cssprop [--bh-activity-item-active-border=var(--bh-color-primary)] - Active indicator color
 */
export declare class BhActivityItem extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    active: boolean;
    label: string;
    itemId: string;
    render(): import("lit-html").TemplateResult<1>;
    private _handleClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-activity-item': BhActivityItem;
    }
}
//# sourceMappingURL=bh-activity-item.d.ts.map