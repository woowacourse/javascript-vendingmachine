describe('상품 관리 페이지를 테스트합니다.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000');
    cy.login();
  });

  it('상품을 추가할 수 있습니다.', () => {
    const name = '콜라';
    const price = '1200';
    const quantity = '10';
    cy.addProduct(name, price, quantity);

    cy.get('product-inventory table').contains(name);
    cy.get('product-inventory table').contains(Number(price).toLocaleString('ko-kr'));
    cy.get('product-inventory table').contains(Number(quantity).toLocaleString('ko-kr'));
  });

  it('상품을 수정할 수 있습니다.', () => {
    const name = '콜라';
    const price = '1200';
    const quantity = '10';
    cy.addProduct(name, price, quantity);

    cy.get('table .btn-edit').click();

    const newName = '사이다';
    const newPrice = '500';
    const newQuantity = '5';

    cy.get('product-inventory input').eq(0).clear().type(newName);
    cy.get('product-inventory input').eq(1).clear().type(newPrice);
    cy.get('product-inventory input').eq(2).clear().type(newQuantity);

    cy.get('.btn-confirm').click();

    cy.get('product-inventory table').contains(newName);
    cy.get('product-inventory table').contains(Number(newPrice).toLocaleString('ko-kr'));
    cy.get('product-inventory table').contains(Number(newQuantity).toLocaleString('ko-kr'));
  });

  it('상품을 삭제할 수 있습니다.', () => {
    const name = '콜라';
    const price = '1200';
    const quantity = '10';
    cy.addProduct(name, price, quantity);
    cy.get('.btn-delete').click();

    cy.get('product-inventory h2').contains('아직 상품이 없어요!');
  });
});
