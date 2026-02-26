import { BaseElement } from '../../primitives/base-element.js';
export interface TerminalHint {
    key: string;
    label: string;
}
/**
 * A bottom hint strip for the terminal showing keyboard shortcuts.
 *
 * @csspart bar - The outer bar container
 *
 * @cssprop [--bh-color-surface-recessed] - Bar background color
 * @cssprop [--bh-color-border] - Top border color
 * @cssprop [--bh-color-text-tertiary] - Hint label text color
 * @cssprop [--bh-color-primary] - Key highlight color
 * @cssprop [--bh-font-mono] - Monospace font family
 */
export declare class BhTerminalHintBar extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    hints: TerminalHint[];
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-terminal-hint-bar': BhTerminalHintBar;
    }
}
//# sourceMappingURL=bh-terminal-hint-bar.d.ts.map