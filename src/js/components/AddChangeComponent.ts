import vendingMachine from '../model/VendingMachine';

class AddChangeComponent {
  $changeAddForm: HTMLElement;
  $totalChange: HTMLElement;
  noticeStateChanged: Function;
  parentElement: HTMLElement;

  constructor(parentElement: HTMLElement, noticeStateChanged: Function) {
    this.parentElement = parentElement;
    this.noticeStateChanged = noticeStateChanged;
  }

  bindEventAndElement() {
    this.$totalChange = document.querySelector('#total-change');
    this.$changeAddForm = document.querySelector('#change-add-form');
    this.$changeAddForm.addEventListener('submit', this.onSubmitChangeAdd);
  }

  onSubmitChangeAdd = (e: SubmitEvent) => {
    e.preventDefault();
    const inputChange = parseInt((<HTMLInputElement>this.$changeAddForm.querySelector('#change-add-input')).value);

    try {
      vendingMachine.inputChanges(inputChange);
      this.noticeStateChanged();
    } catch (message) {
      alert(message);
    }
  };

  refreshChange = () => {
    this.$totalChange.textContent = vendingMachine.getTotalMoney().toString();
  };

  render = () => {
    this.parentElement.insertAdjacentHTML('beforeend', this.template());
    this.bindEventAndElement();
  };

  template = () => `
  <div id="change-add-container">
      <p>자판기가 보유할 금액을 입력해주세요</p>
      <form id="change-add-form">
      <input
          type="number"
          id="change-add-input"
          placeholder="금액"
          required
      />
      <input type="submit" id="change-add-button" value="투입" />
      </form>
      <p>현재 보유 금액: <span id="total-change"></span>원</p>
  </div>`;
}

export default AddChangeComponent;
