import ManageItemView from '../views/mangeItem/mangeItemView';

export default class ManageItemController {
  vendingMachine: any;
  manageItemView: any;

  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;
    this.manageItemView = new ManageItemView();
    this.bindEvents();
  }

  render() {
    const itemList = this.vendingMachine.getItems();
    this.manageItemView.render(itemList);
  }

  bindEvents() {
    window.addEventListener('ADD_ITEM', this.onSubmitAddItem.bind(this));
  }

  onSubmitAddItem(event) {
    const { detail } = event;
    const item = {
      name: detail.addItemName,
      price: detail.addItemPrice,
      quantity: detail.addItemQuantity,
    };
    this.vendingMachine.addItem(item);

    this.manageItemView.clearInput();
    this.manageItemView.updateItemTable(this.vendingMachine.getItems());
  }
}
