import { BaseElement } from '../../primitives/base-element.js';
import '../../atoms/icon/bh-icon.js';
/**
 * A wrapper for collapsible accordion items.
 * Set `multiple` to allow more than one item open at a time.
 *
 * @slot - bh-accordion-item elements
 */
export declare class BhAccordion extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    multiple: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleItemToggle;
    render(): import("lit-html").TemplateResult<1>;
}
/**
 * A single collapsible section within a bh-accordion.
 *
 * @slot header - Custom header content (replaces default label text)
 * @slot - Content revealed when open
 *
 * @csspart header - The clickable header row
 * @csspart content - The collapsible content wrapper
 * @csspart chevron - The chevron indicator
 *
 * @cssprop [--bh-accordion-border=var(--bh-color-border)] - Border color
 *
 * @fires bh-toggle - Fired when item is opened or closed. `detail: { open: boolean, label: string }`
 */
export declare class BhAccordionItem extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    label: string;
    open: boolean;
    render(): import("lit-html").TemplateResult<1>;
    private _toggle;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-accordion': BhAccordion;
        'bh-accordion-item': BhAccordionItem;
    }
}
//# sourceMappingURL=bh-accordion.d.ts.map