//vendinMachine
type ItemType = { name: string; price: string; quantity: string };
export default class VendingMachine {
  private items: ItemType[] = [];

  constructor() {}

  getItems() {
    return JSON.parse(JSON.stringify(this.items));
  }

  setItems(newItems: ItemType[]) {
    this.items = newItems;
  }

  addItem({ name, price, quantity }: ItemType) {
    const newItems = [...this.items, { name, price, quantity }];
    this.setItems(newItems);
  }

  changeItem(index: number, { name, price, quantity }: ItemType) {
    const newItems = this.getItems();
    newItems[index] = { name, price, quantity };
    this.setItems(newItems);
  }

  // 잔돈 충전 탭에서 최초 자판기가 보유한 금액은 0원이며, 각 동전의 개수는 0개이다.
  // 생성자 단에서 잔돈, 동전의 개수

  // 잔돈 충전 입력 요소에 충전할 금액을 입력한 후, 충전하기 버튼을 눌러 자판기 보유 금액을 충전할 수 있다.
  // charge money

  // 자판기 보유 금액만큼의 동전이 무작위로 생성된다.
  // random 함수 의존성에 생각

  // 자판기 보유 금액을 누적하여 충전할 수 있다. 추가 충전 금액만큼의 동전이 무작위로 생성되어 기존 동전들에 더해진다.
  // chare money 로 대체 가능한지 고민

  // 현재 자판기가 가지고 있는 금액을 확인할 수 있다.
  // get
}
