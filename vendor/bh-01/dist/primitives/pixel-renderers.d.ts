/**
 * Pixel grid rendering utilities.
 *
 * All functions produce a flat `Uint8Array` of length `cols * rows` (row-major).
 * Each byte is a palette index: 0 = off, 1 = primary, 2 = success, 3 = warning, 4 = danger.
 * Pixel at (col, row) = `data[row * cols + col]`.
 */
/**
 * Render a right-aligned sparkline chart.
 *
 * Values are normalized to the 0–1 range based on the max value in the array.
 * The most recent value appears at the rightmost column.
 *
 * @param values - Numeric data points
 * @param cols - Grid width
 * @param rows - Grid height
 * @param color - Palette index for lit pixels (default 1)
 */
export declare function sparklineToGrid(values: number[], cols: number, rows: number, color?: number): Uint8Array;
/**
 * Render a horizontal fill bar.
 *
 * Fills pixels from left to right based on the percentage.
 * The bar is vertically centered and 1 pixel tall.
 *
 * @param percent - Fill percentage (0–100)
 * @param cols - Grid width
 * @param rows - Grid height
 * @param color - Palette index for lit pixels (default 1)
 */
export declare function barToGrid(percent: number, cols: number, rows: number, color?: number): Uint8Array;
/**
 * Layer multiple grids together. Non-zero values in overlays overwrite the base.
 *
 * All grids must have the same length. If lengths differ, the shorter grid is used
 * up to its length (excess in base is preserved).
 *
 * @param base - The bottom-layer grid
 * @param overlays - Additional grids to layer on top (in order)
 * @returns A new `Uint8Array` with the composited result
 */
export declare function compositeGrids(base: Uint8Array, ...overlays: Uint8Array[]): Uint8Array;
//# sourceMappingURL=pixel-renderers.d.ts.map