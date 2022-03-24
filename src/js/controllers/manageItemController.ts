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
    window.addEventListener('TABLE_ITEM_CHANGE', this.onTableItemChange.bind(this));
  }

  onSubmitAddItem(event) {
    try {
      const { detail } = event;
      const item = {
        name: detail.addItemName,
        price: detail.addItemPrice,
        quantity: detail.addItemQuantity,
      };
      this.checkDuplicatedItem(item, null);
      this.vendingMachine.addItem(item);

      this.manageItemView.clearInput();
      this.manageItemView.updateItemTable(this.vendingMachine.getItems());
    } catch (error) {
      alert(error.message);
    }
  }

  onTableItemChange(event) {
    try {
      const { item, targetIndex, targetElement } = event.detail;
      this.checkDuplicatedItem(item, targetIndex);
      this.vendingMachine.changeItem(targetIndex, item);
      this.manageItemView.changeItem(targetElement, item);
    } catch (error) {
      alert(error.message);
    }
  }

  checkDuplicatedItem(newItem, targetIndex) {
    if (typeof targetIndex === 'number') {
      const items = this.vendingMachine.getItems();
      if (items.find((item, index) => index !== targetIndex && item.name === newItem.name)) {
        throw new Error('이미 등록된 상품명입니다.');
      }
      return;
    }
    const items = this.vendingMachine.getItems();
    if (items.find(item => item.name === newItem.name)) {
      throw new Error('이미 등록된 상품명입니다.');
    }
  }
}
