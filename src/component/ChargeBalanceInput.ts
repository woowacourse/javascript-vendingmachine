export class ChargeBalanceInput {
  constructor() {}

  templates(): string {
    return `
        <form>
            <label for="charge-balance-input">자판기가 보유할 금액을 입력해주세요</label>
            <div id="charge-balance-input">
              <input type="text" placeholder="금액"></input>
              <button type="submit">충전</button>
            </div>
            <p id ='current-balance'>현재보유금액: </p>
        </form>
      `;
  }

  render(target: HTMLDivElement) {
    target.insertAdjacentHTML('beforeend', this.templates());
  }

  register() {}
}
