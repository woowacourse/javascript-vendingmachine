import './css/index';
import router from './js/router/index';

window.addEventListener('popstate', function () {
  router.back();
});

class App {
  $headerNav: HTMLElement;
  $accountLoginButton: HTMLButtonElement;
  $dropdownSelect: HTMLSelectElement;

  constructor() {
    this.$headerNav = document.querySelector('#header-nav');
    this.$accountLoginButton = document.querySelector('#account-login-button');
    this.$dropdownSelect = document.querySelector('#dropdown-select');

    this.$accountLoginButton.addEventListener('click', this.onClickLogin);
    this.$headerNav.addEventListener('click', this.onClickTab);
    this.$dropdownSelect.addEventListener('change', this.onSelectNav);

    const { hash } = window.location;
    hash === '' ? router.to('#!/product-purchase') : router.to(hash);
  }

  onClickLogin = (e: PointerEvent) => {
    router.to('#!/login');
  };

  onSelectNav = (e: Event) => {
    if (!(e.target instanceof HTMLSelectElement)) return;

    const { value } = e.target;
    e.target.selectedIndex = 0;

    if (value === 'edit-profile') {
      router.to('#!/edit-profile');
    }

    if (value === 'logout') {
      localStorage.clear();
      router.to('#!/product-purchase');
    }
  };

  onClickTab = (e: PointerEvent) => {
    if (!(e.target instanceof HTMLButtonElement)) return;

    const IdSelector = e.target.id;
    let path: string = '';

    switch (IdSelector) {
      case 'product-manage-button':
        path = '#!/product-manage';
        break;
      case 'change-add-button':
        path = '#!/change-add';
        break;
      case 'product-purchase-button':
        path = '#!/product-purchase';
        break;
      default:
        break;
    }

    router.to(path);
  };
}

new App();
