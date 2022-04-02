import routes from './routes';

const useRouter = () => {
  const $headerNav = document.querySelector('#header-nav');
  const $inputSection = document.querySelector('.input-section');
  const $contentsContainer = document.querySelector('.contents-container');
  const $accountLoginButton = document.querySelector('#account-login-button');
  const $accountDropdownContainer = document.querySelector('#account-dropdown-container');
  let prevPath = '';

  const isLogged = () => !!localStorage.getItem('id');

  const activeLogin = (path: string) => {
    if (path === '#!/login' || path === '#!/edit-profile' || path === '#!/signup') {
      $accountLoginButton.classList.add('hide');
      $accountDropdownContainer.classList.add('hide');
      $headerNav.classList.add('hide');
      return;
    }

    $accountLoginButton.classList.toggle('hide', isLogged());
    $accountDropdownContainer.classList.toggle('hide', !isLogged());
    $headerNav.classList.toggle('hide', !isLogged());
  };

  const clearPageBody = () => {
    $inputSection.replaceChildren();
    $contentsContainer.replaceChildren();
  };

  return {
    to: (_path: string) => {
      const { hash, pathname } = window.location;
      const { path, title, page } = routes[_path];
      const isSamePage = prevPath === _path;

      if (isSamePage) {
        console.log('같은 페이지');
        return;
      }

      clearPageBody();
      activeLogin(_path);
      history.pushState({ path, prevPath, hash, _path }, title, pathname + path);
      prevPath = _path;
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
