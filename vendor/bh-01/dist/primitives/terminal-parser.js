const a = {
  primary: "bh-t-primary",
  success: "bh-t-success",
  warning: "bh-t-warning",
  danger: "bh-t-danger",
  text: "bh-t-text",
  bright: "bh-t-bright",
  muted: "bh-t-muted",
  tertiary: "bh-t-tertiary",
  bold: "bh-t-bold"
};
function s(r) {
  return r.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function c(r) {
  return r.replace(/\{(\/?[a-zA-Z]*)\}/g, (e, t) => {
    if (t === "/")
      return "</span>";
    const n = a[t];
    return n ? `<span class="${n}">` : `{${t}}`;
  });
}
const i = /https?:\/\/[^\s<>"']+/g;
function l(r) {
  return r.replace(i, (e) => `<a href="${e}" target="_blank" rel="noopener noreferrer" part="link">${e}</a>`);
}
function p(r) {
  const e = s(r), t = c(e);
  return l(t);
}
export {
  a as TERMINAL_TAG_MAP,
  s as escapeTerminalHtml,
  l as linkifyUrls,
  c as parseColorTags,
  p as renderTerminalText
};
//# sourceMappingURL=terminal-parser.js.map
