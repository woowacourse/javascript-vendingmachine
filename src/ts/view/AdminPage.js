import { HASH } from '../constant/path';
import { vendingMachineNavBarTemplate } from '../template';
import { selectDom, selectDoms, showSnackbar } from '../utils';
import { deleteCookie } from '../utils/cookie';

class AdminPage {
  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;

    this.app = selectDom('#app');
    this.thumbnailOptionMenu = null;
    this.navBar = null;
    this.navTabButtonList = null;
    this.tabContent = null;
    this.snackbar = null;
  }

  renderNavBar(isLoginUser = true) {
    this.app.replaceChildren();
    this.app.insertAdjacentHTML('afterbegin', vendingMachineNavBarTemplate(isLoginUser));

    this.navBar = selectDom('nav', this.app);
    this.navTabButtonList = selectDoms('.nav-tab-button', this.navBar);
    this.tabContent = selectDom('#tab-content');
    this.snackbar = selectDom('.snackbar');

    if (isLoginUser) {
      this.thumbnailOptionMenu = selectDom('.thumbnail-option', this.app);
      const thumbnailButton = selectDom('#thumbnail-button', this.app);

      thumbnailButton.addEventListener('click', this.#onClickThumbnailButton);
      this.thumbnailOptionMenu.addEventListener('change', this.#onChangeThumbnailOption);
    }
  }

  changeTabContent(contentTemplate, targetTabButton) {
    this.tabContent.replaceChildren();
    this.tabContent.insertAdjacentHTML('afterbegin', contentTemplate);

    this.navTabButtonList.forEach((navTabButton) =>
      navTabButton.classList.toggle('selected', targetTabButton === navTabButton)
    );
  }

  #onClickThumbnailButton = () => {
    this.thumbnailOptionMenu.classList.toggle('hide');
  };

  #onChangeThumbnailOption = ({ target: { value } }) => {
    switch (value) {
      case 'logout':
        deleteCookie('accessToken');
        localStorage.removeItem('user-name');
        location.hash = HASH.ITEM_PURCHASE;
        break;
      case 'edit-user-info':
        showSnackbar(this.snackbar, 'Coming Soon...?');
        break;
      default:
        break;
    }
  };
}

export default AdminPage;
