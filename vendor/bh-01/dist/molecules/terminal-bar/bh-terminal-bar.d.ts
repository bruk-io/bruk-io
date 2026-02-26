import { BaseElement } from '../../primitives/base-element.js';
import '../../atoms/led/bh-led.js';
import type { LedColor } from '../../atoms/led/bh-led.js';
export type TerminalBarStatusColor = LedColor;
/**
 * A terminal title bar with window dots, a title, and a status indicator.
 *
 * @csspart bar - The bar container
 * @csspart title - The title text
 * @csspart status - The status indicator area
 *
 * @cssprop [--bh-terminal-bar-height=32px] - Bar height
 * @cssprop [--bh-terminal-bar-bg=var(--bh-color-surface-recessed)] - Bar background
 */
export declare class BhTerminalBar extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    title: string;
    status: string;
    statusColor: TerminalBarStatusColor;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-terminal-bar': BhTerminalBar;
    }
}
//# sourceMappingURL=bh-terminal-bar.d.ts.map