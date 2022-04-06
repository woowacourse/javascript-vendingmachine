import { NOT_DEVELOPED_YET_MESSAGE } from '../constant/errorMessage';
import { HASH } from '../constant/path';
import { SELECTOR, SELECTOR_NAME } from '../constant/selector';
import { KEY } from '../constant/storageKey';
import { vendingMachineNavBarTemplate } from '../template';
import { selectDom, selectDoms, showSnackbar } from '../utils';
import { deleteCookie } from '../utils/cookie';

class AdminPage {
  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;

    this.app = selectDom(SELECTOR.APP);
    this.thumbnailOptionMenu = null;
    this.navBar = null;
    this.navTabButtonList = null;
    this.tabContent = null;
    this.snackbar = null;
  }

  renderNavBar(isLoginUser = true) {
    this.app.replaceChildren();
    this.app.insertAdjacentHTML('afterbegin', vendingMachineNavBarTemplate(isLoginUser));

    this.navBar = selectDom(SELECTOR.NAV, this.app);
    this.navTabButtonList = selectDoms(SELECTOR.NAV_TAB_BUTTON, this.navBar);
    this.tabContent = selectDom(SELECTOR.TAB_CONTENT);
    this.snackbar = selectDom(SELECTOR.SNACKBAR);

    if (isLoginUser) {
      this.thumbnailOptionMenu = selectDom(SELECTOR.THUMBNAIL_OPTION, this.app);
      const thumbnailButton = selectDom(SELECTOR.THUMBNAIL_BUTTON, this.app);

      thumbnailButton.addEventListener('click', this.#onClickThumbnailButton);
      this.thumbnailOptionMenu.addEventListener('change', this.#onChangeThumbnailOption);
    }
  }

  changeTabContent(contentTemplate, targetTabButton) {
    this.tabContent.replaceChildren();
    this.tabContent.insertAdjacentHTML('afterbegin', contentTemplate);

    this.navTabButtonList.forEach((navTabButton) =>
      navTabButton.classList.toggle(SELECTOR_NAME.SELECTED, targetTabButton === navTabButton)
    );
  }

  #onClickThumbnailButton = () => {
    this.thumbnailOptionMenu.classList.toggle(SELECTOR_NAME.HIDE);
  };

  #onChangeThumbnailOption = ({ target: { value } }) => {
    switch (value) {
      case 'logout':
        deleteCookie(KEY.ACCESS_TOKEN);
        localStorage.removeItem(KEY.USER_NAME);
        location.hash = location.hash === HASH.ITEM_PURCHASE ? '' : HASH.ITEM_PURCHASE;
        break;
      case 'edit-user-info':
        showSnackbar(this.snackbar, NOT_DEVELOPED_YET_MESSAGE);
        break;
      default:
        break;
    }
  };
}

export default AdminPage;
