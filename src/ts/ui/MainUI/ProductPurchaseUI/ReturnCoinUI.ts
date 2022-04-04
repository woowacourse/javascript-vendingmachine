import { COIN_TYPE } from '../../../constants';
import { MESSAGE } from '../../../constants/message';
import { showSnackbar } from '../../../utils';
import { $, replaceHTML } from '../../../utils/dom';
import { viewPainter } from '../../ViewPainter';

export default class ReturnCoinUI {
  private coinDomain;
  private purchaseCashDomain;

  constructor(coinDomain, purchaseCashDomain) {
    this.coinDomain = coinDomain;
    this.purchaseCashDomain = purchaseCashDomain;

    const emptyCoins = COIN_TYPE.reduce((obj, type) => {
      obj[type] = 0;
      return obj;
    }, {});
    this.render(emptyCoins);

    $('.return-coin__button').addEventListener(
      'click',
      this.returnButtonClickHandler,
    );
  }

  render(coins) {
    replaceHTML($('.return-coin__container'), this.template(coins));
  }

  private template(coins) {
    const baseTemplate = `
      <div class="return-coin__item grid-item grid-header">동전</div>
      <div class="return-coin__item grid-item grid-header">개수</div>
    `;

    const coinsTemplate = Object.keys(coins)
      .reverse()
      .map(
        type => `
          <div class="return-coin__item grid-item">${type}원</div>
          <div class="return-coin__item grid-item">${coins[type]}개</div>
        `,
      )
      .join('');

    return baseTemplate + coinsTemplate;
  }

  private returnButtonClickHandler = () => {
    if (this.purchaseCashDomain.cash <= 0) {
      showSnackbar(MESSAGE.FAIL_RETURN_COINS);
      return;
    }

    const returnCoins = this.purchaseCashDomain.returnCoins(
      this.coinDomain.coins,
    );

    this.coinDomain.subCoins(returnCoins);

    this.render(returnCoins);
    viewPainter.renderPurchaseCash();
    showSnackbar(MESSAGE.SUCCESS_RETURN_COINS);
  };
}
