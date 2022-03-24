// 잔돈 충전탭은 자판기가 보유할 금액을 충전하는 기능을 수행한다.

// - [ ] 잔돈 충전 탭에서 최초 자판기가 보유한 금액은 0원이며, 각 동전의 개수는 0개이다. //
// - [ ] 잔돈 충전 입력 요소에 충전할 금액을 입력한 후, 충전하기 버튼을 눌러 자판기 보유 금액을 충전할 수 있다. //
// - [ ] 잔돈은 10원으로 나누어 떨어지는 금액만 투입할 수 있다. 보유할 수 있는 최대 금액은 100,000원이다. //util
// - [ ] 자판기 보유 금액만큼의 동전이 무작위로 생성된다. //
// - [ ] 자판기 보유 금액을 누적하여 충전할 수 있다. 추가 충전 금액만큼의 동전이 무작위로 생성되어 기존 동전들에 더해진다.

import { checkValidChargeMoney } from '../utils/utils';

test('잔돈은 10원으로 나누어 떨어지는 금액만 투입할 수 있다. (실패 케이스, 입력: 501)', () => {
  const chargeMoney = 501;

  expect(() => {
    checkValidChargeMoney(chargeMoney);
  }).toThrowError('금액은 10으로 나누어떨어져야 합니다.');
});

test('잔돈은 10원으로 나누어 떨어지는 금액만 투입할 수 있다. (성공 케이스, 입력: 1000)', () => {
  const chargeMoney = 1000;

  expect(() => {
    checkValidChargeMoney(chargeMoney);
  }).not.toThrowError();
});
