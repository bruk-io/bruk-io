import { css as p, nothing as v, html as d } from "lit";
import { property as s, state as b, customElement as f } from "lit/decorators.js";
import { BaseElement as c } from "../../primitives/base-element.js";
import "../../atoms/icon/bh-icon.js";
var g = Object.defineProperty, m = Object.getOwnPropertyDescriptor, r = (e, n, l, i) => {
  for (var a = i > 1 ? void 0 : i ? m(n, l) : n, o = e.length - 1, h; o >= 0; o--)
    (h = e[o]) && (a = (i ? h(n, l, a) : h(a)) || a);
  return i && a && g(n, l, a), a;
};
let t = class extends c {
  constructor() {
    super(...arguments), this.value = "", this.label = "", this.selected = !1, this.expanded = !1, this.indent = 0, this.roving = !1, this._hasChildren = !1;
  }
  render() {
    return d`
      <div
        class="row"
        part="row"
        role="treeitem"
        aria-level=${this.indent + 1}
        aria-expanded=${this._hasChildren ? String(this.expanded) : v}
        aria-selected=${String(this.selected)}
        tabindex=${this.selected || this.roving ? "0" : "-1"}
        style="--indent-level: ${this.indent}"
        @click=${this._handleClick}
        @keydown=${this._handleKeydown}
      >
        ${this._hasChildren ? d`<bh-icon class="chevron" part="chevron" name="chevron-right" size="sm" aria-hidden="true"></bh-icon>` : d`<span class="chevron-placeholder"></span>`}
        <slot name="icon"></slot>
        <span class="label" part="label">${this.label}</span>
        <span class="end"><slot name="end"></slot></span>
      </div>
      <div class="children" role="group">
        <slot name="children" @slotchange=${this._onChildrenSlotChange}></slot>
      </div>
    `;
  }
  _onChildrenSlotChange(e) {
    const n = e.target;
    this._hasChildren = n.assignedElements().length > 0;
  }
  _handleClick() {
    this._hasChildren && (this.expanded = !this.expanded), this.dispatchEvent(
      new CustomEvent("bh-tree-item-click", {
        bubbles: !0,
        composed: !0,
        detail: { value: this.value, label: this.label }
      })
    );
  }
  _handleKeydown(e) {
    e.key === "Enter" || e.key === " " ? (e.preventDefault(), this._handleClick()) : e.key === "ArrowRight" && this._hasChildren && !this.expanded ? (e.preventDefault(), this.expanded = !0) : e.key === "ArrowLeft" && this.expanded && (e.preventDefault(), this.expanded = !1);
  }
};
t.styles = [
  ...[c.styles].flat(),
  p`
      :host {
        display: block;
      }

      .row {
        display: flex;
        align-items: center;
        gap: var(--bh-spacing-2);
        width: 100%;
        padding: var(--bh-spacing-1) var(--bh-spacing-2);
        padding-left: calc(var(--bh-spacing-4) + var(--indent-level) * var(--bh-spacing-4));
        border: none;
        border-left: var(--bh-border-2) solid transparent;
        border-radius: 0;
        background: none;
        color: var(--bh-color-text);
        font-family: var(--bh-font-sans);
        font-size: var(--bh-text-sm);
        line-height: var(--bh-leading-normal);
        text-align: left;
        cursor: pointer;
        transition: background var(--bh-transition-fast),
                    color var(--bh-transition-fast);
      }

      .row:hover {
        background: var(--bh-tree-item-hover-bg, var(--bh-color-secondary));
      }

      .row:focus-visible {
        outline: var(--bh-border-2) solid var(--bh-color-ring);
        outline-offset: -2px;
      }

      :host([selected]) .row {
        background: var(--bh-tree-item-selected-bg, var(--bh-color-surface-raised));
        color: var(--bh-tree-item-selected-color, var(--bh-color-primary));
        border-left-color: var(--bh-color-primary);
      }

      .chevron {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--bh-spacing-4);
        height: var(--bh-spacing-4);
        flex-shrink: 0;
        transition: transform var(--bh-transition-fast);
      }

      :host([expanded]) .chevron {
        transform: rotate(90deg);
      }

      .chevron-placeholder {
        width: var(--bh-spacing-4);
        height: var(--bh-spacing-4);
        flex-shrink: 0;
      }

      .label {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .end {
        margin-left: auto;
        flex-shrink: 0;
      }

      .children {
        display: none;
      }

      :host([expanded]) .children {
        display: block;
      }
    `
];
r([
  s()
], t.prototype, "value", 2);
r([
  s()
], t.prototype, "label", 2);
r([
  s({ type: Boolean, reflect: !0 })
], t.prototype, "selected", 2);
r([
  s({ type: Boolean, reflect: !0 })
], t.prototype, "expanded", 2);
r([
  s({ type: Number })
], t.prototype, "indent", 2);
r([
  s({ type: Boolean })
], t.prototype, "roving", 2);
r([
  b()
], t.prototype, "_hasChildren", 2);
t = r([
  f("bh-tree-item")
], t);
export {
  t as BhTreeItem
};
//# sourceMappingURL=bh-tree-item.js.map
