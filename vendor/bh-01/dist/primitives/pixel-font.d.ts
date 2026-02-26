/**
 * 3×5 bitmap pixel font.
 *
 * Each glyph is 5 rows of 3-bit values (0–7), where set bits map to lit pixels.
 * Row 0 is the top. Bit 2 = left, bit 1 = center, bit 0 = right.
 *
 * Example: "A" = [0b010, 0b101, 0b111, 0b101, 0b101]
 */
/** Glyph lookup — uppercase A-Z, 0-9, space, and common symbols. */
export declare const PIXEL_FONT: Record<string, number[]>;
/**
 * Render text into a flat row-major pixel grid.
 *
 * Characters are laid out left-to-right with 1 column of spacing between glyphs.
 * Unknown characters are skipped. Text is uppercased automatically.
 *
 * @param text - The string to render
 * @param cols - Grid width in pixels
 * @param rows - Grid height in pixels (must be >= 5 for the font)
 * @param color - Palette index for lit pixels (default 1 = primary)
 * @returns Flat `Uint8Array` of length `cols * rows`
 */
export declare function textToGrid(text: string, cols: number, rows: number, color?: number): Uint8Array;
//# sourceMappingURL=pixel-font.d.ts.map