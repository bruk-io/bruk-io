/**
 * Terminal text parser — converts color tag syntax into HTML spans
 * using bh-01 semantic color tokens.
 *
 * Syntax: {primary}colored text{/}
 */
/** Maps tag names to CSS class names */
export declare const TERMINAL_TAG_MAP: Record<string, string>;
/**
 * Escape HTML entities while preserving curly braces used for tag syntax.
 */
export declare function escapeTerminalHtml(text: string): string;
/**
 * Convert {tag}text{/} syntax to <span class="...">text</span>.
 * Unknown tags are left as literal text. Unclosed tags are still
 * converted to spans (the browser will close them implicitly).
 */
export declare function parseColorTags(text: string): string;
/**
 * Detect http/https URLs in text and wrap them in anchor tags.
 */
export declare function linkifyUrls(html: string): string;
/**
 * Full rendering pipeline: escape HTML → parse color tags → linkify URLs.
 */
export declare function renderTerminalText(text: string): string;
//# sourceMappingURL=terminal-parser.d.ts.map