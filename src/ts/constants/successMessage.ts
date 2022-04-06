import { SuccessMessage } from '../types/constants';

const SUCCESS_MESSAGE: SuccessMessage = {
  RETURN_COINS: '동전이 반환되었습니다. 반환된 동전의 개수를 확인해주세요.',
  ADDED_PRODUCT:
    '상품이 정상적으로 등록되었습니다. 등록된 상품을 확인해주세요.',
  EDITED_PRODUCT:
    '상품이 정상적으로 수정되었습니다. 수정된 상품을 확인해주세요.',
  DELETED_PRODUCT: '상품이 정상적으로 삭제되었습니다.',
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
