import { css as p, html as c } from "lit";
import { property as a, customElement as b } from "lit/decorators.js";
import { BaseElement as m } from "../../primitives/base-element.js";
var d = Object.defineProperty, v = Object.getOwnPropertyDescriptor, t = (s, i, n, o) => {
  for (var e = o > 1 ? void 0 : o ? v(i, n) : i, h = s.length - 1, l; h >= 0; h--)
    (l = s[h]) && (e = (o ? l(i, n, e) : l(e)) || e);
  return o && e && d(i, n, e), e;
};
let r = class extends m {
  constructor() {
    super(...arguments), this.value = 0, this.max = 100, this.indeterminate = !1, this.size = "md", this.variant = "default", this.label = "Progress";
  }
  render() {
    const s = this.indeterminate ? void 0 : Math.min(100, Math.max(0, this.value / this.max * 100));
    return c`
      <div
        class="track"
        part="track"
        role="progressbar"
        aria-label=${this.label}
        aria-valuenow=${this.indeterminate ? "" : this.value}
        aria-valuemin="0"
        aria-valuemax=${this.max}
      >
        <div
          class="bar"
          part="bar"
          style=${this.indeterminate ? "" : `width: ${s}%`}
        ></div>
      </div>
    `;
  }
};
r.styles = [
  ...[m.styles].flat(),
  p`
      :host {
        display: block;
        width: 100%;
      }

      .track {
        width: 100%;
        border-radius: var(--bh-radius-full);
        background: var(--bh-progress-track, var(--bh-color-secondary));
        overflow: hidden;
      }

      :host([size='sm']) .track { height: 0.25rem; }
      .track, :host([size='md']) .track { height: 0.5rem; }
      :host([size='lg']) .track { height: 0.75rem; }

      .bar {
        height: 100%;
        border-radius: var(--bh-radius-full);
        background: var(--bh-progress-color, var(--bh-color-primary));
        transition: width var(--bh-transition-normal);
      }

      /* Variants */
      :host([variant='success']) .bar { --bh-progress-color: var(--bh-color-success); }
      :host([variant='warning']) .bar { --bh-progress-color: var(--bh-color-warning); }
      :host([variant='danger']) .bar { --bh-progress-color: var(--bh-color-danger); }

      /* Indeterminate */
      :host([indeterminate]) .bar {
        width: 40% !important;
        animation: indeterminate 1.5s var(--bh-ease-in-out) infinite;
      }

      @keyframes indeterminate {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(350%); }
      }
    `
];
t([
  a({ type: Number })
], r.prototype, "value", 2);
t([
  a({ type: Number })
], r.prototype, "max", 2);
t([
  a({ type: Boolean, reflect: !0 })
], r.prototype, "indeterminate", 2);
t([
  a({ reflect: !0 })
], r.prototype, "size", 2);
t([
  a({ reflect: !0 })
], r.prototype, "variant", 2);
t([
  a()
], r.prototype, "label", 2);
r = t([
  b("bh-progress")
], r);
export {
  r as BhProgress
};
//# sourceMappingURL=bh-progress.js.map
