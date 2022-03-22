export default class ChangeAdd {
  $inputSection: HTMLElement;
  $contentsContainer: HTMLElement;

  constructor() {
    this.$inputSection = document.querySelector('.input-section');
    this.$contentsContainer = document.querySelector('.contents-container');
  }

  render() {
    this.$inputSection.insertAdjacentHTML('beforeend', this.inputSection());
    this.$contentsContainer.insertAdjacentHTML('beforeend', this.changeList());
  }

  inputSection() {
    return `
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

  changeList() {
    return `
    <div id="change-list-wrapper">
      <h4>자판기가 보유한 동전</h4>
      <ul id="change-list">
        <li class="list-header">
          <span>동전</span>
          <span>개수</span>
        </li>
        <li>
          <span>500원</span>
          <span>0개</span>
        </li>
        <li>
          <span>100원</span>
          <span>4개</span>
        </li>
        <li>
          <span>50원</span>
          <span>1개</span>
        </li>
        <li>
          <span>10원</span>
          <span>5개</span>
        </li>
      </ul>
    </div>`;
  }
}
