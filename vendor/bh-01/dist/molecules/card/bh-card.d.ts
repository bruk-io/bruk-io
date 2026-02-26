import { BaseElement } from '../../primitives/base-element.js';
export type CardVariant = 'default' | 'outlined' | 'flat';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
/**
 * An elevated surface container with optional header and footer.
 *
 * @slot - Card body content
 * @slot header - Content rendered in the start (left) of the card header
 * @slot header-actions - Content rendered in the end (right) of the card header
 * @slot footer - Content rendered in the card footer area
 *
 * @csspart card - The outer card container
 * @csspart header - The header wrapper (only rendered when header or header-actions has content)
 * @csspart body - The body wrapper
 * @csspart footer - The footer wrapper (only rendered when slot has content)
 *
 * @cssprop [--bh-card-bg=var(--bh-color-surface-raised)] - Card background color
 * @cssprop [--bh-card-border=var(--bh-color-border)] - Card border color
 * @cssprop [--bh-card-radius=var(--bh-radius-lg)] - Card border radius
 * @cssprop [--bh-card-shadow=var(--bh-shadow-md)] - Card box shadow
 * @cssprop [--bh-card-accent-color=var(--bh-color-border)] - Corner accent color
 * @cssprop [--bh-card-accent-hover-color=var(--bh-color-primary)] - Corner accent hover color
 * @cssprop [--bh-card-accent-glow=var(--bh-color-primary-glow)] - Corner accent glow color on hover
 */
export declare class BhCard extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    variant: CardVariant;
    padding: CardPadding;
    cornerAccents: boolean;
    private _hasHeader;
    private _hasHeaderActions;
    private _hasFooter;
    private get _showHeader();
    render(): import("lit-html").TemplateResult<1>;
    private _onHeaderSlotChange;
    private _onHeaderActionsSlotChange;
    private _onFooterSlotChange;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-card': BhCard;
    }
}
//# sourceMappingURL=bh-card.d.ts.map