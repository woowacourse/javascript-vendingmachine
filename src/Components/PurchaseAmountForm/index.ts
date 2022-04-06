import { $ } from 'Utils';
import Component from 'Components/Abstract';
import AmountInputForm from 'Components/@Shared/AmountInputForm';
import HoldingAmountStore from 'Store/HoldingAmountStore';
import { validateHoldingAmountToAdd } from 'Utils/VendingMachine/validator';

export default class PurchaseAmountForm extends Component {
  subscribeStore = [HoldingAmountStore];

  constructor(props) {
    super(props);

    this.renderMethodList = {
      chargedAmount: [this.drawChargedAmount],
    };
  }

  template() {
    return this.createChildComponent<IAmountInputProps>(AmountInputForm, {
      formLabel: '상품을 구매할 금액을 투입해주세요.',
      totalAmountText: '투입한 금액',
      onAddAmount: this.handleAddAmount,
    });
  }

  handleAddAmount(userInput: number) {
    HoldingAmountStore.updateChargeAmount('charge', userInput);
    return true;
  }

  drawChargedAmount = () => {
    const { chargedAmount } = HoldingAmountStore.getState();
    $('#total-holding-amount', this.$component).innerText = `${chargedAmount.toLocaleString()}원`;
  };
}
