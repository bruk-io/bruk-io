import { nothing } from 'lit';
import { BaseElement } from '../../primitives/base-element.js';
export interface CommandPaletteItem {
    id: string;
    label: string;
    category?: string;
    keybinding?: string;
}
/**
 * A VSCode-style command palette overlay.
 *
 * @cssprop [--bh-command-palette-width=min(500px, 90vw)] - Palette width
 * @cssprop [--bh-command-palette-max-height=300px] - Max height for results list
 * @cssprop [--bh-command-palette-backdrop=var(--bh-color-overlay, rgba(0,0,0,0.4))] - Backdrop color
 *
 * @fires bh-execute - Fired when an item is selected. `detail: { id: string, label: string }`
 * @fires bh-open - Fired when the palette opens
 * @fires bh-close - Fired when the palette closes
 */
export declare class BhCommandPalette extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    open: boolean;
    placeholder: string;
    items: CommandPaletteItem[];
    private _query;
    private _selectedIndex;
    private get _filteredItems();
    private _fuzzyScore;
    toggle(): void;
    show(): void;
    close(): void;
    private _onInput;
    private _onKeydown;
    private _executeItem;
    private _onItemClick;
    protected render(): typeof nothing | import("lit-html").TemplateResult<1>;
    protected updated(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-command-palette': BhCommandPalette;
    }
}
//# sourceMappingURL=bh-command-palette.d.ts.map