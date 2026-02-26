import { css } from 'lit';

/** Shared fade-in animation styles for section components. */
export const fadeStyles = css`
  .fade-in {
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .stagger-1 { transition-delay: 0.04s; }
  .stagger-2 { transition-delay: 0.08s; }
  .stagger-3 { transition-delay: 0.12s; }
  .stagger-4 { transition-delay: 0.16s; }
  .stagger-5 { transition-delay: 0.20s; }
  .stagger-6 { transition-delay: 0.24s; }
`;
