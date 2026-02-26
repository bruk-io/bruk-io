import { BaseElement } from '../../primitives/base-element.js';
/**
 * A CSS Grid application shell with named areas: activity, sidebar, main, status.
 *
 * @slot activity - The activity bar area (left icon strip)
 * @slot sidebar - The sidebar area (collapsible panel)
 * @slot - The main content area
 * @slot status - The status bar area (bottom strip)
 *
 * @csspart grid - The grid container
 *
 * @cssprop [--bh-shell-activity-width=48px] - Activity bar column width
 * @cssprop [--bh-shell-sidebar-width=0px] - Sidebar column width (0 when collapsed)
 * @cssprop [--bh-shell-status-height=24px] - Status bar row height
 * @cssprop [--bh-shell-bg=var(--bh-color-bg)] - Shell background color
 */
export declare class BhAppShell extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    sidebarOpen: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-app-shell': BhAppShell;
    }
}
//# sourceMappingURL=bh-app-shell.d.ts.map