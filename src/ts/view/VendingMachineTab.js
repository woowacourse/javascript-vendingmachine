import { selectDom, selectDoms } from '../utils';

class VendingMachineTab {
  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;

    this.navTabButtonList = selectDoms('.nav-tab-button');
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
}

export default VendingMachineTab;
