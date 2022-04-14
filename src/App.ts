import SignupPage from './ts/pages/signup';
import LoginPage from './ts/pages/login';
import HomePage from './ts/pages/home';
import UserEditPage from './ts/pages/user-edit';

export type routePageType = (pathname: string) => void;

export const basePath =
  process.env.NODE_ENV === 'production' ? '/javascript-vendingmachine' : '';

export const ROUTER = {
  HOME: `${basePath}/`,
};

export default class App {
  readonly #loginPage: LoginPage;
  readonly #homePage: HomePage;
  readonly #signupPage: SignupPage;
  readonly #userEditPage: UserEditPage;

  constructor() {
    this.#loginPage = new LoginPage(this.routePage);
    this.#homePage = new HomePage(this.routePage);
    this.#signupPage = new SignupPage(this.routePage);
    this.#userEditPage = new UserEditPage(this.routePage);

    this.routePage(location.pathname);
    window.addEventListener('popstate', this.#popStateHandler);
  }

  #popStateHandler = () => {
    this.routePage(location.pathname);
  };

  routePage: routePageType = pathname => {
    if (location.pathname !== pathname) {
      history.pushState({}, '', pathname || '/');
    }

    const endPoint = pathname.replace(basePath, '');

    switch (endPoint) {
      case `/login`:
        this.#loginPage.render();
        break;
      case `/signup`:
        this.#signupPage.render();
        break;
      case `/user-edit`:
        this.#userEditPage.render();
        break;
      default:
        this.#homePage.render();
        break;
    }
  };
}
