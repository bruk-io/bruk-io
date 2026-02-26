import { css as p, nothing as m, html as n } from "lit";
import { property as s, state as f, customElement as b } from "lit/decorators.js";
import { BaseElement as c } from "../../primitives/base-element.js";
var g = Object.defineProperty, d = Object.getOwnPropertyDescriptor, e = (v, i, o, a) => {
  for (var r = a > 1 ? void 0 : a ? d(i, o) : i, h = v.length - 1, l; h >= 0; h--)
    (l = v[h]) && (r = (a ? l(i, o, r) : l(r)) || r);
  return a && r && g(i, o, r), r;
};
let t = class extends c {
  constructor() {
    super(...arguments), this.size = "md", this.src = "", this.alt = "", this.initials = "", this._imgFailed = !1;
  }
  render() {
    return this.src && !this._imgFailed ? n`
        <img
          part="image"
          src=${this.src}
          alt=${this.alt || m}
          @error=${this._onImgError}
        />
      ` : this.initials ? n`
        <span class="initials" part="initials" aria-label=${this.alt || m}>
          ${this.initials.slice(0, 2)}
        </span>
      ` : n`
      <svg viewBox="0 0 24 24" aria-label=${this.alt || "User"}>
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
      </svg>
    `;
  }
  _onImgError() {
    this._imgFailed = !0;
  }
};
t.styles = [
  ...[c.styles].flat(),
  p`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--bh-radius-full);
        overflow: hidden;
        background: var(--bh-avatar-bg, var(--bh-color-secondary));
        color: var(--bh-avatar-color, var(--bh-color-secondary-text));
        font-family: var(--bh-font-sans);
        font-weight: var(--bh-font-semibold);
        flex-shrink: 0;
      }

      :host([size='sm']) {
        width: var(--bh-avatar-size, 2rem);
        height: var(--bh-avatar-size, 2rem);
        font-size: var(--bh-text-xs);
      }

      :host,
      :host([size='md']) {
        width: var(--bh-avatar-size, 2.5rem);
        height: var(--bh-avatar-size, 2.5rem);
        font-size: var(--bh-text-sm);
      }

      :host([size='lg']) {
        width: var(--bh-avatar-size, 3rem);
        height: var(--bh-avatar-size, 3rem);
        font-size: var(--bh-text-base);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .initials {
        line-height: var(--bh-leading-none);
        text-transform: uppercase;
        user-select: none;
      }

      svg {
        width: 60%;
        height: 60%;
        fill: currentColor;
      }
    `
];
e([
  s({ reflect: !0 })
], t.prototype, "size", 2);
e([
  s()
], t.prototype, "src", 2);
e([
  s()
], t.prototype, "alt", 2);
e([
  s()
], t.prototype, "initials", 2);
e([
  f()
], t.prototype, "_imgFailed", 2);
t = e([
  b("bh-avatar")
], t);
export {
  t as BhAvatar
};
//# sourceMappingURL=bh-avatar.js.map
