const SUCCESS_MESSAGE = {
  RETURN_COINS: '동전이 반환되었습니다. 반환된 동전의 개수를 확인해주세요.',
  PURCHASED_PRODUCT(productName) {
    return `${productName} 1개를 구입 하셨습니다. 이용해주셔서 감사합니다.`;
  },
};

export default SUCCESS_MESSAGE;
