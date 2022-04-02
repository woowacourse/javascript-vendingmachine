import routes from './routes';

// type GreetFunction = (_path: string) => void;
// interface FunctionA {
//   (_path: string): void;
// }
// interface FunctionB {
//   (): void;
// }

// const isLogged = () => !!localStorage.getItem('id');

// const activeLogin = () => {
//   // const accountNavContainer = document.querySelector('#account-nav-container');
//   const $headerNav = document.querySelector('#header-nav');
//   console.log('----------------', isLogged());
//   // accountNavContainer.classList.toggle('hide');
//   $headerNav.classList.toggle('hide', !isLogged());
// };

const useRouter = () => {
  const $headerNav = document.querySelector('#header-nav');
  const $inputSection = document.querySelector('.input-section');
  const $contentsContainer = document.querySelector('.contents-container');
  let prevPath = '';

  const isLogged = () => !!localStorage.getItem('id');

  const activeLogin = () => {
    // const accountNavContainer = document.querySelector('#account-nav-container');
    console.log('----------------', isLogged());
    // accountNavContainer.classList.toggle('hide');
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

      activeLogin();

      if (isSamePage) {
        console.log('같은 페이지');
        return;
      }

      clearPageBody();
      history.pushState({ path, prevPath, hash, _path }, title, pathname + path);
      page.render();
      prevPath = _path;
    },
    back: () => {
      const { hash } = window.location;
      const { page } = routes[hash];

      prevPath = hash;
      clearPageBody();
      page.render();
    },
  };
};

const router = useRouter();

export default router;
