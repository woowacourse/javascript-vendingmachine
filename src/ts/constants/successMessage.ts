import { SuccessMessage } from '../types/constants';

const SUCCESS_MESSAGE: SuccessMessage = {
  RETURN_COINS: '동전이 반환되었습니다. 반환된 동전의 개수를 확인해주세요.',
  ADDED_PRODUCT:
    '상품이 정상적으로 등록되었습니다. 등록된 상품을 확인해주세요.',
  EDITED_PRODUCT:
    '상품이 정상적으로 수정되었습니다. 수정된 상품을 확인해주세요.',
  DELETED_PRODUCT: '상품이 정상적으로 삭제되었습니다.',
  DONE_SIGN_UP: '회원가입이 완료되었습니다. 로그인 후 서비스를 이용해주세요.',
  DONE_SIGN_IN: '정상적으로 로그인이 되셨습니다.',
  DONE_EDIT_USER_INFORMATION: '회원정보가 정상적으로 수정 되었습니다.',
  CONSUMER_CHARGED_MONEY(
    chargeMoney: number,
    totalChargeMoney: number
  ): string {
    return `${chargeMoney}원이 투입 되었습니다. 현재 투입된 총 금액은 ${totalChargeMoney}원 입니다.`;
  },
  PURCHASED_PRODUCT(productName: string): string {
    return `${productName} 1개를 구입 하셨습니다. 이용해주셔서 감사합니다.`;
  },
  CHARGED_COINS(chargeMoney) {
    return `${chargeMoney}원이 충전 되었습니다. 충전된 잔돈을 확인해주세요.`;
  },
};

export default SUCCESS_MESSAGE;
