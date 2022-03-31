import ProductStore from '../src/es/Store/ProductStore'

describe('상품 정보 관리 로직 테스트', () => {
  beforeEach(() => {
    ProductStore.setState({ products: [] });
  });

  test('1. 상품 정보를 추가할 수 있어야 한다.', () => {
    const inputValue = { name: '감자', price: 1000, quantity: 10 };
    ProductStore.addProduct(inputValue);

    const testResultState = {
      products: [inputValue],
    };

    expect(ProductStore.getState()).toStrictEqual(testResultState);
  });

  test('2. 추가된 상품 정보의 이름으로 인덱스 번호를 찾을 수 있어야 한다.', () => {
    const inputValue = { name: '감자', price: 1000, quantity: 10 };
    ProductStore.addProduct(inputValue);

    expect(ProductStore.findProductIndexByName('감자')).toBe(0);
  });

  test('3. 추가된 상품 정보의 인덱스 번호로 상품을 수정할 수 있어야 한다.', () => {
    const inputValue = { name: '감자', price: 1000, quantity: 10 };
    ProductStore.addProduct(inputValue);

    const indexNumber = ProductStore.findProductIndexByName('감자');
    const updateValue = { name: '콤피아', price: 1000, quantity: 15 };
    ProductStore.updateProduct(indexNumber, updateValue);

    const testResultState = {
      products: [updateValue],
    };

    expect(ProductStore.getState()).toStrictEqual(testResultState);
  });

  test('4. 추가된 상품 정보의 인덱스 번호로 상품을 제거할 수 있어야 한다.', () => {
    const inputValue = { name: '감자', price: 1000, quantity: 10 };
    ProductStore.addProduct(inputValue);

    const indexNumber = ProductStore.findProductIndexByName('감자');
    ProductStore.removeProductByIndex(indexNumber);

    const testResultState = {
      products: [],
    };

    expect(ProductStore.getState()).toStrictEqual(testResultState);
  });
});
