import vendingMachine from '../model/VendingMachine';
import template from '../template';

export default class ChangeAdd {
  $inputSection: HTMLElement;
  $contentsContainer: HTMLElement;
  $changeAddForm: HTMLElement;
  $totalChange: HTMLElement;
  $changeList: HTMLElement;
  $amountCoin500: HTMLElement;
  $amountCoin100: HTMLElement;
  $amountCoin50: HTMLElement;
  $amountCoin10: HTMLElement;

  constructor() {
    this.$inputSection = document.querySelector('.input-section');
    this.$contentsContainer = document.querySelector('.contents-container');
  }

  render() {
    this.$inputSection.insertAdjacentHTML('beforeend', template.changeAddContainer());
    this.$contentsContainer.insertAdjacentHTML('beforeend', template.changeListWrapper());

    this.$changeAddForm = this.$inputSection.querySelector('#change-add-form');
    this.$totalChange = this.$inputSection.querySelector('#total-change');
    this.$changeList = this.$contentsContainer.querySelector('#change-list');

    this.$amountCoin500 = this.$changeList.querySelector('#amount-coin-500');
    this.$amountCoin100 = this.$changeList.querySelector('#amount-coin-100');
    this.$amountCoin50 = this.$changeList.querySelector('#amount-coin-50');
    this.$amountCoin10 = this.$changeList.querySelector('#amount-coin-10');

    this.$changeAddForm.addEventListener('submit', this.onSubmitChangeAdd);

    this.refreshChange();
  }

  onSubmitChangeAdd = (e: SubmitEvent) => {
    e.preventDefault();
    const inputChange = parseInt((<HTMLInputElement>this.$changeAddForm.querySelector('#change-add-input')).value);

    try {
      vendingMachine.addChange(inputChange);
      this.refreshChange();
    } catch (message) {
      alert(message);
    }
  };

  refreshChange() {
    this.$totalChange.textContent = vendingMachine.getTotalMoney().toString();
    const { coin10, coin50, coin100, coin500 } = vendingMachine.getChanges();

    this.$amountCoin500.textContent = coin500 + '개';
    this.$amountCoin100.textContent = coin100 + '개';
    this.$amountCoin50.textContent = coin50 + '개';
    this.$amountCoin10.textContent = coin10 + '개';
  }
}
