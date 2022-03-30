import ManageItemView from '../views/mangeItemView';
import VendingMachine from '../vendingMachine/vendingMachine';
import { CONFIRM_MESSAGE } from '../constants/confirmConstants';
import { CUSTOM_EVENT } from '../constants/appContants';
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

      this.vendingMachine.changeItem(targetRowIndex, item);
      this.manageItemView.repaintItemTableRow($targetTableRow, item);
    } catch (error) {
      alert(error.message);
    }
  }

  handleTableItemDelete(event: CustomEvent) {
    const { item }: TableItemDeleteDetailType = event.detail;
    if (window.confirm(CONFIRM_MESSAGE.DELETE)) {
      this.vendingMachine.deleteItem(item);
    }
  }
}
