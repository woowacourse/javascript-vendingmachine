import { $ } from '../../dom';
import { on } from '../../events';

export default class CoinsStateComponent {
  private $coin500: HTMLSpanElement = $('.coin-quantity-table__coin-500');
  private $coin100: HTMLSpanElement = $('.coin-quantity-table__coin-100');
  private $coin50: HTMLSpanElement = $('.coin-quantity-table__coin-50');
  private $coin10: HTMLSpanElement = $('.coin-quantity-table__coin-10');

  constructor(private vendingMachineCoinManager) {
    on($('.charge-form-section__form'), '@chargeInputSubmit', this.render);
  }

  render = () => {
    const { COIN_500, COIN_100, COIN_50, COIN_10 } =
      this.vendingMachineCoinManager.getCoins();
    this.$coin500.textContent = COIN_500;
    this.$coin100.textContent = COIN_100;
    this.$coin50.textContent = COIN_50;
    this.$coin10.textContent = COIN_10;
  };
}
