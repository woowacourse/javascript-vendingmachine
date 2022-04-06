import { vendingMachineNavBarTemplate } from '../template';
import { selectDom, selectDoms } from '../utils';

class VendingMachineTab {
  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;

    this.app = selectDom('#app');
    this.navBar = null;
    this.navTabButtonList = null;
    this.tabContent = null;
    this.snackbar = null;
  }

  renderNavBar(isLoginUser = true) {
    const userNameFirstLetter = localStorage.getItem('user-name')[0];
    this.app.replaceChildren();
    this.app.insertAdjacentHTML(
      'afterbegin',
      vendingMachineNavBarTemplate(isLoginUser, userNameFirstLetter)
    );

    this.navBar = selectDom('nav', this.app);
    this.navTabButtonList = selectDoms('.nav-tab-button', this.navBar);
    this.tabContent = selectDom('#tab-content');
    this.snackbar = selectDom('.snackbar');
  }

  changeTabContent(contentTemplate, targetTabButton) {
    this.tabContent.replaceChildren();
    this.tabContent.insertAdjacentHTML('afterbegin', contentTemplate);

    this.navTabButtonList.forEach((navTabButton) =>
      navTabButton.classList.toggle('selected', targetTabButton === navTabButton)
    );
  }

  #onClickLogoutButton = () => {
    console.log('hihi');
  };
}

export default VendingMachineTab;
