import { css as m, nothing as d, html as c } from "lit";
import { property as p, state as b, customElement as v } from "lit/decorators.js";
import { repeat as f } from "lit/directives/repeat.js";
import { BaseElement as u } from "../../primitives/base-element.js";
var g = Object.defineProperty, x = Object.getOwnPropertyDescriptor, l = (e, t, r, o) => {
  for (var s = o > 1 ? void 0 : o ? x(t, r) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (s = (o ? n(t, r, s) : n(s)) || s);
  return o && s && g(t, r, s), s;
};
let i = class extends u {
  constructor() {
    super(...arguments), this.open = !1, this.placeholder = "Type a command...", this.items = [], this._query = "", this._selectedIndex = 0;
  }
  get _filteredItems() {
    return this._query ? this.items.map((e) => ({
      item: e,
      score: this._fuzzyScore(e.label, this._query)
    })).filter((e) => e.score > 0).sort((e, t) => t.score - e.score).map((e) => e.item) : this.items;
  }
  _fuzzyScore(e, t) {
    const r = e.toLowerCase(), o = t.toLowerCase();
    let s = 0, a = 0, n = 0;
    for (let h = 0; h < r.length && a < o.length; h++)
      r[h] === o[a] ? (s += 1 + n, n++, a++) : n = 0;
    return a === o.length ? s : 0;
  }
  toggle() {
    this.open ? this.close() : this.show();
  }
  show() {
    this.open = !0, this._query = "", this._selectedIndex = 0, this.dispatchEvent(
      new CustomEvent("bh-open", { bubbles: !0, composed: !0 })
    ), this.updateComplete.then(() => {
      var e, t;
      (t = (e = this.shadowRoot) == null ? void 0 : e.querySelector("input")) == null || t.focus();
    });
  }
  close() {
    this.open = !1, this.dispatchEvent(
      new CustomEvent("bh-close", { bubbles: !0, composed: !0 })
    );
  }
  _onInput(e) {
    this._query = e.target.value, this._selectedIndex = 0;
  }
  _onKeydown(e) {
    const t = this._filteredItems;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault(), this._selectedIndex = Math.min(
          this._selectedIndex + 1,
          t.length - 1
        );
        break;
      case "ArrowUp":
        e.preventDefault(), this._selectedIndex = Math.max(this._selectedIndex - 1, 0);
        break;
      case "Enter":
        e.preventDefault(), this._executeItem(t[this._selectedIndex]);
        break;
      case "Escape":
        this.close();
        break;
    }
  }
  _executeItem(e) {
    e && (this.close(), this.dispatchEvent(
      new CustomEvent("bh-execute", {
        bubbles: !0,
        composed: !0,
        detail: { id: e.id, label: e.label }
      })
    ));
  }
  _onItemClick(e) {
    this._executeItem(e);
  }
  render() {
    if (!this.open) return d;
    const e = this._filteredItems, t = e.length > 0 ? `cp-item-${this._selectedIndex}` : void 0;
    return c`
      <div class="backdrop" @click=${this.close}></div>
      <div class="palette" role="combobox" aria-expanded="true" aria-haspopup="listbox">
        <input
          type="text"
          .placeholder=${this.placeholder}
          .value=${this._query}
          @input=${this._onInput}
          @keydown=${this._onKeydown}
          aria-label=${this.placeholder || "Search commands"}
          aria-autocomplete="list"
          aria-controls="cp-results"
          aria-activedescendant=${t ?? d}
        />
        <div class="results" id="cp-results" role="listbox" aria-live="polite">
          ${e.length === 0 ? c`<div class="empty">No matching commands</div>` : f(
      e,
      (r) => r.id,
      (r, o) => c`
                  <div
                    id="cp-item-${o}"
                    class="item"
                    role="option"
                    aria-selected=${String(o === this._selectedIndex)}
                    @click=${() => this._onItemClick(r)}
                  >
                    <span class="item-label">
                      ${r.category ? c`<span class="item-category">${r.category}:</span>` : d}
                      ${r.label}
                    </span>
                    ${r.keybinding ? c`<span class="item-keybinding">${r.keybinding}</span>` : d}
                  </div>
                `
    )}
        </div>
      </div>
    `;
  }
  updated() {
    var t;
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector('.item[aria-selected="true"]');
    e == null || e.scrollIntoView({ block: "nearest" });
  }
};
i.styles = [
  ...[u.styles].flat(),
  m`
      :host {
        display: none;
        position: fixed;
        inset: 0;
        z-index: var(--bh-z-modal);
      }

      :host([open]) {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 15vh;
      }

      .backdrop {
        position: fixed;
        inset: 0;
        background: var(--bh-command-palette-backdrop, var(--bh-color-overlay));
      }

      .palette {
        position: relative;
        width: var(--bh-command-palette-width, min(500px, 90vw));
        background: var(--bh-color-surface);
        border: var(--bh-border-1) solid var(--bh-color-border);
        border-radius: var(--bh-radius-lg);
        box-shadow: var(--bh-shadow-xl);
        overflow: hidden;
      }

      input {
        width: 100%;
        padding: var(--bh-spacing-2) var(--bh-spacing-3);
        background: var(--bh-color-surface-recessed);
        border: none;
        border-bottom: var(--bh-border-1) solid var(--bh-color-border);
        color: var(--bh-color-text);
        font-size: var(--bh-text-sm);
        font-family: inherit;
        outline: none;
      }

      input::placeholder {
        color: var(--bh-color-text-muted);
      }

      .results {
        max-height: var(--bh-command-palette-max-height, 300px);
        overflow-y: auto;
      }

      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--bh-spacing-2) var(--bh-spacing-3);
        cursor: pointer;
        transition: background var(--bh-transition-fast);
      }

      .item:hover,
      .item[aria-selected='true'] {
        background: var(--bh-color-surface-raised);
      }

      .item-label {
        font-size: var(--bh-text-sm);
        color: var(--bh-color-text);
      }

      .item-category {
        font-size: var(--bh-text-xs);
        color: var(--bh-color-text-muted);
        margin-right: var(--bh-spacing-2);
      }

      .item-keybinding {
        font-family: var(--bh-font-mono);
        font-size: var(--bh-text-xs);
        color: var(--bh-color-text-muted);
        background: var(--bh-color-surface-recessed);
        padding: var(--bh-spacing-0-5) var(--bh-spacing-1-5);
        border-radius: var(--bh-radius-sm);
      }

      .empty {
        padding: var(--bh-spacing-3);
        font-size: var(--bh-text-sm);
        color: var(--bh-color-text-muted);
      }
    `
];
l([
  p({ type: Boolean, reflect: !0 })
], i.prototype, "open", 2);
l([
  p({ type: String })
], i.prototype, "placeholder", 2);
l([
  p({ type: Array })
], i.prototype, "items", 2);
l([
  b()
], i.prototype, "_query", 2);
l([
  b()
], i.prototype, "_selectedIndex", 2);
i = l([
  v("bh-command-palette")
], i);
export {
  i as BhCommandPalette
};
//# sourceMappingURL=bh-command-palette.js.map
