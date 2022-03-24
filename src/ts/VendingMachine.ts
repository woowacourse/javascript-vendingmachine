interface VendingMachineInterface {
  itemList: Array<Object>;
  coinCollection: Object;

  addItem: (itemName: string, itemPrice: number, itemQuantity: number) => void;
  editItem: (itemName: string, itemPrice: number, itemQuantity: number, itemIndex: number) => void;
  deleteItem: (itemName: string) => void;
  buyItem: () => void;

  chargeCoin: (rechargeCoin: number) => void;
  calculateTotalCoinAmount: () => number;
}

class VendingMachine implements VendingMachineInterface {
  itemList: { itemName: string; itemPrice: number; itemQuantity: number }[];
  coinCollection: Object;

  constructor() {
    this.itemList = [];
    this.coinCollection = {
      500: 0,
      100: 0,
      50: 0,
      10: 0,
    };
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

  chargeCoin(rechargeCoin) {
    let candidateCoins = [500, 100, 50, 10];
    let remainCoin = rechargeCoin;

    while (remainCoin !== 0) {
      if (50 > remainCoin) {
        candidateCoins = [10];
      } else if (100 > remainCoin) {
        candidateCoins = [50, 10];
      } else if (500 > remainCoin) {
        candidateCoins = [100, 50, 10];
      }

      const selectedCoin = candidateCoins[Math.floor(Math.random() * candidateCoins.length)];
      this.coinCollection[selectedCoin]++;
      remainCoin -= selectedCoin;
    }
  }

  calculateTotalCoinAmount() {
    return Object.entries(this.coinCollection).reduce(
      (prev, [key, value]) => prev + Number(key) * value,
      0
    );
  }

  validateItemInput(
    itemName: string,
    itemPrice: number,
    itemQuantity: number,
    isAddMode: boolean = true
  ) {
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
  }

  validateCashInput(rechargedCash: number) {
    if (isNaN(rechargedCash)) {
      throw new Error('숫자를 입력해주세요.');
    }

    if (rechargedCash < 10) {
      throw new Error('충전할 금액은 10원 이상이여야 합니다.');
    }

    if (rechargedCash > 100000 - this.calculateTotalCoinAmount()) {
      throw new Error('보유할 수 있는 최소 금액은 0원, 최대 금액은 100,000원입니다.');
    }

    if (rechargedCash % 10 !== 0) {
      throw new Error('잔돈은 10원으로 나누어 떨어져야 합니다.');
    }
  }
}

export default VendingMachine;
