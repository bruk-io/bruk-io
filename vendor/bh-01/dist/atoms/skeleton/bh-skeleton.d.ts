import { BaseElement } from '../../primitives/base-element.js';
export type SkeletonVariant = 'text' | 'circle' | 'rect';
/**
 * A content placeholder that shows a pulsing animation during loading.
 *
 * @csspart skeleton - The skeleton element
 *
 * @cssprop [--bh-skeleton-color=var(--bh-color-secondary)] - Skeleton base color
 * @cssprop [--bh-skeleton-highlight] - Pulse highlight color
 */
export declare class BhSkeleton extends BaseElement {
    static styles: (import("lit").CSSResultOrNative | import("lit").CSSResultArray)[];
    variant: SkeletonVariant;
    width: string;
    height: string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bh-skeleton': BhSkeleton;
    }
}
//# sourceMappingURL=bh-skeleton.d.ts.map