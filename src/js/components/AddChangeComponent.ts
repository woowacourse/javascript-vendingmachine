import vendingMachine from '../model/VendingMachine';
import throwableFunctionHandler from '../utils/throwableFunctionHandler';

class AddChangeComponent {
  $changeAddForm: HTMLElement;
  $totalChange: HTMLElement;
  noticeStateChanged: Function;
  parentElement: HTMLElement;

  constructor(parentElement: HTMLElement, noticeStateChanged: Function) {
    this.parentElement = parentElement;
    this.noticeStateChanged = noticeStateChanged;
  }

  private bindEventAndElement = () => {
    this.$totalChange = document.querySelector('#total-change');
    this.$changeAddForm = document.querySelector('#change-add-form');
    this.$changeAddForm.addEventListener('submit', this.onSubmitChangeAdd);
  };

  private onSubmitChangeAdd = async (e: SubmitEvent) => {
    e.preventDefault();
    const inputChange = (<HTMLInputElement>this.$changeAddForm.querySelector('#change-add-input')).valueAsNumber;

    if (await throwableFunctionHandler(() => vendingMachine.inputChanges(inputChange))) {
      this.noticeStateChanged();
    }
  };

  refreshChange = () => {
    this.$totalChange.textContent = vendingMachine.getTotalMoney().toString();
  };

  render = () => {
    this.parentElement.insertAdjacentHTML('beforeend', this.template());
    this.bindEventAndElement();
  };

  private template = () => `
  <div id="change-add-container" class="single-input-container">
      <p>자판기가 보유할 금액을 입력해주세요</p>
      <form id="change-add-form">
      <input
          type="number"
          id="change-add-input"
          class="single-input"
          placeholder="금액"
          required
      />
      <input type="submit" id="change-add-button" value="투입" />
      </form>
      <p>현재 보유 금액: <span id="total-change"></span>원</p>
  </div>`;
}

export default AddChangeComponent;
