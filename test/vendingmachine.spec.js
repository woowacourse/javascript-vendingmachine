const testSetting = {
  userEmail: `ryu@test.com`,
  userPassword: 'qaz123',
};

describe('로그인 이후 자판기 시스템 작동 테스트', () => {
  // support에 로그인을 분리하면 쿠키 유지가 왜 안되는지 찾아보기
  before(() => {
    cy.clearLocalStorageSnapshot();

    cy.visit('http://localhost:9000/login');

    cy.get('#login-form input[name="email"]').type(testSetting.userEmail);
    cy.get('#login-form input[name="password"]').type(testSetting.userPassword);

    cy.get('#login-form-submit-button').click();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it('1. 로그인 이후 자판기의 상품 관리 페이지에 접근할 수 있어야 한다.', () => {
    cy.get('.nav-menu').contains('상품 관리').click();
    cy.get('#add-product-form-section').should('be.visible');
  });

  it('2. 자판기에 상품명, 가격, 수량을 입력하여 상품을 등록할 수 있어야 한다.', () => {
    cy.addProduct({ name: '감자', price: '500', quantity: '10' });
    cy.addProduct({ name: '가지', price: '700', quantity: '15' });

    cy.get('#product-table').includeTextList(['감자', '500원', '10개']);
    cy.get('#product-table').includeTextList(['가지', '700원', '15개']);
  });

  // 2. 자판기에 등록된 상품의 이름을 수정할 수 있어야 한다.
  it('3. 자판기에 등록된 상품 목록에서 수정 버튼을 눌러 상품의 정보를 수정할 수 있어야한다.', () => {
    const $target = cy.get('#product-table').contains('감자').closest('tr');
    $target.find('.product-update-button').click();

    cy.get('#product-table input[name="name"]').clear().type('왕감자');
    cy.get('#product-table input[name="price"]').clear().type('600');
    cy.get('#product-table input[name="quantity"]').clear().type('7');

    $target.click();
    //$target.find('input[name="quantity"]').type('7');
  });

  // 3. 자판기에 등록된 상품을 제거할 수 있어야 한다.

  // 4.
});
