import { AsyncDirective } from 'lit/async-directive.js';
import { type PartInfo } from 'lit/directive.js';
import { noChange } from 'lit';
export type PixelTransition = 'step' | 'sweep';
export interface AnimatePixelsOptions {
    transition?: PixelTransition;
    fps?: number;
    cols?: number;
}
/**
 * Directive that manages visual transitions between pixel grid states.
 *
 * Used in property bindings: `.data=${animatePixels(grid, opts)}`
 *
 * - **step**: Pass-through with fps throttle. The pixel-display CSS transition
 *   smooths individual pixel changes already.
 * - **sweep**: Left-to-right column reveal over ~0.3s. Produces intermediate
 *   frames via rAF until the sweep completes.
 */
declare class AnimatePixelsDirective extends AsyncDirective {
    private _current?;
    private _target?;
    private _fps;
    private _cols;
    private _sweepCursor;
    private _sweepSpeed;
    private _prev?;
    private _rafId;
    private _pending;
    private _stepRafId;
    constructor(partInfo: PartInfo);
    render(grid: Uint8Array, opts?: AnimatePixelsOptions): Uint8Array | typeof noChange;
    private _handleStep;
    private _handleSweep;
    private _tickSweep;
    private _cancelSweep;
    protected disconnected(): void;
    protected reconnected(): void;
}
export declare const animatePixels: (grid: Uint8Array<ArrayBufferLike>, opts?: AnimatePixelsOptions | undefined) => import("lit-html/directive.js").DirectiveResult<typeof AnimatePixelsDirective>;
export type { AnimatePixelsDirective };
//# sourceMappingURL=animate-pixels.d.ts.map