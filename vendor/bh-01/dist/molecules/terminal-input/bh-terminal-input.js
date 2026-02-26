import { css as d, nothing as c, html as l } from "lit";
import { property as n, state as u, query as f, customElement as v } from "lit/decorators.js";
import { BaseElement as m } from "../../primitives/base-element.js";
var y = Object.defineProperty, b = Object.getOwnPropertyDescriptor, s = (t, e, o, i) => {
  for (var p = i > 1 ? void 0 : i ? b(e, o) : e, a = t.length - 1, h; a >= 0; a--)
    (h = t[a]) && (p = (i ? h(e, o, p) : h(p)) || p);
  return i && p && y(e, o, p), p;
};
let r = class extends m {
  constructor() {
    super(...arguments), this.prompt = "▸ ", this.promptUser = "", this.promptPath = "~", this.disabled = !1, this._history = [], this._historyIndex = -1, this._tempLine = "";
  }
  /** Focus the internal input element. */
  focus() {
    this.updateComplete.then(() => {
      var t;
      (t = this._input) == null || t.focus();
    });
  }
  _onKeydown(t) {
    const e = this._input;
    if (t.key === "Enter") {
      t.preventDefault();
      const o = e.value.trim();
      o && (this._history = [...this._history, o], this._historyIndex = -1, this._tempLine = "", this.dispatchEvent(
        new CustomEvent("bh-command", { detail: o, bubbles: !0, composed: !0 })
      ), e.value = "");
      return;
    }
    if (t.key === "ArrowUp") {
      if (t.preventDefault(), this._history.length === 0) return;
      this._historyIndex === -1 ? (this._tempLine = e.value, this._historyIndex = this._history.length - 1) : this._historyIndex > 0 && this._historyIndex--, e.value = this._history[this._historyIndex];
      return;
    }
    if (t.key === "ArrowDown") {
      if (t.preventDefault(), this._historyIndex === -1) return;
      this._historyIndex++, this._historyIndex >= this._history.length ? (this._historyIndex = -1, e.value = this._tempLine, this._tempLine = "") : e.value = this._history[this._historyIndex];
      return;
    }
    if (t.key === "Tab") {
      t.preventDefault(), this.dispatchEvent(
        new CustomEvent("bh-tab-complete", {
          detail: e.value,
          bubbles: !0,
          composed: !0
        })
      );
      return;
    }
    if (t.ctrlKey)
      switch (t.key) {
        case "c":
          t.preventDefault(), this.dispatchEvent(
            new CustomEvent("bh-interrupt", { bubbles: !0, composed: !0 })
          ), e.value = "";
          return;
        case "l":
          t.preventDefault(), this.dispatchEvent(
            new CustomEvent("bh-clear", { bubbles: !0, composed: !0 })
          );
          return;
        case "u":
          t.preventDefault(), e.value = "";
          return;
        case "k":
          t.preventDefault(), e.value = e.value.substring(0, e.selectionStart ?? 0);
          return;
        case "a":
          t.preventDefault(), e.setSelectionRange(0, 0);
          return;
        case "e":
          t.preventDefault(), e.setSelectionRange(e.value.length, e.value.length);
          return;
      }
  }
  render() {
    return l`
      <div class="input-area" part="input-area">
        ${this.promptUser ? l`
              <div class="prompt-line">
                <span class="prompt-chrome">\u250C\u2500[</span>
                <span class="prompt-user">${this.promptUser}</span>
                <span class="prompt-chrome">]\u2500[</span>
                <span class="prompt-path">${this.promptPath}</span>
                <span class="prompt-chrome">]</span>
              </div>
            ` : c}
        <div class="prompt-line">
          ${this.promptUser ? l`<span class="prompt-chrome">\u2514\u2500</span>` : c}
          <span class="prompt-char" part="prompt">${this.prompt}</span>
          <input
            type="text"
            class="cmd-input"
            part="input"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            ?disabled=${this.disabled}
            @keydown=${this._onKeydown}
          />
        </div>
      </div>
    `;
  }
};
r.styles = [
  ...[m.styles].flat(),
  d`
      :host {
        display: block;
      }

      .input-area {
        background: var(--bh-color-bg, var(--bh-color-cod));
        padding: 0 16px 12px;
        flex-shrink: 0;
      }

      .prompt-line {
        display: flex;
        align-items: flex-start;
        font-family: var(--bh-font-mono);
        font-size: 13px;
        line-height: 1.5;
      }

      .prompt-chrome {
        color: var(--bh-color-text-tertiary);
        white-space: pre;
        user-select: none;
      }

      .prompt-user {
        color: var(--bh-color-primary);
      }

      .prompt-path {
        color: var(--bh-color-success, var(--bh-color-text));
      }

      .prompt-char {
        color: var(--bh-color-primary);
        white-space: pre;
        user-select: none;
        flex-shrink: 0;
      }

      .cmd-input {
        flex: 1;
        font-family: var(--bh-font-mono);
        font-size: 13px;
        line-height: 1.5;
        color: var(--bh-color-text);
        background: transparent;
        border: none;
        outline: none;
        caret-color: var(--bh-color-primary);
        padding: 0;
        margin: 0;
      }

      .cmd-input:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      @media (max-width: 768px) {
        .cmd-input {
          font-size: 16px;
        }
      }
    `
];
s([
  n()
], r.prototype, "prompt", 2);
s([
  n({ attribute: "prompt-user" })
], r.prototype, "promptUser", 2);
s([
  n({ attribute: "prompt-path" })
], r.prototype, "promptPath", 2);
s([
  n({ type: Boolean, reflect: !0 })
], r.prototype, "disabled", 2);
s([
  u()
], r.prototype, "_history", 2);
s([
  u()
], r.prototype, "_historyIndex", 2);
s([
  u()
], r.prototype, "_tempLine", 2);
s([
  f(".cmd-input")
], r.prototype, "_input", 2);
r = s([
  v("bh-terminal-input")
], r);
export {
  r as BhTerminalInput
};
//# sourceMappingURL=bh-terminal-input.js.map
