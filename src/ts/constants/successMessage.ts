import { SuccessMessage } from '../types/constants';

const SUCCESS_MESSAGE: SuccessMessage = {
  RETURN_COINS: '동전이 반환되었습니다. 반환된 동전의 개수를 확인해주세요.',
  CONSUMER_CHARGED_MONEY(
    chargeMoney: number,
    totalChargeMoney: number
  ): string {
    return `${chargeMoney}원이 투입 되었습니다. 현재 투입된 총 금액은 ${totalChargeMoney}원 입니다.`;
  },
  PURCHASED_PRODUCT(productName: string): string {
    return `${productName} 1개를 구입 하셨습니다. 이용해주셔서 감사합니다.`;
  },
};

export default SUCCESS_MESSAGE;
