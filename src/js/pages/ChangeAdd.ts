import ChangeListWrapper from '../components/ChangeListWrapper';
import showSnackbar from '../components/Snackbar';
import vendingMachine from '../model/VendingMachine';
import template from '../template';

export default class ChangeAdd {
  private tabName: 'ChangeAdd';
  $headerTitle: HTMLElement;
  $inputSection: HTMLElement;
  $contentsContainer: HTMLElement;
  $changeAddForm: HTMLElement;
  $totalChange: HTMLElement;

  constructor() {
    this.$inputSection = document.querySelector('.input-section');
    this.$contentsContainer = document.querySelector('.contents-container');
  }

  render() {
    this.$inputSection.insertAdjacentHTML(
      'beforeend',
      template.moneyAddContainer({
        labelText: '자판기가 보유할 금액을 입력해주세요',
        buttonText: '충전',
        resultText: '현재 보유 금액',
      }),
    );

    ChangeListWrapper.createElement({
      targetElement: this.$contentsContainer,
      title: '자판기가 보유한 동전',
      tabName: this.tabName,
    });

    this.$headerTitle = document.querySelector('#header-title');
    this.$headerTitle.textContent = '🍿 자판기 🍿';

    this.$changeAddForm = this.$inputSection.querySelector('#money-add-form');
    this.$totalChange = this.$inputSection.querySelector('#total-money');

    this.$changeAddForm.addEventListener('submit', this.onSubmitChangeAdd);
    this.refreshChange();
  }

  onSubmitChangeAdd = (e: SubmitEvent) => {
    e.preventDefault();
    const inputChange = (<HTMLInputElement>this.$changeAddForm.querySelector('#money-add-input')).valueAsNumber;

    try {
      vendingMachine.addChange(inputChange);
      this.refreshChange();
    } catch (err) {
      showSnackbar(err.message);
    }
  };

  refreshChange() {
    this.$totalChange.textContent = vendingMachine.getTotalMoney().toLocaleString();

    const changes = vendingMachine.getChanges();
    ChangeListWrapper.setState(changes);
  }
}
