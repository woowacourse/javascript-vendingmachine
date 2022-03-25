import { on, $ } from '../../dom';

export default class CoinsStateComponent {
  private $coin500 = $('.coin-quantity-table__coin-500');
  private $coin100 = $('.coin-quantity-table__coin-100');
  private $coin50 = $('.coin-quantity-table__coin-50');
  private $coin10 = $('.coin-quantity-table__coin-10');

  constructor() {
    on($('.charge-form-section__button'), '@chargeInputSubmit', this.render);
  }

  private render = ({
    detail: {
      coins: { COIN_500, COIN_100, COIN_50, COIN_10 },
    },
  }) => {
    this.$coin500.textContent = COIN_500;
    this.$coin100.textContent = COIN_100;
    this.$coin50.textContent = COIN_50;
    this.$coin10.textContent = COIN_10;
  };
}
