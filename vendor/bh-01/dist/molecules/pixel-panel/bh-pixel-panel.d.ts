import { type PropertyValues } from 'lit';
import { BaseElement } from '../../primitives/base-element.js';
import type { PixelDataType } from './pixel-data-controller.js';
import type { PixelTransition } from './animate-pixels.js';
import '../../atoms/pixel-display/bh-pixel-display.js';
import '../../molecules/card/bh-card.js';
/**
 * Panel chrome that wraps a pixel display with header (label + value) and footer.
 *
 * **Dual mode:**
 * - **Slot mode** (default): Set `cols` and `rows` to 0. Slot a `<bh-pixel-display>` yourself.
 * - **Managed mode**: Set `cols` and `rows` > 0. The panel renders its own display,
 *   handles buffering, grid generation, and visual transitions.
 *
 * @slot - Display area (slot mode only; hidden in managed mode)
 * @slot label - Custom label content (overrides `label` prop)
 * @slot value - Custom value content (overrides `value` prop)
 * @slot footer-start - Custom footer-start content (overrides `footerStart` prop)
 * @slot footer-end - Custom footer-end content (overrides `footerEnd` prop)
 *
 * @csspart panel - The outer panel container
 * @csspart header - The header row
 * @csspart label - The label text
 * @csspart value - The value text
 * @csspart body - The display area wrapper
 * @csspart footer - The footer row
 *
 * @cssprop [--bh-pixel-panel-bg=var(--bh-color-surface)] - Panel background
 * @cssprop [--bh-pixel-panel-border=var(--bh-color-border)] - Panel border color
 * @cssprop [--bh-pixel-panel-radius=var(--bh-radius-lg)] - Panel border-radius
 */
export declare class BhPixelPanel extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    label: string;
    value: string;
    footerStart: string;
    footerEnd: string;
    /** Grid width. Set > 0 along with `rows` to enable managed mode. */
    cols: number;
    /** Grid height. Set > 0 along with `cols` to enable managed mode. */
    rows: number;
    /** Data visualization type (managed mode). */
    type: PixelDataType;
    /** Visual transition mode (managed mode). */
    transition: PixelTransition;
    /** Max frames per second for the transition directive (managed mode). */
    fps: number;
    /** Palette index for lit pixels (managed mode). */
    color: number;
    /** Rolling buffer size. Defaults to `cols` when 0. */
    bufferSize: number;
    private _ctrl?;
    private get _managed();
    protected willUpdate(changed: PropertyValues): void;
    push(value: number): void;
    set(values: number[]): void;
    setText(text: string): void;
    setGrid(grid: Uint8Array): void;
    private _renderDisplay;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-pixel-panel': BhPixelPanel;
    }
}
//# sourceMappingURL=bh-pixel-panel.d.ts.map