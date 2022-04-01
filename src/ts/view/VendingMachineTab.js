import { selectDom, selectDoms } from '../utils';
import { ID, CLASS } from '../constant/selector';

class VendingMachineTab {
  constructor(vendingMachine, tabHash) {
    this.vendingMachine = vendingMachine;
    this.tabHash = tabHash;

    this.navTabButtonList = selectDoms(`.${CLASS.NAV_TAB_BUTTON}`);
    this.tabContent = selectDom(`#${ID.TAB_CONTENT}`);
  }

  changeTabContent(contentTemplate, targetTabButton) {
    this.tabContent.replaceChildren();
    this.tabContent.insertAdjacentHTML('afterbegin', contentTemplate);

    this.navTabButtonList.forEach((navTabButton) =>
      navTabButton.classList.toggle(`${CLASS.SELECTED}`, targetTabButton === navTabButton)
    );
  }

  changeHashUrl(hash) {
    window.history.pushState({ hash }, null, hash);
  }
}

export default VendingMachineTab;
