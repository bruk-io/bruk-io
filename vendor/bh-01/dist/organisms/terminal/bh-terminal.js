import { css as d, html as c } from "lit";
import { property as l, state as b, query as u, customElement as f } from "lit/decorators.js";
import { consume as _ } from "../../node_modules/@lit/context/lib/decorators/consume.js";
import { BaseElement as m } from "../../primitives/base-element.js";
import { renderTerminalText as p } from "../../primitives/terminal-parser.js";
import { commandHandlerContext as v } from "../../primitives/terminal-context.js";
import "../../molecules/terminal-bar/bh-terminal-bar.js";
import "../../molecules/terminal-input/bh-terminal-input.js";
import "../../molecules/terminal-hint-bar/bh-terminal-hint-bar.js";
var y = Object.defineProperty, g = Object.getOwnPropertyDescriptor, i = (e, t, r, s) => {
  for (var a = s > 1 ? void 0 : s ? g(t, r) : t, n = e.length - 1, h; n >= 0; n--)
    (h = e[n]) && (a = (s ? h(t, r, a) : h(a)) || a);
  return s && a && y(t, r, a), a;
};
let o = class extends m {
  constructor() {
    super(...arguments), this.title = "Terminal", this.status = "", this.statusColor = "success", this.prompt = "▸ ", this.promptUser = "", this.promptPath = "~", this.maxLines = 1e3, this.autoscroll = !0, this.hints = [], this.scanlines = !1, this._mode = "idle";
  }
  // --- TerminalAdapter implementation ---
  /** Append text to the current (last) line. Create a line if none exist. */
  write(e) {
    if (!this._output) return;
    let t = this._output.querySelector(".line:last-child");
    t || (t = document.createElement("div"), t.className = "line", this._output.appendChild(t)), t.innerHTML += p(e), this._scrollToBottom();
  }
  /** Append a complete line. Optionally tag it with an id for later replacement. */
  writeLine(e, t) {
    if (!this._output) return;
    const r = document.createElement("div");
    r.className = "line", r.innerHTML = p(e), t != null && t.id && r.setAttribute("data-line-id", t.id), this._output.appendChild(r), this._trimLines(), this._scrollToBottom();
  }
  /** Write a line styled as an error. */
  writeError(e) {
    this.writeLine("{danger}" + e + "{/}");
  }
  /** Update a previously written line identified by id. Falls back to writeLine. */
  replaceLine(e, t) {
    if (!this._output) return;
    const r = this._output.querySelector(`[data-line-id="${e}"]`);
    r ? r.innerHTML = p(t) : this.writeLine(t, { id: e });
  }
  /** Enter RUNNING state — disable input. */
  startCommand() {
    this._mode = "running";
  }
  /** Return to IDLE state — re-enable and focus input. */
  endCommand() {
    this._mode = "idle", this.updateComplete.then(() => {
      var e;
      (e = this._input) == null || e.focus();
    });
  }
  /** Clear the scrollback buffer. */
  clear() {
    this._output && (this._output.innerHTML = "");
  }
  /** Focus the terminal input. */
  focus() {
    var e;
    (e = this._input) == null || e.focus();
  }
  // --- Private helpers ---
  _scrollToBottom() {
    this.autoscroll && this._output && requestAnimationFrame(() => {
      this._output.scrollTop = this._output.scrollHeight;
    });
  }
  _trimLines() {
    if (this._output && this.maxLines > 0)
      for (; this._output.children.length > this.maxLines; )
        this._output.removeChild(this._output.firstChild);
  }
  /** Echo the user's command to the output area with prompt decoration. */
  _echo(e) {
    if (this._output) {
      if (this.promptUser) {
        const t = document.createElement("div");
        t.className = "line", t.innerHTML = '<span class="bh-t-tertiary">┌─[</span><span class="bh-t-primary">' + this.promptUser + '</span><span class="bh-t-tertiary">]─[</span><span class="bh-t-success">' + this.promptPath + '</span><span class="bh-t-tertiary">]</span>', this._output.appendChild(t);
        const r = document.createElement("div");
        r.className = "line", r.innerHTML = '<span class="bh-t-tertiary">└─</span><span class="bh-t-primary">' + this.prompt + "</span>" + p(e), this._output.appendChild(r);
      } else {
        const t = document.createElement("div");
        t.className = "line", t.innerHTML = '<span class="bh-t-primary">' + this.prompt + "</span>" + p(e), this._output.appendChild(t);
      }
      this._trimLines(), this._scrollToBottom();
    }
  }
  // --- Event handlers ---
  async _onCommand(e) {
    const t = e.detail;
    if (this._echo(t), this._handler) {
      const r = t.split(/\s+/), s = r[0], a = r.slice(1);
      try {
        await this._handler.execute(s, a, this);
      } catch (n) {
        this.writeError(n instanceof Error ? n.message : String(n));
      }
    } else
      this.dispatchEvent(
        new CustomEvent("bh-command", {
          detail: t,
          bubbles: !0,
          composed: !0
        })
      );
  }
  _onInterrupt() {
    this._mode === "running" && this.endCommand(), this.writeLine("{tertiary}^C{/}");
  }
  _onTabComplete(e) {
    var t, r;
    if ((t = this._handler) != null && t.complete) {
      const s = this._handler.complete(e.detail);
      if (s.length === 1) {
        const n = (r = this._input.shadowRoot) == null ? void 0 : r.querySelector(".cmd-input");
        n && (n.value = s[0]);
      } else s.length > 1 && this.writeLine(s.join("  "));
    } else
      this.dispatchEvent(
        new CustomEvent("bh-tab-complete", {
          detail: e.detail,
          bubbles: !0,
          composed: !0
        })
      );
  }
  render() {
    return c`
      <div class="terminal" part="terminal">
        <bh-terminal-bar
          title=${this.title}
          status=${this.status}
          status-color=${this.statusColor}
        ></bh-terminal-bar>
        <div class="output" part="output"></div>
        <bh-terminal-input
          prompt=${this.prompt}
          prompt-user=${this.promptUser}
          prompt-path=${this.promptPath}
          ?disabled=${this._mode === "running"}
          @bh-command=${this._onCommand}
          @bh-interrupt=${this._onInterrupt}
          @bh-tab-complete=${this._onTabComplete}
          @bh-clear=${() => this.clear()}
        ></bh-terminal-input>
        ${this.hints.length ? c`<bh-terminal-hint-bar .hints=${this.hints}></bh-terminal-hint-bar>` : ""}
      </div>
    `;
  }
};
o.styles = [
  ...[m.styles].flat(),
  d`
      :host {
        display: block;
        color-scheme: dark;
      }

      .terminal {
        display: flex;
        flex-direction: column;
        height: var(--bh-terminal-height, 100%);
        background: var(--bh-color-cod, #0d0c0a);
        border: 1px solid var(--bh-color-tundora, #2a2826);
        border-radius: var(--bh-radius-lg, 8px);
        overflow: hidden;
        color: var(--bh-color-swiss-coffee, #c8c4bc);
        font-family: var(--bh-font-mono);
      }

      .output {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 12px 16px 0;
        min-height: 0;
        background: var(--bh-color-cod, #0d0c0a);
      }

      .output::-webkit-scrollbar {
        width: 6px;
      }
      .output::-webkit-scrollbar-track {
        background: var(--bh-color-cod, #0d0c0a);
      }
      .output::-webkit-scrollbar-thumb {
        background: var(--bh-color-tundora, #2a2826);
        border-radius: 3px;
      }

      .line {
        font-family: var(--bh-font-mono);
        font-size: 13px;
        line-height: 1.5;
        white-space: pre-wrap;
        word-break: break-word;
        min-height: 1.5em;
      }

      /* Scanlines overlay */
      :host([scanlines]) .terminal {
        position: relative;
      }

      :host([scanlines]) .terminal::after {
        content: '';
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.08) 2px,
          rgba(0, 0, 0, 0.08) 4px
        );
        pointer-events: none;
        z-index: 1;
      }

      /* Links in terminal output */
      .output a {
        color: var(--bh-color-primary);
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .output a:hover {
        color: var(--bh-color-primary-hover, var(--bh-color-primary));
      }

      /* Terminal color tag classes — map to bh-01 semantic tokens */
      .bh-t-primary {
        color: var(--bh-color-primary);
      }
      .bh-t-success {
        color: var(--bh-color-success);
      }
      .bh-t-warning {
        color: var(--bh-color-warning);
      }
      .bh-t-danger {
        color: var(--bh-color-danger);
      }
      .bh-t-text {
        color: var(--bh-color-text);
      }
      .bh-t-bright {
        color: var(--bh-color-text-bright);
      }
      .bh-t-muted {
        color: var(--bh-color-text-muted);
      }
      .bh-t-tertiary {
        color: var(--bh-color-text-tertiary);
      }
      .bh-t-bold {
        font-weight: var(--bh-font-medium, 500);
      }
    `
];
i([
  l()
], o.prototype, "title", 2);
i([
  l()
], o.prototype, "status", 2);
i([
  l({ attribute: "status-color" })
], o.prototype, "statusColor", 2);
i([
  l()
], o.prototype, "prompt", 2);
i([
  l({ attribute: "prompt-user" })
], o.prototype, "promptUser", 2);
i([
  l({ attribute: "prompt-path" })
], o.prototype, "promptPath", 2);
i([
  l({ type: Number, attribute: "max-lines" })
], o.prototype, "maxLines", 2);
i([
  l({ type: Boolean })
], o.prototype, "autoscroll", 2);
i([
  l({ attribute: !1 })
], o.prototype, "hints", 2);
i([
  l({ type: Boolean, reflect: !0 })
], o.prototype, "scanlines", 2);
i([
  _({ context: v, subscribe: !0 })
], o.prototype, "_handler", 2);
i([
  b()
], o.prototype, "_mode", 2);
i([
  u(".output")
], o.prototype, "_output", 2);
i([
  u("bh-terminal-input")
], o.prototype, "_input", 2);
o = i([
  f("bh-terminal")
], o);
export {
  o as BhTerminal
};
//# sourceMappingURL=bh-terminal.js.map
