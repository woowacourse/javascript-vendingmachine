interface VendingMachineInterface {
  itemList: Array<Object>;
  coinCollection: Object;

  addItem: (itemName: string, itemPrice: number, itemQuantity: number) => void;
  editItem: (itemName: string, itemPrice: number, itemQuantity: number, itemIndex: number) => void;
  deleteItem: (itemName: string) => void;
  buyItem: () => void;

  chargeCoin: () => void;
  genreageRandomCoin: () => void;
}

class VendingMachine implements VendingMachineInterface {
  itemList: { itemName: string; itemPrice: number; itemQuantity: number }[];
  coinCollection: Object;

  constructor() {
    this.itemList = [];
    this.coinCollection = {};
  }

  addItem(itemName: string, itemPrice: number, itemQuantity: number) {
    const newItem = { itemName, itemPrice, itemQuantity };
    this.itemList = [...this.itemList, newItem];

    return newItem;
  }

  buyItem() {}

  deleteItem(itemName: string) {
    this.itemList = this.itemList.filter((savedItem) => savedItem.itemName !== itemName);
  }

  editItem(itemName: string, itemPrice: number, itemQuantity: number, itemIndex: number) {
    this.itemList[itemIndex] = { itemName, itemPrice, itemQuantity };
  }

  chargeCoin() {}

  genreageRandomCoin() {}

  validateItemInput = (
    itemName: string,
    itemPrice: number,
    itemQuantity: number,
    isAddMode: boolean = true
  ) => {
    if (itemName.length === 0) {
      throw new Error('빈칸 없이 모두 입력해주세요.');
    }

    if (isNaN(itemPrice) || isNaN(itemQuantity)) {
      throw new Error('가격과 수량은 숫자로 입력해주세요.');
    }

    if (itemName.length > 10) {
      throw new Error('상품명은 최대 10글자까지 가능합니다.');
    }

    if (isAddMode && this.itemList.some((savedItem) => savedItem.itemName === itemName)) {
      throw new Error('이미 등록된 상품입니다. 수정을 원한다면 수정 기능을 이용해주세요.');
    }

    if (itemPrice < 100 || itemPrice > 10000) {
      throw new Error('상품 가격은 100원 이상, 10,000원 이하여야 합니다.');
    }

    if (itemPrice % 10 !== 0) {
      throw new Error('상품 가격은 10원으로 나누어 떨어져야 합니다.');
    }

    if (itemQuantity < 1 || itemQuantity > 20) {
      throw new Error('상품 수량은 최소 1개부터 최대 20개까지 넣을 수 있습니다.');
    }
  };
}

export default VendingMachine;
