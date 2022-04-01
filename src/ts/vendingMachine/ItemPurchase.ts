import { MONEY_ERROR_MESSAGE } from '../constant/errorMessage';
import { MONEY } from '../constant/rule';

class ItemPurchase {
  validateMoneyInput(moneyInput: number) {
    if (this.isNotNumberTypeMoney(moneyInput)) {
      throw new Error(MONEY_ERROR_MESSAGE.NOT_NUMBER_TYPE);
    }

    if (this.isExceedTotalAmountRange(moneyInput)) {
      throw new Error(MONEY_ERROR_MESSAGE.EXCEED_TOTAL_AMOUNT_RANGE);
    }

    if (this.isNotDividedByUnitCash(moneyInput)) {
      throw new Error(MONEY_ERROR_MESSAGE.NOT_DIVIDED_BY_UNIT);
    }
  }

  private isNotNumberTypeMoney(moneyInput: number) {
    return isNaN(moneyInput);
  }
  private isExceedTotalAmountRange(moneyInput: number) {
    return moneyInput < MONEY.MIN || moneyInput > MONEY.MAX;
  }
  private isNotDividedByUnitCash(moneyInput: number) {
    return moneyInput % MONEY.UNIT !== 0;
  }
}

export default ItemPurchase;
