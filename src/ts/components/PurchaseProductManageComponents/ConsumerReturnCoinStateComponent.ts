import { $, emit, on } from '../../dom/domHelper';
import renderSnackBar from '../../dom/snackBar';
import SUCCESS_MESSAGE from '../../constants/successMessage';
import { checkCanReturnCoins } from '../../validation/checkConsumerChargeMoney';

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

      checkCanReturnCoins(consumerChargeMoney);

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
        SUCCESS_MESSAGE.RETURN_COINS,
        'success'
      );

      emit(this.$returnCoinButton, '@initConsumerTotalChargeMoney');
      emit(this.$returnCoinButton, '@replaceCoinQuantity');
      emit(this.$returnCoinButton, '@replaceTotalChargeMoney');
    } catch ({ message }) {
      renderSnackBar(this.$snackBarContainer, message, 'error');
    }
  };
}
