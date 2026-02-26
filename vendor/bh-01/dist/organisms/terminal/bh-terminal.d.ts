import { BaseElement } from '../../primitives/base-element.js';
import type { TerminalAdapter, CommandHandler, TerminalMode, TerminalHint } from '../../primitives/terminal-types.js';
import '../../molecules/terminal-bar/bh-terminal-bar.js';
import '../../molecules/terminal-input/bh-terminal-input.js';
import '../../molecules/terminal-hint-bar/bh-terminal-hint-bar.js';
/**
 * A full terminal shell component that composes the terminal bar, output area,
 * input, and hint bar. Implements TerminalAdapter so command handlers can write
 * output, show errors, and control terminal state.
 *
 * Consumes a CommandHandler from Lit Context when available; otherwise
 * re-dispatches commands as `bh-command` events for the consumer to handle.
 *
 * @csspart terminal - The outer terminal container
 * @csspart output - The scrollable output area
 *
 * @cssprop [--bh-terminal-height=100%] - Terminal height
 * @cssprop [--bh-color-cod] - Terminal background
 * @cssprop [--bh-color-tundora] - Terminal border
 * @cssprop [--bh-color-swiss-coffee] - Default text color
 * @cssprop [--bh-font-mono] - Monospace font family
 *
 * @fires bh-command - Fired when no context handler is present. Detail is the raw command string.
 * @fires bh-tab-complete - Re-dispatched when no context handler provides completions.
 */
export declare class BhTerminal extends BaseElement implements TerminalAdapter {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    /** Title displayed in the terminal bar. */
    title: string;
    /** Status text shown in the terminal bar. */
    status: string;
    /** Color of the status LED indicator. */
    statusColor: string;
    /** Prompt character(s) displayed before input. */
    prompt: string;
    /** Optional user/host shown in the prompt. */
    promptUser: string;
    /** Optional path shown in the prompt. */
    promptPath: string;
    /** Maximum number of output lines before trimming. */
    maxLines: number;
    /** Auto-scroll to bottom on new output. */
    autoscroll: boolean;
    /** Keyboard shortcut hints shown in the bottom bar. */
    hints: TerminalHint[];
    /** Enable CRT scanline overlay effect. */
    scanlines: boolean;
    _handler?: CommandHandler;
    _mode: TerminalMode;
    _output: HTMLDivElement;
    _input: HTMLElement & {
        focus(): void;
    };
    /** Append text to the current (last) line. Create a line if none exist. */
    write(text: string): void;
    /** Append a complete line. Optionally tag it with an id for later replacement. */
    writeLine(text: string, options?: {
        id: string;
    }): void;
    /** Write a line styled as an error. */
    writeError(text: string): void;
    /** Update a previously written line identified by id. Falls back to writeLine. */
    replaceLine(id: string, text: string): void;
    /** Enter RUNNING state — disable input. */
    startCommand(): void;
    /** Return to IDLE state — re-enable and focus input. */
    endCommand(): void;
    /** Clear the scrollback buffer. */
    clear(): void;
    /** Focus the terminal input. */
    focus(): void;
    private _scrollToBottom;
    private _trimLines;
    /** Echo the user's command to the output area with prompt decoration. */
    private _echo;
    private _onCommand;
    private _onInterrupt;
    private _onTabComplete;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-terminal': BhTerminal;
    }
}
//# sourceMappingURL=bh-terminal.d.ts.map