import { PURCHASE_CASH_RULE } from '../../constants';
import { VENDING_MACHINE_MESSAGE } from '../../constants/message';
import { isInvalidNumber } from '../../utils/validator';

const validatePurchaseCash = (cash: number) => {
  if (isInvalidNumber(cash, PURCHASE_CASH_RULE)) {
    throw new Error(VENDING_MACHINE_MESSAGE.ERROR_INVALID_PURCHASE_CASH);
  }
};

export { validatePurchaseCash };
