/** Shared theme state — single source of truth for light/dark mode. */
export const themeState = {
  get isDark(): boolean {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  },

  toggle(): void {
    const next = this.isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  },

  init(): void {
    const saved = localStorage.getItem('theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  },
};
