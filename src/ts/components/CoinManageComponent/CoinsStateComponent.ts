import { on } from '../../dom';

export default class CoinsStateComponent {
  $coin500 = document.querySelector('.coin-quantity-table__coin-500');
  $coin100 = document.querySelector('.coin-quantity-table__coin-100');
  $coin50 = document.querySelector('.coin-quantity-table__coin-50');
  $coin10 = document.querySelector('.coin-quantity-table__coin-10');

  constructor(private vendingMachineCoinManager) {
    on(
      document.querySelector('.charge-form-section__button'),
      '@chargeInputSubmit',
      this.render
    );
  }

  render = ({
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
