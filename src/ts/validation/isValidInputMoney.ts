import { INPUT_MONEY_RULES, ALERT_MESSAGE } from '../constants';

export const isValidInputMoney = (inputMoney: number) => {
  if (
    inputMoney < INPUT_MONEY_RULES.MIN ||
    inputMoney > INPUT_MONEY_RULES.MAX
  ) {
    alert(ALERT_MESSAGE.INPUT_MONEY_RANGE);
    return false;
  }

  if (inputMoney % INPUT_MONEY_RULES.MOD_UNIT !== 0) {
    alert(ALERT_MESSAGE.INPUT_MONEY_MOD);
    return false;
  }

  return true;
};
