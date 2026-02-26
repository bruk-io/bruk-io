import { BaseElement } from '../../primitives/base-element.js';
export type AvatarSize = 'sm' | 'md' | 'lg';
/**
 * A user/entity avatar with image, initials fallback, and generic icon fallback.
 *
 * Fallback order: image (src) -> initials -> generic user icon.
 *
 * @csspart image - The `<img>` element (when src is used)
 * @csspart initials - The initials text container
 *
 * @cssprop [--bh-avatar-size] - Avatar width and height (overrides size prop)
 * @cssprop [--bh-avatar-bg=var(--bh-color-secondary)] - Background color for initials/fallback
 * @cssprop [--bh-avatar-color=var(--bh-color-secondary-text)] - Text/icon color
 */
export declare class BhAvatar extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    size: AvatarSize;
    src: string;
    alt: string;
    initials: string;
    private _imgFailed;
    render(): import("lit-html").TemplateResult<1>;
    private _onImgError;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-avatar': BhAvatar;
    }
}
//# sourceMappingURL=bh-avatar.d.ts.map