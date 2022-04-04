import { $, emit, on } from '../../dom/domHelper';
import renderSnackBar from '../../dom/snackBar';

export default class ConsumerReturnCoinStateComponent {
  private $snackBarContainer = $<HTMLElement>('.snack-bar-container');
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
    try {
      const consumerChargeMoney =
        this.vendingMachineConsumerMoneyManager.getConsumerChargeMoney();

      if (consumerChargeMoney <= 0) {
        throw new Error('반환할 동전이 없습니다.');
      }

      const {
        QUANTITY_COIN_500,
        QUANTITY_COIN_100,
        QUANTITY_COIN_50,
        QUANTITY_COIN_10,
      } =
        this.vendingMachineChargeMoneyManager.getReturnCoins(
          consumerChargeMoney
        );

      this.vendingMachineConsumerMoneyManager.initConsumerChargeMoney();

      this.$returnCoinQuantity500.textContent = QUANTITY_COIN_500;
      this.$returnCoinQuantity100.textContent = QUANTITY_COIN_100;
      this.$returnCoinQuantity50.textContent = QUANTITY_COIN_50;
      this.$returnCoinQuantity10.textContent = QUANTITY_COIN_10;

      renderSnackBar(
        this.$snackBarContainer,
        '동전이 반환되었습니다. 동전을 확인해주세요.',
        'success'
      );

      emit(this.$returnCoinButton, '@initTotalChargeMoney');
      emit(this.$returnCoinButton, '@replaceCoinQuantity');
      emit(this.$returnCoinButton, '@replaceTotalChargeMoney');
    } catch ({ message }) {
      renderSnackBar(this.$snackBarContainer, message, 'error');
    }
  };
}
