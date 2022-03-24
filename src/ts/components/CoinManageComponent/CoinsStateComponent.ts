import { on, $ } from '../../dom';

export default class CoinsStateComponent {
  private $coin500 = $('.coin-quantity-table__coin-500');
  private $coin100 = $('.coin-quantity-table__coin-100');
  private $coin50 = $('.coin-quantity-table__coin-50');
  private $coin10 = $('.coin-quantity-table__coin-10');

  constructor(private vendingMachineCoinManager) {
    on($('.charge-form-section__button'), '@chargeInputSubmit', this.render);
  }

  private render = ({
    detail: {
      coins: { coin500, coin100, coin50, coin10 },
    },
  }) => {
    this.$coin500.textContent = coin500;
    this.$coin100.textContent = coin100;
    this.$coin50.textContent = coin50;
    this.$coin10.textContent = coin10;
  };
}
