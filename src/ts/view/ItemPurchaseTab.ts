import VendingMachineTab from './VendingMachineTab';
import { VendingMachineInterface, Hash } from '../types';
import { selectDom } from '../utils';
import { ID, CLASS } from '../constant/selector';
import { generateItemPurchaseTabContentTemplate } from '../template';

class ItemPurchaseTab extends VendingMachineTab {
  itemPurchaseTabButton: HTMLButtonElement | null = selectDom(`#${ID.ITEM_PURCHASE_TAB_BUTTON}`);

  constructor(vendingMachine: VendingMachineInterface, tabHash: Hash) {
    super(vendingMachine, tabHash);

    this.itemPurchaseTabButton.addEventListener('click', this.onClickItemPurchaseTabButton);
  }

  renderInitialTabState(): void {
    this.changeTabContent(generateItemPurchaseTabContentTemplate(), this.itemPurchaseTabButton);
  }

  private onClickItemPurchaseTabButton = ({ target }: MouseEvent) => {
    const targetElement = target as HTMLElement;
    const hash = targetElement.dataset.hash as Hash;

    if (targetElement.classList.contains(CLASS.SELECTED)) {
      return;
    }

    this.changeHashUrl(hash);
    this.renderInitialTabState();
  };
}

export default ItemPurchaseTab;
