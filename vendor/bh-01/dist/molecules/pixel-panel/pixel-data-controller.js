import { barToGrid as h, sparklineToGrid as f } from "../../primitives/pixel-renderers.js";
import { textToGrid as _ } from "../../primitives/pixel-font.js";
class n {
  constructor(e, i) {
    this._buffer = [], this._text = "", this._host = e, this._cols = i.cols, this._rows = i.rows, this._type = i.type, this._color = i.color ?? 1, this._bufferSize = i.bufferSize ?? i.cols, this._grid = new Uint8Array(i.cols * i.rows), e.addController(this);
  }
  hostConnected() {
  }
  hostDisconnected() {
  }
  get grid() {
    return this._grid;
  }
  get latest() {
    return this._buffer.length > 0 ? this._buffer[this._buffer.length - 1] : void 0;
  }
  get values() {
    return this._buffer.slice();
  }
  push(e) {
    this._buffer.push(e), this._buffer.length > this._bufferSize && (this._buffer = this._buffer.slice(this._buffer.length - this._bufferSize)), this._regenerate();
  }
  set(e) {
    this._buffer = e.slice(-this._bufferSize), this._regenerate();
  }
  setText(e) {
    this._text = e, this._regenerate();
  }
  setGrid(e) {
    this._applyGrid(e);
  }
  resize(e, i) {
    this._cols = e, this._rows = i, this._grid = new Uint8Array(e * i), this._regenerate();
  }
  configure(e) {
    let i = !1;
    e.cols !== void 0 && e.cols !== this._cols && (this._cols = e.cols, i = !0), e.rows !== void 0 && e.rows !== this._rows && (this._rows = e.rows, i = !0), e.type !== void 0 && e.type !== this._type && (this._type = e.type, i = !0), e.color !== void 0 && e.color !== this._color && (this._color = e.color, i = !0), e.bufferSize !== void 0 && e.bufferSize !== this._bufferSize && (this._bufferSize = e.bufferSize, this._buffer.length > this._bufferSize && (this._buffer = this._buffer.slice(this._buffer.length - this._bufferSize)), i = !0), i && (this._grid = new Uint8Array(this._cols * this._rows), this._regenerate());
  }
  _regenerate() {
    const { _cols: e, _rows: i, _color: t, _type: s } = this;
    if (e === 0 || i === 0) return;
    let r;
    switch (s) {
      case "sparkline":
        r = f(this._buffer, e, i, t);
        break;
      case "bar":
        r = h(this._buffer.length > 0 ? this._buffer[this._buffer.length - 1] : 0, e, i, t);
        break;
      case "text":
        r = _(this._text, e, i, t);
        break;
      case "raw":
        return;
    }
    this._applyGrid(r);
  }
  _applyGrid(e) {
    const i = this._grid, t = Math.min(i.length, e.length);
    let s = i.length !== e.length;
    if (!s) {
      for (let r = 0; r < t; r++)
        if (i[r] !== e[r]) {
          s = !0;
          break;
        }
    }
    s && (this._grid = e, this._host.requestUpdate());
  }
}
export {
  n as PixelDataController
};
//# sourceMappingURL=pixel-data-controller.js.map
