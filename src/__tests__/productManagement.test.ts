// 상품 관리탭은 자판기가 보유하고 있는 상품을 추가하는 기능을 수행한다.

// - [ ] 최초 상품 목록은 비워진 상태이다.
// - [ ] 상품명, 가격, 수량을 입력해 상품을 추가할 수 있다. // domain
//   - [ ] 상품명은 최대 10글자까지 가능하다. //util
//   - [ ] 상품 가격은 100원부터 시작하며, 최대 10,000원까지 가능하다. 그리고 10원으로 나누어 떨어져야 한다. //util
//   - [ ] 한 제품당 수량은 최대 20개까지 넣을 수있다. //util
// - [ ] 관리자는 추가한 상품을 확인할 수 있다. //domain
// - [ ] 관리자는 추가한 상품을 수정, 삭제할 수 있다. //domain
//   - [ ] 수정 시 상품명, 가격, 수량 정보 영역 자체가 인풋 영역으로 변경된다. //ui
//   - [ ] 삭제 시 confirm을 활용하여 사용자에게 다시 한번 확인한다. //ui

// 통과
test('상품명은 최소 1글자 부터 최대 10글자까지 가능하다. (성공 케이스, 입력: "콜라")', () => {
  const productName = '콜라';

  expect(isValidLengthProductName(productName)).toBe(true);
});

// 실패
test('상품명은 최소 1글자 부터 최대 10글자까지 가능하다. (실패 케이스, 입력: "")', () => {
  const productName = '';

  expect(isValidLengthProductName(productName)).toBe(false);
});

// 실패
test('상품명은 최소 1글자 부터 최대 10글자까지 가능하다. (실패 케이스, 입력: "열 글자가 넘는 상품명")', () => {
  const productName = '열 글자가 넘는 상품명';

  expect(isValidLengthProductName(productName)).toBe(false);
});
