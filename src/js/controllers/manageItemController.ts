import ManageItemView from '../views/mangeItem/mangeItemView';

export default class ManageItemController {
  vendingMachine: any;
  ManageItemView: any;

  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;
    this.ManageItemView = new ManageItemView();
  }

  render() {
    const itemList = this.vendingMachine.getItems();
    this.ManageItemView.render(itemList);
  }
}
