export const getPathname = (target = window) => target.location.pathname;
export const jumpTo = (href: string, state: any = {}) => {
  window.history.pushState(state, '', href);
  dispatchEvent(new PopStateEvent('popstate', { state }));
};
