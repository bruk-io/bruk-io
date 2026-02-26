import { BaseElement } from '../../primitives/base-element.js';
import '../../atoms/icon/bh-icon.js';
export type ChipVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export type ChipSize = 'sm' | 'md';
/**
 * An interactive tag with optional dismiss button.
 *
 * @slot - Chip label text
 * @slot prefix - Content before the label (e.g. icon)
 *
 * @csspart chip - The outer `<button>` element
 * @csspart dismiss - The dismiss/remove button
 *
 * @cssprop [--bh-chip-bg] - Chip background color
 * @cssprop [--bh-chip-color] - Chip text color
 * @cssprop [--bh-chip-radius=var(--bh-radius-full)] - Chip border radius
 *
 * @fires bh-click - Fired on chip click. `detail: { originalEvent: MouseEvent }`
 * @fires bh-dismiss - Fired when dismiss button is clicked. `detail: {}`
 */
export declare class BhChip extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    variant: ChipVariant;
    size: ChipSize;
    dismissible: boolean;
    selected: boolean;
    disabled: boolean;
    render(): import("lit-html").TemplateResult<1>;
    private _handleClick;
    private _handleDismiss;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-chip': BhChip;
    }
}
//# sourceMappingURL=bh-chip.d.ts.map