import { ITEM_ERROR_MESSAGE } from '../constant/errorMessage';
import { ITEM } from '../constant/rule';

type itemInfoType = { itemName: string; itemPrice: number; itemQuantity: number };

interface ItemManageInterface {
  addItem: (itemInfo: itemInfoType) => Object;
  editItem: (itemInfo: itemInfoType, itemIndex: number) => void;
  deleteItem: (itemName: string) => void;
}

class ItemManage implements ItemManageInterface {
  private _itemList: itemInfoType[];

  constructor() {
    this._itemList = [];
  }

  get itemList(): Object[] {
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

  validateItemInput(itemInfo: itemInfoType, isAddMode = true) {
    const testCases = [
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
      if (testCase({ itemInfo, isAddMode })) throw new Error(errorMessage);
      return true;
    });
  }

  private isBlank({ itemInfo: { itemName } }: { itemInfo: itemInfoType }) {
    return itemName.length === 0;
  }
  private isNotNumberType({ itemInfo: { itemPrice, itemQuantity } }: { itemInfo: itemInfoType }) {
    return isNaN(itemPrice) || isNaN(itemQuantity);
  }
  private isExceedMaxNameLength({ itemInfo: { itemName } }: { itemInfo: itemInfoType }) {
    return itemName.length > ITEM.NAME_MAX_LENGTH;
  }
  private isAlreadyExist({
    itemInfo: { itemName },
    isAddMode,
  }: {
    itemInfo: itemInfoType;
    isAddMode: boolean;
  }) {
    return isAddMode && this._itemList.some((savedItem) => savedItem.itemName === itemName);
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
