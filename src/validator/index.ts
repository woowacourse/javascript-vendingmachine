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

const changeValidator = {
  isOverMax(inputMoney: number, currentChange: number) {
    return inputMoney + currentChange > 100000;
  },

  isIncorrectUnit(inputMoney: number) {
    return inputMoney % 10 !== 0;
  },
};

export const validateChange = (inputMoney: number, currentChange: number) => {
  if (changeValidator.isOverMax(inputMoney, currentChange)) {
    throw new Error('현재 보유 금액은 100,000원을 초과할 수 없습니다!');
  }

  if (changeValidator.isIncorrectUnit(inputMoney)) {
    throw new Error('금액은 10원 단위로 나누어 떨어지는 금액으로 입력하세요.');
  }
};

const updateProductValidator = {
  isDuplicated(targetName: string, name: string, products: Product[]) {
    if (targetName === name) {
      return false;
    }

    const filterArr = products.filter((product) => product.name !== targetName);
    return filterArr.some((product) => product.name === name);
  },

  isIncorrectUnit(price: number) {
    return price % 10 !== 0;
  },
};

export const validateUpdateProduct = (targetName: string, name: string, price: number, products: Product[]) => {
  if (updateProductValidator.isDuplicated(targetName, name, products)) {
    throw new Error('중복되는 상품이 존재합니다.');
  }

  if (updateProductValidator.isIncorrectUnit(price)) {
    throw new Error('상품 가격은 10원 단위로 나누어 떨어지는 금액으로 입력하세요.');
  }
};
