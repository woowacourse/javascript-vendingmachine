import { VendingMachineInterface, Hash, VendingMachineTabInterface } from '../types';
import { selectDom, selectDoms } from '../utils';
import { ID, CLASS } from '../constant/selector';

class VendingMachineTab implements VendingMachineTabInterface {
  vendingMachine: VendingMachineInterface;

  tabHash: Hash;

  navTabButtonList: NodeList;

  tabContent: HTMLElement;

  constructor(vendingMachine: VendingMachineInterface, tabHash: Hash) {
    this.vendingMachine = vendingMachine;
    this.tabHash = tabHash;

    this.navTabButtonList = selectDoms(`.${CLASS.NAV_TAB_BUTTON}`);
    this.tabContent = selectDom(`#${ID.TAB_CONTENT}`);
  }

  render(): void {}

  changeTabContent(contentTemplate: string): void {
    this.tabContent.replaceChildren();
    this.tabContent.insertAdjacentHTML('afterbegin', contentTemplate);
  }

  changeHashUrl(hash: Hash): void {
    window.history.pushState({ hash }, null, hash);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }
}

export default VendingMachineTab;
