import { BaseElement } from '../../primitives/base-element.js';
export type IconSize = 'sm' | 'md' | 'lg';
/**
 * An SVG icon component with a static registry for custom icons.
 *
 * Register custom icons via `BhIcon.register(name, svgPaths)`.
 * Ships with built-in icons: x, check, plus, minus, search,
 * chevron-down, chevron-up, chevron-left, chevron-right, menu.
 *
 * @csspart svg - The `<svg>` element
 *
 * @cssprop [--bh-icon-size=1.25em] - Icon width and height
 */
export declare class BhIcon extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    static register(name: string, svg: string): void;
    static getIcon(name: string): string | undefined;
    name: string;
    size: IconSize;
    label: string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-icon': BhIcon;
    }
}
//# sourceMappingURL=bh-icon.d.ts.map