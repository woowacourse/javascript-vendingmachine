import Product from '../domain/Product';

const productValidator = {
  isDuplicated(name: string, products: Product[]) {
    return products.some((product) => product.name === name);
  },

  isIncorrectUnit(price: number) {
    return price % 10 !== 0;
  },
};

export const validateProduct = (product: Product, products: Product[]) => {
  if (productValidator.isDuplicated(product.name, products)) {
    throw new Error('중복되는 상품이 존재합니다.');
  }

  if (productValidator.isIncorrectUnit(product.price)) {
    throw new Error('상품 가격은 10원 단위로 나누어 떨어지는 금액으로 입력하세요.');
  }
};
