import { on, emit, $$, $ } from '../dom/domHelper';

const isUndefinedManageRoutes = (pathname: string) =>
  !Array.from($$<HTMLElement>('.manage-component')).some(
    (route) => route.dataset.pathname === pathname
  );

const isUndefinedMembershipRoutes = (pathname: string) =>
  !Array.from($$<HTMLElement>('.membership-component')).some(
    (route) => route.dataset.pathname === pathname
  );

export default class RouteManager {
  constructor() {
    on(window, 'popstate', this.onPopstateRoute);
    this.routeURLVisit();
  }

  private routeURLVisit(): void {
    /**
     * 로그인이 돼있는지 안돼있는지 확인하고 location값 변경! 구현해야함!!!
     */

    const { pathname } = window.location;

    if (
      isUndefinedManageRoutes(pathname) &&
      isUndefinedMembershipRoutes(pathname)
    ) {
      window.history.replaceState({}, '', '/purchase-product');

      this.onPopstateRoute();
      return;
    }

    window.history.pushState({}, '', pathname);
    this.onPopstateRoute();
  }

  private onPopstateRoute = (): void =>
    emit(window, '@popstateChangeComponent');
}
