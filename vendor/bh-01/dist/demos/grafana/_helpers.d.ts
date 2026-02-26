import { type TemplateResult } from 'lit';
import '../../atoms/avatar/bh-avatar.js';
import '../../atoms/badge/bh-badge.js';
import '../../atoms/button/bh-button.js';
import '../../atoms/divider/bh-divider.js';
import '../../atoms/icon/bh-icon.js';
import '../../atoms/input/bh-input.js';
import '../../atoms/led/bh-led.js';
import '../../atoms/progress/bh-progress.js';
import '../../atoms/select/bh-select.js';
import '../../atoms/text/bh-text.js';
import '../../molecules/card/bh-card.js';
import '../../molecules/chip/bh-chip.js';
import '../../molecules/nav-item/bh-nav-item.js';
import '../../molecules/pixel-panel/bh-pixel-panel.js';
import '../../molecules/section-header/bh-section-header.js';
import '../../molecules/table/bh-table.js';
import '../../organisms/data-table/bh-data-table.js';
import '../../layout/flex/stack/bh-stack.js';
import '../../layout/flex/cluster/bh-cluster.js';
import '../../layout/flex/repel/bh-repel.js';
import '../../layout/flex/center/bh-center.js';
import '../../layout/flex/reel/bh-reel.js';
import '../../layout/flex/cover/bh-cover.js';
import '../../layout/grid/grid/bh-grid.js';
import '../../layout/grid/split/bh-split.js';
import '../../layout/grid/switcher/bh-switcher.js';
export declare const timeRangeOptions: {
    value: string;
    label: string;
}[];
export declare const dashboardList: {
    name: string;
    folder: string;
    stars: number;
    uid: string;
}[];
export declare const k8sNodes: {
    name: string;
    status: string;
    role: string;
    cpu: string;
    memory: string;
    pods: string;
}[];
export declare const alertRules: {
    name: string;
    state: string;
    severity: string;
    instance: string;
    duration: string;
    value: string;
}[];
export declare const services: ({
    name: string;
    status: "success";
} | {
    name: string;
    status: "warning";
})[];
export declare function renderSidebar(activeItem: string): TemplateResult;
export declare function renderTopBar(breadcrumbs: string[]): TemplateResult;
export declare function renderAppShell(activeNav: string, breadcrumbs: string[], content: TemplateResult): TemplateResult;
export declare function renderStatPanel(label: string, value: string, unit?: string): TemplateResult;
export declare function renderPanel(title: string, body: TemplateResult): TemplateResult;
export declare function renderAlertCard(content: TemplateResult): TemplateResult;
export declare function fullscreenDecorator(story: () => unknown, context: {
    globals: {
        theme?: string;
    };
}): TemplateResult;
//# sourceMappingURL=_helpers.d.ts.map