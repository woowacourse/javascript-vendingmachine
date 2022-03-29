import ManageItemView from '../views/mangeItemView';
import VendingMachine from '../vendingMachine/vendingMachine';
import { CUSTOM_EVENT } from '../constants/appContants';
import { checkDuplicatedItem, validateAddItemInput } from '../validates/validates';
import { ItemType, TableItemChangeDetailType, TableItemDeleteDetailType } from '../types/types';

export default class ManageItemController {
  vendingMachine: VendingMachine;
  manageItemView: ManageItemView;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
    this.manageItemView = new ManageItemView();

    window.addEventListener(CUSTOM_EVENT.ADD_ITEM, this.handleAddItem.bind(this));
    window.addEventListener(CUSTOM_EVENT.TABLE_ITEM_CHANGE, this.handleTableItemChange.bind(this));
    window.addEventListener(CUSTOM_EVENT.TABLE_ITEM_DELETE, this.handleTableItemDelete.bind(this));
  }

  loadPage() {
    const itemList = this.vendingMachine.items;

    this.manageItemView.render(itemList);
  }

  handleAddItem(event: CustomEvent) {
    try {
      const newItem: ItemType = event.detail.item;
      const { items } = this.vendingMachine;

      validateAddItemInput(newItem);
      checkDuplicatedItem(items, newItem, null);

      this.vendingMachine.addItem(newItem);
      this.manageItemView.clearInput();
      this.manageItemView.appendItemTableRow(newItem);
    } catch (error) {
      alert(error.message);
    }
  }

  handleTableItemChange(event: CustomEvent) {
    try {
      const { item, targetRowIndex, $targetTableRow }: TableItemChangeDetailType = event.detail;
      const { items } = this.vendingMachine;

      validateAddItemInput(item);
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
