import breakpoints from './breakpoints';

export function sm() {
  return window.innerWidth > breakpoints.sm;
}

export function md() {
  return window.innerWidth > breakpoints.md;
}

export function lg() {
  return window.innerWidth > breakpoints.lg;
}

export function xl() {
  return window.innerWidth > breakpoints.xl;
}
