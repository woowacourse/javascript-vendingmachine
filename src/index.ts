import './css/index';
import router from './js/router/index';

window.addEventListener('popstate', function () {
  router.back();
});

class App {
  $headerNav: HTMLElement;
  $accountNavContainer: HTMLElement;

  constructor() {
    this.$headerNav = document.querySelector('#header-nav');
    this.$accountNavContainer = document.querySelector('#account-nav-container');

    this.$accountNavContainer.addEventListener('click', this.onClickLogin);
    this.$headerNav.addEventListener('click', this.onClickTab);

    const { hash } = window.location;
    hash === '' ? router.to('#!/product-purchase') : router.to(hash);
  }

  onClickLogin = (e: PointerEvent) => {
    if (!(e.target instanceof HTMLButtonElement)) return;

    router.to('#!/login');
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
