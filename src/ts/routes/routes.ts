import { PathName } from '../types/constants';

import NavigatorComponent from '../components/NavigatorComponent';
import { on, emit } from '../dom/domHelper';

export const PATH_NAME: PathName = {
  HOME: '/',
  PRODUCTS: '/products',
  CHARGE_MONEY: '/charge-money',
};

const isUndefinedRoutes = (pathname) =>
  !Object.values(PATH_NAME).some((route) => route === pathname);

export default class RouteManager {
  private navigatorComponent = new NavigatorComponent();
  constructor() {
    on(window, '@popstate', this.onPopstateRoute);
    this.routeURLVisit();
  }

  private routeURLVisit(): void {
    const { pathname } = window.location;

    if (isUndefinedRoutes(pathname)) {
      window.history.replaceState({}, '', PATH_NAME.HOME);

      return;
    }

    if (pathname === PATH_NAME.CHARGE_MONEY) {
      window.history.pushState({}, '', PATH_NAME.CHARGE_MONEY);
      this.navigatorComponent.renderChargeMoneyComponent();

      return;
    }

    if (pathname === PATH_NAME.PRODUCTS) {
      window.history.pushState({}, '', PATH_NAME.PRODUCTS);
      this.navigatorComponent.renderProductComponent();

      return;
    }
  }

  private onPopstateRoute = (): void => {
    if (window.location.pathname === PATH_NAME.CHARGE_MONEY) {
      emit(window, '@popstateRenderChargeMoney');
    }

    if (
      window.location.pathname === PATH_NAME.PRODUCTS ||
      window.location.pathname === PATH_NAME.HOME
    ) {
      emit(window, '@popstateRenderProduct');
    }
  };
}
