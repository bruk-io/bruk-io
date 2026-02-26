import { css as b, nothing as h, html as n } from "lit";
import { property as d, state as m, customElement as u } from "lit/decorators.js";
import { repeat as v } from "lit/directives/repeat.js";
import { classMap as x } from "lit/directives/class-map.js";
import { BaseElement as p } from "../../primitives/base-element.js";
import "../../atoms/icon/bh-icon.js";
var f = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, a = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? _(t, s) : t, c = e.length - 1, l; c >= 0; c--)
    (l = e[c]) && (r = (i ? l(t, s, r) : l(r)) || r);
  return i && r && f(t, s, r), r;
};
let o = class extends p {
  constructor() {
    super(...arguments), this.open = !1, this.x = 0, this.y = 0, this.items = [], this._selectedIndex = -1;
  }
  get _actionableItems() {
    return this.items.filter((e) => !e.separator && !e.disabled);
  }
  show(e, t, s) {
    s && (this.items = s), this.x = e, this.y = t, this.open = !0, this._selectedIndex = -1;
  }
  hide() {
    this.open = !1, this._selectedIndex = -1;
  }
  _onBackdropClick() {
    this.hide();
  }
  _onKeydown(e) {
    const t = this._actionableItems;
    switch (e.key) {
      case "Escape":
        this.hide();
        break;
      case "ArrowDown": {
        e.preventDefault();
        const s = this._selectedIndex + 1;
        s < t.length && (this._selectedIndex = s);
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const s = this._selectedIndex - 1;
        s >= 0 && (this._selectedIndex = s);
        break;
      }
      case "Enter": {
        e.preventDefault();
        const s = t[this._selectedIndex];
        s && this._selectItem(s);
        break;
      }
    }
  }
  _selectItem(e) {
    e.disabled || (this.hide(), this.dispatchEvent(
      new CustomEvent("bh-select", {
        bubbles: !0,
        composed: !0,
        detail: { id: e.id, label: e.label }
      })
    ));
  }
  _isSelected(e) {
    return this._actionableItems[this._selectedIndex] === e;
  }
  render() {
    if (!this.open) return h;
    const t = this._actionableItems[this._selectedIndex], s = t ? `ctx-item-${this.items.indexOf(t)}` : void 0;
    return n`
      <div class="backdrop" @click=${this._onBackdropClick}></div>
      <div
        class="menu"
        role="menu"
        tabindex="-1"
        aria-activedescendant=${s ?? h}
        style="left: ${this.x}px; top: ${this.y}px"
        @keydown=${this._onKeydown}
      >
        ${v(
      this.items,
      (i) => i.id,
      (i, r) => i.separator ? n`<div class="separator" role="separator"></div>` : n`
                  <div
                    id="ctx-item-${r}"
                    class=${x({
        item: !0,
        disabled: !!i.disabled
      })}
                    role="menuitem"
                    aria-disabled=${i.disabled ? "true" : "false"}
                    aria-selected=${String(this._isSelected(i))}
                    @click=${() => this._selectItem(i)}
                  >
                    ${i.icon ? n`<bh-icon name=${i.icon} size="sm" aria-hidden="true"></bh-icon>` : h}
                    ${i.label}
                  </div>
                `
    )}
      </div>
    `;
  }
  updated() {
    var e;
    if (this.open) {
      const t = (e = this.shadowRoot) == null ? void 0 : e.querySelector(".menu");
      t == null || t.focus();
    }
  }
};
o.styles = [
  ...[p.styles].flat(),
  b`
      :host {
        display: none;
        position: fixed;
        inset: 0;
        z-index: var(--bh-z-popover);
      }

      :host([open]) {
        display: block;
      }

      .backdrop {
        position: fixed;
        inset: 0;
      }

      .menu {
        position: fixed;
        min-width: var(--bh-context-menu-min-width, 160px);
        background: var(--bh-color-surface-raised);
        border: var(--bh-border-1) solid var(--bh-color-border);
        border-radius: var(--bh-radius-md);
        box-shadow: var(--bh-shadow-md);
        padding: var(--bh-spacing-1) 0;
        overflow: hidden;
      }

      .item {
        display: flex;
        align-items: center;
        gap: var(--bh-spacing-2);
        padding: var(--bh-spacing-1-5) var(--bh-spacing-3);
        cursor: pointer;
        font-size: var(--bh-text-sm);
        color: var(--bh-color-text);
        transition: background var(--bh-transition-fast);
      }

      .item:hover,
      .item[aria-selected='true'] {
        background: var(--bh-color-surface-overlay);
      }

      .item.disabled {
        color: var(--bh-color-text-muted);
        cursor: default;
        pointer-events: none;
      }

      .separator {
        height: 1px;
        margin: var(--bh-spacing-1) 0;
        background: var(--bh-color-border-muted);
      }
    `
];
a([
  d({ type: Boolean, reflect: !0 })
], o.prototype, "open", 2);
a([
  d({ type: Number })
], o.prototype, "x", 2);
a([
  d({ type: Number })
], o.prototype, "y", 2);
a([
  d({ type: Array })
], o.prototype, "items", 2);
a([
  m()
], o.prototype, "_selectedIndex", 2);
o = a([
  u("bh-context-menu")
], o);
export {
  o as BhContextMenu
};
//# sourceMappingURL=bh-context-menu.js.map
