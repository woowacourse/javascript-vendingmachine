import { COINS_REVERSE } from '../constants';

class Change {
  500 = 0;
  100 = 0;
  50 = 0;
  10 = 0;

  calculateReturnChange({ userInputMoney, chargedCoin, change }) {
    COINS_REVERSE.forEach((coin) => {
      const quotient = String(userInputMoney.getAmount() / coin);
      const maxReturnCount = parseInt(quotient);
      const returnableChange = chargedCoin[coin];

      if (maxReturnCount >= returnableChange) {
        this.returnReturnableCountsCoin({ userInputMoney, chargedCoin, returnableChange, coin, change });
        return;
      }
      this.returnMaximumCountsCoin({ userInputMoney, chargedCoin, maxReturnCount, coin, change });
    });
  }

  private returnReturnableCountsCoin({ userInputMoney, chargedCoin, returnableChange, coin, change }) {
    userInputMoney.subtractMoney(returnableChange * coin);
    change[coin] = returnableChange;
    chargedCoin.subtractCoin(coin, returnableChange);
  }

  private returnMaximumCountsCoin({ userInputMoney, chargedCoin, maxReturnCount, coin, change }) {
    userInputMoney.subtractMoney(maxReturnCount * coin);
    change[coin] = maxReturnCount;
    chargedCoin.subtractCoin(coin, maxReturnCount);
  }
}

export default Change;
