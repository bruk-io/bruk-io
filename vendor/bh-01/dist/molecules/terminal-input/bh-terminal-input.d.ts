import { BaseElement } from '../../primitives/base-element.js';
/**
 * A terminal input area with a styled prompt, text input, command history,
 * and line-editing shortcuts.
 *
 * @csspart input-area - The outer input container
 * @csspart prompt - The prompt character element
 * @csspart input - The text input element
 *
 * @cssprop [--bh-color-primary] - Accent color for cursor, prompt arrow, and user
 * @cssprop [--bh-color-text] - Text color
 * @cssprop [--bh-color-text-tertiary] - Dim text for prompt decorations
 * @cssprop [--bh-color-bg] - Background color
 * @cssprop [--bh-font-mono] - Monospace font family
 * @cssprop [--bh-color-success] - Path color (falls back to text color)
 *
 * @fires bh-command - When Enter is pressed with non-empty input. Detail is the command string.
 * @fires bh-tab-complete - When Tab is pressed. Detail is the current input value.
 * @fires bh-interrupt - When Ctrl+C is pressed.
 * @fires bh-clear - When Ctrl+L is pressed.
 */
export declare class BhTerminalInput extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    /** The prompt character(s) displayed before input. */
    prompt: string;
    /** Optional user/host shown in prompt (e.g. 'bh-01'). */
    promptUser: string;
    /** Optional path shown in prompt. */
    promptPath: string;
    /** Disables input when terminal is in RUNNING state. */
    disabled: boolean;
    private _history;
    private _historyIndex;
    private _tempLine;
    private _input;
    /** Focus the internal input element. */
    focus(): void;
    private _onKeydown;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-terminal-input': BhTerminalInput;
    }
}
//# sourceMappingURL=bh-terminal-input.d.ts.map