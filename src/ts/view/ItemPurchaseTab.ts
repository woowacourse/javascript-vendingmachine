import VendingMachineTab from './VendingMachineTab';
import { generateItemPurchaseTabContentTemplate } from '../template';

class ItemPurchaseTab extends VendingMachineTab {
  renderInitialTabState(): void {
    this.changeTabContent(generateItemPurchaseTabContentTemplate());
  }
}

export default ItemPurchaseTab;
