import { BaseElement } from '../../primitives/base-element.js';
export type CursorShape = 'block' | 'line' | 'underline';
/**
 * A blinking terminal cursor.
 *
 * @csspart cursor - The cursor element
 *
 * @cssprop [--bh-cursor-color=var(--bh-color-primary)] - Cursor color
 * @cssprop [--bh-cursor-width=8px] - Cursor width (block/underline)
 * @cssprop [--bh-cursor-height=1.2em] - Cursor height
 */
export declare class BhTerminalCursor extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    shape: CursorShape;
    blink: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-terminal-cursor': BhTerminalCursor;
    }
}
//# sourceMappingURL=bh-terminal-cursor.d.ts.map