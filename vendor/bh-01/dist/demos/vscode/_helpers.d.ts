import { LitElement, type TemplateResult } from 'lit';
import '../../atoms/badge/bh-badge.js';
import '../../atoms/button/bh-button.js';
import '../../atoms/divider/bh-divider.js';
import '../../atoms/icon/bh-icon.js';
import '../../atoms/input/bh-input.js';
import '../../atoms/led/bh-led.js';
import '../../atoms/text/bh-text.js';
import '../../atoms/slider/bh-slider.js';
import '../../molecules/accordion/bh-accordion.js';
import '../../molecules/card/bh-card.js';
import '../../molecules/panel-header/bh-panel-header.js';
import '../../molecules/toolbar/bh-toolbar.js';
import '../../organisms/shell/bh-app-shell.js';
import '../../organisms/shell/bh-activity-bar.js';
import '../../organisms/shell/bh-activity-item.js';
import '../../organisms/shell/bh-sidebar-panel.js';
import '../../organisms/shell/bh-status-bar.js';
import '../../organisms/tabs/bh-tab-bar.js';
import '../../organisms/tabs/bh-tab.js';
import '../../organisms/tabs/bh-tab-panel.js';
import '../../organisms/tabs/bh-tabs.js';
import '../../organisms/tree/bh-tree.js';
import '../../organisms/tree/bh-tree-item.js';
import '../../layout/flex/stack/bh-stack.js';
import '../../layout/flex/cluster/bh-cluster.js';
import '../../layout/flex/repel/bh-repel.js';
type PanelId = 'explorer' | 'search' | 'git' | 'extensions' | '';
export declare class BhVscodeDemo extends LitElement {
    protected createRenderRoot(): this;
    protected _panel: PanelId;
    protected _activeTab: string;
    protected _statusError: boolean;
    protected _statusMessage: string;
    private get _sidebarOpen();
    render(): TemplateResult<1>;
    firstUpdated(): void;
    private _onActivity;
}
export declare class BhVscodeDemoError extends BhVscodeDemo {
    protected createRenderRoot(): this;
    firstUpdated(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-vscode-demo': BhVscodeDemo;
        'bh-vscode-demo-error': BhVscodeDemoError;
    }
}
export declare const vsStyles: TemplateResult<1>;
export declare function fullscreenDecorator(story: () => unknown, context: {
    globals: {
        theme?: string;
    };
}): TemplateResult;
export {};
//# sourceMappingURL=_helpers.d.ts.map