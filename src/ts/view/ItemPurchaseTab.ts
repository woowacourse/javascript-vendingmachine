import VendingMachineTab from './VendingMachineTab';
import { generateItemPurchaseTabContentTemplate } from '../template';

class ItemPurchaseTab extends VendingMachineTab {
  render(): void {
    this.changeTabContent(generateItemPurchaseTabContentTemplate());
  }
}

export default ItemPurchaseTab;
