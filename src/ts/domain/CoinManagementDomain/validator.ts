import { CASH_RULE } from '../../constants';
import { MESSAGE } from '../../constants/message';
import { isInvalidNumber } from '../../utils/validator';

const validateCash = (cash: number) => {
  if (isInvalidNumber(cash, CASH_RULE)) {
    throw new Error(MESSAGE.ERROR_INVALID_CASH);
  }
};

export { validateCash };
