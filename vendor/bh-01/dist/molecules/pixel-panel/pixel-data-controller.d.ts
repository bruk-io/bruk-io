import type { ReactiveController, ReactiveControllerHost } from 'lit';
export type PixelDataType = 'sparkline' | 'bar' | 'text' | 'raw';
export interface PixelDataControllerOptions {
    cols: number;
    rows: number;
    type: PixelDataType;
    color?: number;
    bufferSize?: number;
}
/**
 * Manage pixel data buffering and grid generation.
 *
 * Push numeric values in; get a ready-to-render Uint8Array out.
 * Delegates to existing sparklineToGrid / barToGrid / textToGrid utilities.
 */
export declare class PixelDataController implements ReactiveController {
    private _host;
    private _cols;
    private _rows;
    private _type;
    private _color;
    private _bufferSize;
    private _buffer;
    private _text;
    private _grid;
    constructor(host: ReactiveControllerHost, opts: PixelDataControllerOptions);
    hostConnected(): void;
    hostDisconnected(): void;
    get grid(): Uint8Array;
    get latest(): number | undefined;
    get values(): readonly number[];
    push(value: number): void;
    set(values: number[]): void;
    setText(text: string): void;
    setGrid(grid: Uint8Array): void;
    resize(cols: number, rows: number): void;
    configure(opts: Partial<PixelDataControllerOptions>): void;
    private _regenerate;
    private _applyGrid;
}
//# sourceMappingURL=pixel-data-controller.d.ts.map