import { $$ } from '../utils/dom';
import SignupPage from '../pages/signup';
import LoginPage from '../pages/login';
import HomePage from '../pages/home';
import UserEditPage from '../pages/user-edit';

export const basePath =
  process.env.NODE_ENV === 'production' ? '/javascript-vendingmachine' : '';

export default class App {
  private readonly loginPage: LoginPage;
  private readonly homePage: HomePage;
  private readonly signupPage: SignupPage;
  private readonly userEditPage: UserEditPage;

  constructor() {
    this.loginPage = new LoginPage(this.routePage);
    this.homePage = new HomePage(this.routePage, this.activateClickedButton);
    this.signupPage = new SignupPage(this.routePage);
    this.userEditPage = new UserEditPage(this.routePage);

    this.homePage.render();
    window.addEventListener('popstate', this.popStateHandler);
  }

  private popStateHandler = () => {
    if (location.pathname === `${basePath}/`) {
      this.activateClickedButton(location.pathname);
    }
    this.routePage(location.pathname);
  };

  activateClickedButton = pathname => {
    $$('.nav__button').forEach($button => {
      if (
        this.checkMatchPathname(
          $button.dataset.pathname,
          pathname.replace(basePath, ''),
        )
      ) {
        $button.classList.add('active');
        return;
      }
      $button.classList.remove('active');
    });
  };

  private checkMatchPathname(buttonPathname, pathname) {
    return buttonPathname === pathname;
  }

  routePage = pathname => {
    switch (pathname) {
      case `${basePath}/`:
        this.homePage.render();
        break;
      case `${basePath}/login`:
        this.loginPage.render();
        break;
      case `${basePath}/signup`:
        this.signupPage.render();
        break;
      case `${basePath}/user-edit`:
        this.userEditPage.render();
    }
  };
}
