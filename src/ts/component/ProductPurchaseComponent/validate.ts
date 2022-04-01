import { MESSAGE, MONEY_RULE } from '../../constants';
import { isInvalidNumber } from '../../utils/validator';

const validateMoney = (money: number) => {
  if (isInvalidNumber(money, MONEY_RULE)) {
    throw new Error(MESSAGE.ERROR_INVALID_MONEY);
  }
  return true;
};

export { validateMoney };
