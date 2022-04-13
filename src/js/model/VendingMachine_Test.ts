import { VendingMachine } from './VendingMachine';

class VendingMachine_Test extends VendingMachine {
  constructor() {
    super();
  }

  /* 테스트 용도로 작성된 초기화 함수입니다. 실제 로직에선 사용되지 않습니다. */
  initialize() {
    this.products = [];
    this.changes = { coin10: 0, coin50: 0, coin100: 0, coin500: 0 };
    this.userChanges = { coin10: 0, coin50: 0, coin100: 0, coin500: 0 };
    this.totalMoney = 0;
    this.userMoney = 0;
  }
}

const vendingMachineTest = new VendingMachine_Test();

export default vendingMachineTest;
