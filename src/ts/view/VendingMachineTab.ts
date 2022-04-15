import { VendingMachineInterface, Hash, VendingMachineTabInterface } from '../types';
import { selectDom } from '../utils';
import { ID } from '../constant/selector';

class VendingMachineTab implements VendingMachineTabInterface {
  vendingMachine: VendingMachineInterface;

  tabHash: Hash;

  content: HTMLElement | null = selectDom(`#${ID.CONTENT}`);

  constructor(vendingMachine: VendingMachineInterface, tabHash: Hash) {
    this.vendingMachine = vendingMachine;
    this.tabHash = tabHash;
  }

  render(): void {}

  changeTabContent(contentTemplate: string): void {
    this.content.replaceChildren();
    this.content.insertAdjacentHTML('afterbegin', contentTemplate);
    this.content.classList.add('tab-content');
    this.content.classList.remove('auth-content');
  }

  protected changeHashUrl(hash: Hash): void {
    window.history.pushState({ hash }, null, hash);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }
}

export default VendingMachineTab;
