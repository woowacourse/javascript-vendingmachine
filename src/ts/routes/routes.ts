import { on, emit, $$ } from '../dom/domHelper';

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
