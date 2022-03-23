import ItemManageView from '../views/itemManageView';

export default class ItemManageController {
  vendingMachine: any;
  itemManageView: any;

  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;
    this.itemManageView = new ItemManageView();
  }

  render() {
    const itemList = this.vendingMachine.getItems();
    this.itemManageView.render(itemList);
  }
}
