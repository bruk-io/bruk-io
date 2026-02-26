/**
 * Observe elements with the `fade-in` class and add `visible` when they
 * enter the viewport. Call once from the root component after first render.
 */
export function initFadeObserver(root: ShadowRoot | Document) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' },
  );

  root.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

  // Also observe inside child shadow roots (our section components)
  root.querySelectorAll('*').forEach((el) => {
    if (el.shadowRoot) {
      el.shadowRoot.querySelectorAll('.fade-in').forEach((child) => observer.observe(child));
    }
  });

  return observer;
}
