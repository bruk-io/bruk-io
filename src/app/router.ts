/**
 * Minimal client-side router.
 *
 * The site has exactly two shapes — the landing page and an article — so this
 * is a path parser plus a history listener rather than a routing library.
 *
 * Deep links work in production because the build emits `404.html` as a copy of
 * `index.html`; GitHub Pages serves that for unknown paths, and the app then
 * resolves the real route from `location.pathname`.
 */

export type Route =
  | { name: 'home' }
  | { name: 'article'; slug: string }
  | { name: 'not-found'; path: string };

export function parseRoute(pathname: string): Route {
  const path = pathname.replace(/\/+$/, '');
  if (path === '' || path === '/index.html') return { name: 'home' };

  const article = path.match(/^\/writing\/([\w-]+)$/);
  if (article) return { name: 'article', slug: article[1] };

  return { name: 'not-found', path };
}

export function currentRoute(): Route {
  return parseRoute(window.location.pathname);
}

/** Navigate without a reload, then reset scroll as a page load would. */
export function navigate(href: string): void {
  if (href === window.location.pathname) return;
  window.history.pushState({}, '', href);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
}

/**
 * Intercept in-app link clicks anywhere on the page.
 *
 * Links live inside shadow roots, so this listens on the document and walks the
 * composed path. Anchors, external hosts, downloads, new-tab clicks, and
 * anything with an explicit target keep their default behaviour.
 */
export function initRouter(onChange: () => void): () => void {
  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const anchor = event.composedPath().find(
      (el): el is HTMLAnchorElement => el instanceof HTMLAnchorElement
    );
    if (!anchor || anchor.target || anchor.hasAttribute('download')) return;

    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:')) return;

    const url = new URL(anchor.href);
    if (url.origin !== window.location.origin) return;

    event.preventDefault();
    navigate(url.pathname);
  };

  document.addEventListener('click', onClick);
  window.addEventListener('popstate', onChange);

  return () => {
    document.removeEventListener('click', onClick);
    window.removeEventListener('popstate', onChange);
  };
}
