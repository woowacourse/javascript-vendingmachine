import { MESSAGE } from '../../constants';
import CoinManagement from '../../domain/CoinManagement';
import MoneyManagement from '../../domain/MoneyManagement';
import { showSnackbar } from '../../utils';
import { $, replaceHTML } from '../../utils/dom';

export default class CoinReturnComponent {
  #coinManagement: CoinManagement;
  #moneyManagement: MoneyManagement;

  constructor(
    readonly coinManagement: CoinManagement,
    readonly moneyManagement: MoneyManagement,
  ) {
    this.#coinManagement = coinManagement;
    this.#moneyManagement = moneyManagement;
    this.render();

    $('.coin-return__button').addEventListener('click', this.#returnHandler);
  }

  render() {
    replaceHTML($('.coin-return__container'), this.#template());
  }

  #template() {
    const baseTemplate = `
      <div class="coin-return__item grid-item grid-header">동전</div>
      <div class="coin-return__item grid-item grid-header">개수</div>
    `;

    const { returnedCoins } = this.#moneyManagement;

    const coinsTemplate = Object.keys(returnedCoins)
      .reverse()
      .map(
        type => `
        <div class="coin-return__item grid-item">${type}원</div>
        <div class="coin-return__item grid-item">${returnedCoins[type]}개</div>
      `,
      )
      .join('');

    return baseTemplate + coinsTemplate;
  }

  #returnHandler = () => {
    const returnableCoins = this.#moneyManagement.returnCoins(
      this.#coinManagement.coins,
    );
    if (this.#moneyManagement.money > 0) showSnackbar(MESSAGE.NOT_ENOUGH_COINS);

    this.#coinManagement.subtractCoins(returnableCoins);

    $('.money-charge__total-money').innerText = String(
      this.#moneyManagement.money,
    );
    this.render();
  };
}
