import ManageItemView from '../views/mangeItemView';
import VendingMachine from '../vendingMachine/vendingMachine';
import { checkDuplicatedItem } from '../validates/validates';
import { ItemType, TableItemChangeDetailType, TableItemDeleteDetailType } from '../types';
import { Controller } from '../types/interface';
import { onCustomEvent, showSnackBar } from '../utils/common';
import { SNACK_BAR_MESSAGE } from '../constants/constants';

export default class ManageItemController implements Controller {
  private vendingMachine: VendingMachine;
  private manageItemView: ManageItemView;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
    this.manageItemView = new ManageItemView();

    this.bindEvents();
  }

  bindEvents() {
    onCustomEvent('ADD_ITEM', this.handleAddItem.bind(this));
    onCustomEvent('TABLE_ITEM_CHANGE', this.handleTableItemChange.bind(this));
    onCustomEvent('TABLE_ITEM_DELETE', this.handleTableItemDelete.bind(this));
  }

  handleAddItem(event: CustomEvent) {
    try {
      const newItem: ItemType = event.detail;
      const items = this.vendingMachine.getItems();

      checkDuplicatedItem(items, newItem, null);
      this.vendingMachine.addItem(newItem);

      this.manageItemView.clearInput();
      this.manageItemView.repaintItemTable(this.vendingMachine.getItems());

      showSnackBar(SNACK_BAR_MESSAGE.ITEM_ADDED);
    } catch (error) {
      alert(error.message);
    }
  }

  handleTableItemChange(event: CustomEvent) {
    try {
      const { item, targetRowIndex, $targetTableRow }: TableItemChangeDetailType = event.detail;
      const items = this.vendingMachine.getItems();

      checkDuplicatedItem(items, item, targetRowIndex);
      this.vendingMachine.changeItem(targetRowIndex, item);

      this.manageItemView.repaintItemTableRow($targetTableRow, item);

      showSnackBar(SNACK_BAR_MESSAGE.ITEM_EDITED);
    } catch (error) {
      alert(error.message);
    }
  }

  handleTableItemDelete(event: CustomEvent) {
    const { item }: TableItemDeleteDetailType = event.detail;
    this.vendingMachine.deleteItem(item);
  }

  loadPage(isLogin) {
    const itemList = this.vendingMachine.getItems();

    this.manageItemView.render(isLogin, itemList);
  }
}
