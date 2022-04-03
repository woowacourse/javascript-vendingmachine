import { $, emit, on } from '../../dom/domHelper';

export default class ConsumerReturnCoinStateComponent {
  private $returnCoinButton = $<HTMLButtonElement>(
    '.return-coin-quantity-section__return-button'
  );
  private $returnCoinQuantity500 = $<HTMLSpanElement>(
    '.return-coin-quantity-table__coin-500'
  );
  private $returnCoinQuantity100 = $<HTMLSpanElement>(
    '.return-coin-quantity-table__coin-100'
  );
  private $returnCoinQuantity50 = $<HTMLSpanElement>(
    '.return-coin-quantity-table__coin-50'
  );
  private $returnCoinQuantity10 = $<HTMLSpanElement>(
    '.return-coin-quantity-table__coin-10'
  );

  constructor(
    private vendingMachineChargeMoneyManager,
    private vendingMachineConsumerMoneyManager
  ) {
    on(this.$returnCoinButton, 'click', this.onClickReturnCoinButton);
  }

  onClickReturnCoinButton = () => {
    const {
      QUANTITY_COIN_500,
      QUANTITY_COIN_100,
      QUANTITY_COIN_50,
      QUANTITY_COIN_10,
    } = this.vendingMachineChargeMoneyManager.getReturnCoins(
      this.vendingMachineConsumerMoneyManager.getConsumerChargeMoney()
    );

    this.vendingMachineConsumerMoneyManager.initConsumerChargeMoney();

    this.$returnCoinQuantity500.textContent = QUANTITY_COIN_500;
    this.$returnCoinQuantity100.textContent = QUANTITY_COIN_100;
    this.$returnCoinQuantity50.textContent = QUANTITY_COIN_50;
    this.$returnCoinQuantity10.textContent = QUANTITY_COIN_10;

    emit(this.$returnCoinButton, '@initTotalChargeMoney');
    emit(this.$returnCoinButton, '@replaceCoinQuantity');
    emit(this.$returnCoinButton, '@replaceTotalChargeMoney');
  };
}
