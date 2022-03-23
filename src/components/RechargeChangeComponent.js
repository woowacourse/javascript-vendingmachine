import CoinTableComponent from './common/CoinTableComponent';

class RechargeChangeComponent {
  #rechargeCoinTableComponent;
  constructor($parent) {
    this.$parent = $parent;
    this.mount();
    this.initDOM();
    this.initChildComponents();
  }
  mount() {
    this.$parent.insertAdjacentHTML('beforeend', this.generateTemplate());
  }
  initDOM() {
    this.$rechargeChangeContainer = document.querySelector('#recharge-change-container');
  }
  show() {
    this.$rechargeChangeContainer.classList.remove('hide');
  }
  hide() {
    this.$rechargeChangeContainer.classList.add('hide');
  }
  generateTemplate() {
    return `<section id="recharge-change-container" aria-labelledby="recharge-change-title" class="hide">
    <h2 id="recharge-change-title" hidden>자판기의 잔돈을 충전하는 섹션</h2>
    <form id="recharge-change-form" class="input-form">
      <label for="recharge-change-form">자판기가 보유할 금액을 입력해주세요</label>
      <div class="input-wrapper">
        <input id="recharge-change-input" type="number" placeholder="금액" />
        <button type="button" class="submit-button">충전</button>
      </div>
      <div class="total-amount">투입한 금액: <span id="change-total-amount"></span>원</div>
    </form>
  </section>`;
  }
  initChildComponents() {
    this.#rechargeCoinTableComponent = new CoinTableComponent(this.$rechargeChangeContainer, {
      tableId: 'recharge-coin-table',
      tableCaption: '자판기가 보유한 동전',
    });
  }
}

export default RechargeChangeComponent;
