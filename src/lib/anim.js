export const EASE = [0.22, 1, 0.36, 1];
export const EASE_CINE = [0.76, 0, 0.24, 1];

export const riseIn = {
  hidden: { y: '108%' },
  show: (i = 0) => ({
    y: '0%',
    transition: { duration: 1.1, ease: EASE, delay: 0.06 * i },
  }),
};

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE, delay: 0.08 * i },
  }),
};

export const VIEW = { once: true, margin: '-12% 0px -12% 0px' };
