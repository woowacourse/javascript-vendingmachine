import { on, $ } from '../../dom/domHelper';

export default class ChargeMoneyStateComponent {
  private $quantityCoin500 = $<HTMLSpanElement>(
    '.coin-quantity-table__coin-500'
  );
  private $quantityCoin100 = $<HTMLSpanElement>(
    '.coin-quantity-table__coin-100'
  );
  private $quantityCoin50 = $<HTMLSpanElement>('.coin-quantity-table__coin-50');
  private $quantityCoin10 = $<HTMLSpanElement>('.coin-quantity-table__coin-10');

  constructor() {
    on(
      $<HTMLButtonElement>('.charge-form-section__button'),
      '@chargeInputSubmit',
      this.addCoinsQuantity
    );
  }

  private addCoinsQuantity = ({
    detail: {
      coins: {
        QUANTITY_COIN_500,
        QUANTITY_COIN_100,
        QUANTITY_COIN_50,
        QUANTITY_COIN_10,
      },
    },
  }) => {
    this.$quantityCoin500.textContent = QUANTITY_COIN_500;
    this.$quantityCoin100.textContent = QUANTITY_COIN_100;
    this.$quantityCoin50.textContent = QUANTITY_COIN_50;
    this.$quantityCoin10.textContent = QUANTITY_COIN_10;
  };
}
