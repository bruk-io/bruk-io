import { BaseElement } from '../../primitives/base-element.js';
export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressVariant = 'default' | 'success' | 'warning' | 'danger';
/**
 * A linear progress bar for loading states and completion tracking.
 * Set `indeterminate` for unknown duration, or `value` for determinate progress.
 *
 * @csspart track - The background track
 * @csspart bar - The filled progress bar
 *
 * @cssprop [--bh-progress-color=var(--bh-color-primary)] - Bar fill color
 * @cssprop [--bh-progress-track=var(--bh-color-secondary)] - Track background color
 */
export declare class BhProgress extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    value: number;
    max: number;
    indeterminate: boolean;
    size: ProgressSize;
    variant: ProgressVariant;
    label: string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-progress': BhProgress;
    }
}
//# sourceMappingURL=bh-progress.d.ts.map