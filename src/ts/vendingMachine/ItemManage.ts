import { ITEM_ERROR_MESSAGE } from '../constant/errorMessage';
import { ITEM } from '../constant/rule';

type itemInfoType = { itemName: string; itemPrice: number; itemQuantity: number };

type TestCaseParamType = {
  itemInfo: itemInfoType;
  itemIndex: number;
  isAddMode: boolean;
};

type TestCaseType = {
  testCase: (testCaseParams: Partial<TestCaseParamType>) => boolean;
  errorMessage: string;
};

interface ItemManageInterface {
  addItem: (itemInfo: itemInfoType) => itemInfoType;
  editItem: (itemInfo: itemInfoType, itemIndex: number) => void;
  deleteItem: (itemName: string) => void;
}

class ItemManage implements ItemManageInterface {
  private _itemList: itemInfoType[];

  constructor() {
    this._itemList = [];
  }

  get itemList(): itemInfoType[] {
    return this._itemList;
  }

  addItem(itemInfo: itemInfoType) {
    this._itemList = [...this._itemList, itemInfo];
    return itemInfo;
  }

  deleteItem(itemName: string) {
    this._itemList = this._itemList.filter((savedItem) => savedItem.itemName !== itemName);
  }

  editItem(itemInfo: itemInfoType, itemIndex: number) {
    this._itemList[itemIndex] = itemInfo;
  }

  decreaseItemQuantity(targetItemIndex: number) {
    this._itemList[targetItemIndex].itemQuantity -= 1;
  }

  validateItemInput(itemInfo: itemInfoType, itemIndex = 0, isAddMode = true) {
    const testCases: TestCaseType[] = [
      { testCase: this.isBlank, errorMessage: ITEM_ERROR_MESSAGE.BLANK_NOT_ALLOWED },
      { testCase: this.isNotNumberType, errorMessage: ITEM_ERROR_MESSAGE.NOT_NUMBER_TYPE },
      {
        testCase: this.isExceedMaxNameLength,
        errorMessage: ITEM_ERROR_MESSAGE.ITEM_NAME_MAX_LENGTH,
      },
      { testCase: this.isAlreadyExist.bind(this), errorMessage: ITEM_ERROR_MESSAGE.ALREADY_EXIST },
      { testCase: this.isExceedPriceRange, errorMessage: ITEM_ERROR_MESSAGE.EXCEED_PRICE_RANGE },
      {
        testCase: this.isNotDividedByPriceUnit,
        errorMessage: ITEM_ERROR_MESSAGE.NOT_DIVIDED_BY_UNIT,
      },
      {
        testCase: this.isExceedQuantityRange,
        errorMessage: ITEM_ERROR_MESSAGE.EXCEED_QUANTITY_RANGE,
      },
    ];

    testCases.every(({ testCase, errorMessage }) => {
      if (testCase({ itemInfo, itemIndex, isAddMode })) throw new Error(errorMessage);
      return true;
    });
  }

  private isBlank({ itemInfo: { itemName } }: { itemInfo: itemInfoType }) {
    return itemName.length === 0;
  }

  private isNotNumberType({ itemInfo: { itemPrice, itemQuantity } }: { itemInfo: itemInfoType }) {
    return Number.isNaN(itemPrice) || Number.isNaN(itemQuantity);
  }

  private isExceedMaxNameLength({ itemInfo: { itemName } }: { itemInfo: itemInfoType }) {
    return itemName.length > ITEM.NAME_MAX_LENGTH;
  }

  private isAlreadyExist({ itemInfo: { itemName }, itemIndex, isAddMode }: TestCaseParamType) {
    const isExistItemName = this._itemList.some((savedItem) => savedItem.itemName === itemName);
    if (isAddMode) return isExistItemName;
    return this._itemList[itemIndex].itemName !== itemName && isExistItemName;
  }

  private isExceedPriceRange({ itemInfo: { itemPrice } }: { itemInfo: itemInfoType }) {
    return itemPrice < ITEM.MIN_PRICE || itemPrice > ITEM.MAX_PRICE;
  }

  private isNotDividedByPriceUnit({ itemInfo: { itemPrice } }: { itemInfo: itemInfoType }) {
    return itemPrice % ITEM.PRICE_UNIT !== 0;
  }

  private isExceedQuantityRange({ itemInfo: { itemQuantity } }: { itemInfo: itemInfoType }) {
    return itemQuantity < ITEM.MIN_QUANTITY || itemQuantity > ITEM.MAX_QUANTITY;
  }
}

export default ItemManage;
