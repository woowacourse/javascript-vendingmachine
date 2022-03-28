import ManageItemView from '../views/mangeItemView';
import VendingMachine from '../vendingMachine/vendingMachine';
import { CUSTOM_EVENT } from '../constants/appContants';
import { checkDuplicatedItem } from '../validates/validates';
import { ItemType, TableItemChangeDetailType, TableItemDeleteDetailType } from '../types/types';

export default class ManageItemController {
  vendingMachine: VendingMachine;
  manageItemView: ManageItemView;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
    this.manageItemView = new ManageItemView();

    this.bindEvents();
  }

  loadPage() {
    const itemList = this.vendingMachine.items;

    this.manageItemView.render(itemList);
  }

  bindEvents() {
    window.addEventListener(CUSTOM_EVENT.ADD_ITEM, this.handleAddItem.bind(this));
    window.addEventListener(CUSTOM_EVENT.TABLE_ITEM_CHANGE, this.handleTableItemChange.bind(this));
    window.addEventListener(CUSTOM_EVENT.TABLE_ITEM_DELETE, this.handleTableItemDelete.bind(this));
  }

  handleAddItem(event: CustomEvent) {
    try {
      const newItem: ItemType = event.detail;
      const { items } = this.vendingMachine;

      checkDuplicatedItem(items, newItem, null);
      this.vendingMachine.addItem(newItem);

      this.manageItemView.clearInput();
      this.manageItemView.repaintItemTable(this.vendingMachine.items);
    } catch (error) {
      alert(error.message);
    }
  }

  handleTableItemChange(event: CustomEvent) {
    try {
      const { item, targetRowIndex, $targetTableRow }: TableItemChangeDetailType = event.detail;
      const { items } = this.vendingMachine;

      checkDuplicatedItem(items, item, targetRowIndex);
      this.vendingMachine.changeItem(targetRowIndex, item);

      this.manageItemView.repaintItemTableRow($targetTableRow, item);
    } catch (error) {
      alert(error.message);
    }
  }

  handleTableItemDelete(event: CustomEvent) {
    const { item }: TableItemDeleteDetailType = event.detail;
    this.vendingMachine.deleteItem(item);
  }
}
