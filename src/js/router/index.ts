import routes from './routes';
import { Path } from '../interfaces/Router.interface';

const useRouter = () => {
  const $headerTab = document.querySelector('#header-tab');
  const $inputSection = document.querySelector('.input-section');
  const $contentsContainer = document.querySelector('.contents-container');
  const $accountLoginButton = document.querySelector('#account-login-button');
  const $accountDropdownContainer = document.querySelector('#account-dropdown-container');
  const $namethumbnail = $accountDropdownContainer.querySelector('#name-thumbnail');
  let prevPath = '';

  const activeLogin = (path: string) => {
    const isAccountPage = path === '#!/login' || path === '#!/edit-profile' || path === '#!/signup';

    if (isAccountPage) {
      $accountLoginButton.classList.add('hide');
      $accountDropdownContainer.classList.add('hide');
      $headerTab.classList.add('hide');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const isLogged = !!user;

    if (isLogged) $namethumbnail.textContent = user.name[0];

    $accountLoginButton.classList.toggle('hide', isLogged);
    $accountDropdownContainer.classList.toggle('hide', !isLogged);
    $headerTab.classList.toggle('hide', !isLogged);
  };

  const clearPageBody = () => {
    $inputSection.replaceChildren();
    $contentsContainer.replaceChildren();
  };

  return {
    to: (nextPath: Path) => {
      const { pathname } = window.location;
      const { path, title, page } = routes[nextPath];
      const isSamePage = prevPath === nextPath;

      activeLogin(nextPath);

      if (isSamePage) return;

      clearPageBody();
      history.pushState({}, title, pathname + path);
      prevPath = nextPath;
      page.render();
    },
    back: () => {
      const { hash } = window.location;
      const { page } = routes[hash];

      clearPageBody();
      activeLogin(hash);
      prevPath = hash;
      page.render();
    },
  };
};

const router = useRouter();

export default router;
