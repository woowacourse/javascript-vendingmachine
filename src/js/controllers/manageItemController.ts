import ManageItemView from '../views/mangeItemView';
import VendingMachine from '../vendingMachine/vendingMachine';

export default class ManageItemController {
  manageItemView: ManageItemView;

  constructor(vendingMachine: VendingMachine) {
    this.manageItemView = new ManageItemView(vendingMachine);
  }

  loadPage() {
    this.manageItemView.render();
  }
}
