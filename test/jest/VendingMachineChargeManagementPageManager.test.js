import VendingMachineChargeManagementPageManager from '../../src/es/manager/VendingMachineChargeManagementPageManager';

describe('자판기 보유 동전 관리 로직 테스트', () => {
  beforeEach(() => {
    VendingMachineChargeManagementPageManager.setState({ coins: [0, 0, 0, 0] });
  });

  test('1. 동전을 정상적으로 충전할 수 있어야 한다.', () => {
    const inputValue = 5000;
    VendingMachineChargeManagementPageManager.addCharge(inputValue);

    expect(VendingMachineChargeManagementPageManager.getTotalAmount()).toBe(inputValue);
  });
});
