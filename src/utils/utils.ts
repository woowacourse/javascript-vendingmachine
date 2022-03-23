export const checkValidLengthProductName = (name: string): void => {
  if (name.length < 1 || name.length > 10) {
    throw new Error('상품명은 1글자 이상 10글자 이하로 작성해주세요.');
  }
};

export const checkValidProductPrice = (price: number): void => {
  if (price < 100 || price > 10000) {
    throw new Error(
      '상품 가격은 100원부터 시작하며, 최대 10,000원까지 가능하다.'
    );
  }

  if (price % 10 !== 0) {
    throw new Error('10원으로 나누어 떨어져야 한다.');
  }
};

export const checkValidProductQuantity = (quantity) => {
  if (!Number.isInteger(quantity)) {
    throw new Error('상품 갯수는 정수여야 한다.');
  }

  if (quantity < 1 || quantity > 20) {
    throw new Error(
      '한 제품당 수량은 최소 1개에서 최대 20개까지 넣을 수 있다.'
    );
  }
};
