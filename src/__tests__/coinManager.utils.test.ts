import { checkValidChargeMoney } from '../ts/utils/utils';

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
