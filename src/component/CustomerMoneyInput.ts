export class CustomerMoneyInput {
  target: HTMLDivElement;
  constructor(props) {
    this.target = props.target;
  }
  render() {
    this.target.insertAdjacentHTML('beforeend', this.template(0));
    this.selectDom();
    this.bindEvent();
  }

  template(input: number): string {
    return `
          <form id = 'charge-balance-input-container'>
            <label id ='charge-balance-input-label' for="charge-balance-input">상품을 구매할 금액을 투입해주세요</label>
              <input id="charge-balance-input" type="text" placeholder="금액" class = 'input'></input>
              <button id='charge-balance-submit-btn' type="submit" class ='submit-button button'>투입</button>
              <div id = 'current-balance-container'>투입한금액 : <span id="current-balance">${input}</span>원</div>
          </form id = >
      `;
  }

  selectDom() {}
  bindEvent() {}
}
