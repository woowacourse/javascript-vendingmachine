describe('상품 수정 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
    cy.login();
  });

  it('추가된 상품 정보를 수정할 수 있다.', () => {
    const productName = '콜라';
    const productPrice = 1000;
    const productQuantity = 20;

    const editProductName = '사이다';
    const editProductPrice = 1100;
    const editProductQuantity = 15;

    cy.wait(1500);
    cy.addProduct(productName, productPrice, productQuantity);
    cy.editProduct(
      productName,
      editProductName,
      editProductPrice,
      editProductQuantity
    );

    cy.get(`[data-product-name="${editProductName}"] td`)
      .eq(0)
      .should('have.text', editProductName);
    cy.get(`[data-product-name="${editProductName}"] td`)
      .eq(1)
      .should('have.text', editProductPrice);
    cy.get(`[data-product-name="${editProductName}"] td`)
      .eq(2)
      .should('have.text', `${editProductQuantity}개`);
  });
});
