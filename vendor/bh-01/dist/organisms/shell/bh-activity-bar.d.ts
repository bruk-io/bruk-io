import { BaseElement } from '../../primitives/base-element.js';
import './bh-activity-item.js';
/**
 * A vertical activity bar with icon items, similar to VS Code.
 *
 * @slot - Activity items (`<bh-activity-item>`)
 *
 * @csspart container - The items container
 *
 * @cssprop [--bh-activity-bar-width=48px] - Bar width
 * @cssprop [--bh-activity-bar-bg=var(--bh-color-surface-recessed)] - Background color
 * @cssprop [--bh-activity-bar-border=var(--bh-color-border)] - Right border color
 *
 * @fires bh-activity-change - Fired when the active item changes. `detail: { id: string, label: string }`
 */
export declare class BhActivityBar extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    private _activeId;
    render(): import("lit-html").TemplateResult<1>;
    get activeId(): string;
    setActive(id: string): void;
    private _handleItemClick;
    private _updateItems;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-activity-bar': BhActivityBar;
    }
}
//# sourceMappingURL=bh-activity-bar.d.ts.map