import { $ } from 'Utils';
import { validateHoldingAmountToAdd } from 'Utils/VendingMachine/validator';
import HoldingAmountStore from 'Store/HoldingAmountStore';
import Component from 'Components/Abstract';
import AmountInputForm from 'Components/@Shared/AmountInputForm';

export default class AddHoldingAmountForm extends Component {
  subscribeStore = [HoldingAmountStore];

  constructor(props) {
    super(props);

    this.renderMethodList = {
      holdingCoins: [this.drawTotalHoldingAmount],
    };
  }

  template() {
    return this.createChildComponent<IAmountInputProps>(AmountInputForm, {
      formLabel: '자판기가 보유할 금액을 입력해주세요',
      totalAmountText: '현재 보유 금액',
      onAddAmount: this.handleAddAmount,
    });
  }

  handleAddAmount(userInput: number) {
    const totalAmount = HoldingAmountStore.getTotalAmount();

    try {
      validateHoldingAmountToAdd(userInput, totalAmount);
    } catch (error) {
      alert(error.message);
      return false;
    }

    HoldingAmountStore.addHoldingAmount(userInput);
    return true;
  }

  drawTotalHoldingAmount = () => {
    const totalAmount = HoldingAmountStore.getTotalAmount();
    $('#total-holding-amount', this.$component).innerText = `${totalAmount.toLocaleString()}원`;
  };
}
