import { BaseElement } from '../../primitives/base-element.js';
export type TextVariant = 'body' | 'heading' | 'small' | 'code';
/**
 * A text component for consistent typography across variants.
 *
 * @slot - Text content
 *
 * @csspart text - The inner `<span>` element
 */
export declare class BhText extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    variant: TextVariant;
    truncate: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-text': BhText;
    }
}
//# sourceMappingURL=bh-text.d.ts.map