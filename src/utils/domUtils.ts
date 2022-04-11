export const getPathname = (target = window) => target.location.pathname;
export const jumpTo = (href: string, state: any = {}) => {
  const pushStateEvent = new CustomEvent('pushstate', {
    detail: { state },
  });

  window.history.pushState(state, '', href);
  dispatchEvent(pushStateEvent);
};
