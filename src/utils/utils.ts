export const isValidLengthProductName = (name: string): boolean =>
  name.length >= 1 && name.length <= 10;

export const checkValidPrice = (price: number): void => {
  if (price < 100 || price > 10000) {
    throw new Error(
      '상품 가격은 100원부터 시작하며, 최대 10,000원까지 가능하다.'
    );
  }

  if (price % 10 !== 0) {
    throw new Error('10원으로 나누어 떨어져야 한다.');
  }
};
