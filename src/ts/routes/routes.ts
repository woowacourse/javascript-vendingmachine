import { PATHNAME } from '../constants/pathname';
import { on, emit, $$ } from '../dom/domHelper';

const isUndefinedRoutes = (pathname: string) =>
  !Array.from($$<HTMLElement>('.change-component')).some(
    (route) => route.dataset.pathname === pathname
  );

export default class RouteManager {
  constructor() {
    on(window, 'popstate', this.onPopstateRoute);
    this.routeURLVisit();
  }

  private routeURLVisit(): void {
    const { pathname } = window.location;

    if (isUndefinedRoutes(pathname)) {
      window.history.replaceState({}, '', PATHNAME.PURCHASE_PRODUCT);

      this.onPopstateRoute();
      return;
    }

    window.history.pushState({}, '', pathname);
    this.onPopstateRoute();
  }

  private onPopstateRoute = (): void =>
    emit(window, '@popstateChangeComponent');
}
