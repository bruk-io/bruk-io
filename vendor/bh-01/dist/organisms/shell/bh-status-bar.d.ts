import { BaseElement } from '../../primitives/base-element.js';
/**
 * A fixed-height status bar with left/right slots.
 *
 * @slot - Left-aligned status content
 * @slot end - Right-aligned status content
 *
 * @csspart bar - The status bar container
 *
 * @cssprop [--bh-status-bar-bg=var(--bh-color-surface)] - Bar background
 * @cssprop [--bh-status-bar-border=var(--bh-color-border)] - Bar border color
 * @cssprop [--bh-status-bar-text=var(--bh-color-text-muted)] - Text color
 * @cssprop [--bh-status-bar-error-text=var(--bh-color-danger)] - Error text color
 */
export declare class BhStatusBar extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    message: string;
    error: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-status-bar': BhStatusBar;
    }
}
//# sourceMappingURL=bh-status-bar.d.ts.map