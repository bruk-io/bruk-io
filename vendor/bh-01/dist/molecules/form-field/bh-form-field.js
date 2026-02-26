import { css as u, nothing as h, html as s } from "lit";
import { property as n, query as p, customElement as c } from "lit/decorators.js";
import { BaseElement as f } from "../../primitives/base-element.js";
var m = Object.defineProperty, v = Object.getOwnPropertyDescriptor, a = (i, e, l, o) => {
  for (var r = o > 1 ? void 0 : o ? v(e, l) : e, d = i.length - 1, b; d >= 0; d--)
    (b = i[d]) && (r = (o ? b(e, l, r) : b(r)) || r);
  return o && r && m(e, l, r), r;
};
let g = 0, t = class extends f {
  constructor() {
    super(...arguments), this.label = "", this.helpText = "", this.error = "", this.required = !1, this._uniqueId = `bh-ff-${++g}`;
  }
  render() {
    const i = `${this._uniqueId}-label`, e = `${this._uniqueId}-help`, l = `${this._uniqueId}-error`;
    return s`
      <div class="field" part="field">
        ${this.label ? s`<label id=${i} part="label">
              ${this.label}${this.required ? s`<span class="required-marker" aria-hidden="true">*</span>` : h}
            </label>` : h}
        <slot @slotchange=${this._onSlotChange}></slot>
        ${this.helpText && !this.error ? s`<div id=${e} class="help-text" part="help-text">${this.helpText}</div>` : h}
        ${this.error ? s`<div id=${l} class="error" part="error" role="alert">${this.error}</div>` : h}
      </div>
    `;
  }
  updated() {
    this._linkAria();
  }
  _onSlotChange() {
    this._linkAria();
  }
  _linkAria() {
    if (!this._defaultSlot) return;
    const i = this._defaultSlot.assignedElements({ flatten: !0 });
    if (i.length === 0) return;
    const e = i[0], l = `${this._uniqueId}-label`, o = `${this._uniqueId}-help`, r = `${this._uniqueId}-error`;
    this.label ? e.setAttribute("aria-labelledby", l) : e.removeAttribute("aria-labelledby"), this.error ? e.setAttribute("aria-describedby", r) : this.helpText ? e.setAttribute("aria-describedby", o) : e.removeAttribute("aria-describedby"), this.error ? e.setAttribute("aria-invalid", "true") : e.removeAttribute("aria-invalid"), this.required ? e.setAttribute("aria-required", "true") : e.removeAttribute("aria-required");
  }
};
t.styles = [
  ...[f.styles].flat(),
  u`
      :host {
        display: block;
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: var(--bh-form-field-gap, var(--bh-spacing-1-5));
      }

      label {
        font-family: var(--bh-font-sans);
        font-size: var(--bh-text-sm);
        font-weight: var(--bh-font-medium);
        line-height: var(--bh-leading-normal);
        color: var(--bh-form-field-label-color, var(--bh-color-text));
      }

      .required-marker {
        color: var(--bh-form-field-error-color, var(--bh-color-danger));
        margin-left: var(--bh-spacing-0-5);
      }

      .help-text {
        font-family: var(--bh-font-sans);
        font-size: var(--bh-text-sm);
        line-height: var(--bh-leading-normal);
        color: var(--bh-color-text-muted);
      }

      .error {
        font-family: var(--bh-font-sans);
        font-size: var(--bh-text-sm);
        line-height: var(--bh-leading-normal);
        color: var(--bh-form-field-error-color, var(--bh-color-danger));
      }
    `
];
a([
  n()
], t.prototype, "label", 2);
a([
  n({ attribute: "help-text" })
], t.prototype, "helpText", 2);
a([
  n()
], t.prototype, "error", 2);
a([
  n({ type: Boolean })
], t.prototype, "required", 2);
a([
  p("slot:not([name])")
], t.prototype, "_defaultSlot", 2);
t = a([
  c("bh-form-field")
], t);
export {
  t as BhFormField
};
//# sourceMappingURL=bh-form-field.js.map
