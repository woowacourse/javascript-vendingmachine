export const validateAddItemInput = (name, price, quantity) => {
  if (name.length === 0) {
    throw new Error('공백으로된 상품명을 입력할 수 없습니다.');
  }
  if (name.length > 14) {
    throw new Error('15자 이상의 상품명을 입력할 수 없습니다.');
  }
  if (!Number.isInteger(price)) {
    throw new Error('정수가 아닌 숫자는 가격으로 입력할 수 없습니다.');
  }
  if (price <= 0) {
    throw new Error('0이하의 수는 가격으로 입력할 수 없습니다.');
  }
  if (price > 1000000) {
    throw new Error('100만원 보다 큰 가격을 입력할 수 없습니다.');
  }
  if (!Number.isInteger(quantity)) {
    throw new Error('정수가 아닌 숫자는 수량으로 입력할 수 없습니다.');
  }
  if (quantity <= 0) {
    throw new Error('0이하의 수는 수량으로 입력할 수 없습니다.');
  }
  if (quantity > 100) {
    throw new Error('100개 보다 많은 수량을 입력할 수 없습니다.');
  }
};

export const validateInputMoney = inputMoney => {
  if (!Number.isInteger(inputMoney)) {
    throw new Error('정수가 아닌 숫자는 금액으로 입력할 수 없습니다.');
  }
  if (inputMoney <= 0) {
    throw new Error('0원이하의 금액은 투입할 수 없습니다.');
  }
  if (inputMoney > 1000000) {
    throw new Error('1,000,000원 보다 많은 금액을 투입할 수 없습니다.');
  }
  if (inputMoney % 10 !== 0) {
    throw new Error('10원 단위의 금액만 투입할 수 있습니다.');
  }
};
