import ManageItemView from '../views/mangeItem/mangeItemView';
import VendingMachine from '../vendingMachine/vendingMachine';
import { CUSTOM_EVENT } from '../constants/constant';
import { checkDuplicatedItem } from '../validates/validates';

export default class ManageItemController {
  vendingMachine: VendingMachine;
  manageItemView: ManageItemView;

  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;
    this.manageItemView = new ManageItemView();

    this.bindEvents();
  }

  loadPage() {
    const itemList = this.vendingMachine.getItems();

    this.manageItemView.render(itemList);
  }

  bindEvents() {
    window.addEventListener(CUSTOM_EVENT.ADD_ITEM, this.handleAddItem.bind(this));
    window.addEventListener(CUSTOM_EVENT.TABLE_ITEM_CHANGE, this.handleTableItemChange.bind(this));
    window.addEventListener(CUSTOM_EVENT.TABLE_ITEM_DELETE, this.handleTableItemDelete.bind(this));
  }

  handleAddItem(event) {
    try {
      const { addItemName, addItemPrice, addItemQuantity } = event.detail;
      const newItem = {
        name: addItemName,
        price: addItemPrice,
        quantity: addItemQuantity,
      };
      const items = this.vendingMachine.getItems();

      checkDuplicatedItem(items, newItem, null);
      this.vendingMachine.addItem(newItem);

      this.manageItemView.clearInput();
      this.manageItemView.updateItemTable(items);
    } catch (error) {
      alert(error.message);
    }
  }

  handleTableItemChange(event) {
    try {
      const { item, targetRowIndex, $targetTableRow } = event.detail;
      const items = this.vendingMachine.getItems();

      checkDuplicatedItem(items, item, targetRowIndex);
      this.vendingMachine.changeItem(targetRowIndex, item);

      this.manageItemView.changeTableRow($targetTableRow, item);
    } catch (error) {
      alert(error.message);
    }
  }

  handleTableItemDelete(event) {
    const { item } = event.detail;
    this.vendingMachine.deleteItem(item);
  }
}
