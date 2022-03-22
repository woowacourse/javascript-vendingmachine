interface VendingMachineInterface {
    itemList: Array<Object>;
    coinCollection: Object;

    addItem: (item: Object) => void;
    buyItem: () => void;
    deleteItem: () => void;

    chargeCoin: () => void;
    genreageRandomCoin: () => void;
}

class VendingMachine implements VendingMachineInterface {
    itemList: Object[];
    coinCollection: {};
    
    constructor() {
        this.itemList = [];
        this.coinCollection = {};
    }

    addItem() {
        
    }

    buyItem() {}

    deleteItem() {}

    chargeCoin() {}

    genreageRandomCoin() {}

    validateItemInput = (itemName: string, itemPrice: number, itemQuantity: number) => {
        if(!itemName || !itemPrice || !itemQuantity) {
          throw new Error('빈칸 없이 모두 입력해주세요.');
        }
      
        if (itemName.length > 10) {
          throw new Error('상품명은 최대 10글자까지 가능합니다.');
        }
      
        if (itemPrice < 100 || itemPrice > 10000) {
          throw new Error('상품 가격은 100원 이상, 10,000원 이하여야 합니다.');
        }
      
        if (itemPrice % 10 !== 0) {
          throw new Error('상품 가격은 10원으로 나누어 떨어져야 합니다.');
        }
      
        if (itemQuantity < 1 || itemQuantity > 20) {
          throw new Error('상품 수량은 최대 20개까지 넣을 수 있습니다.');
        }
      }
}

export default new VendingMachine();
