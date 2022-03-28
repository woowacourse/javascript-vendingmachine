import { CASH_RULE, MESSAGE } from '../../constants';
import { isInvalidNumber } from '../../utils/validator';

const validateCash = (cash: number) => {
  if (isInvalidNumber(cash, CASH_RULE)) {
    throw new Error(MESSAGE.ERROR_INVALID_CASH);
  }
  return true;
};

export { validateCash };
