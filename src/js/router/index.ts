import routes from './routes';

const useRouter = () => {
  const $headerNav = document.querySelector('#header-nav');
  const $inputSection = document.querySelector('.input-section');
  const $contentsContainer = document.querySelector('.contents-container');
  const $accountLoginButton = document.querySelector('#account-login-button');
  const $accountDropdownContainer = document.querySelector('#account-dropdown-container');
  const $namethumbnail = $accountDropdownContainer.querySelector('#name-thumbnail');
  let prevPath = '';

  const activeLogin = (path: string) => {
    if (path === '#!/login' || path === '#!/edit-profile' || path === '#!/signup') {
      $accountLoginButton.classList.add('hide');
      $accountDropdownContainer.classList.add('hide');
      $headerNav.classList.add('hide');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const _isLogged = !!user;

    if (_isLogged) $namethumbnail.textContent = user.name[0];

    $accountLoginButton.classList.toggle('hide', _isLogged);
    $accountDropdownContainer.classList.toggle('hide', !_isLogged);
    $headerNav.classList.toggle('hide', !_isLogged);
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
