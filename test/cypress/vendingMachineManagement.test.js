describe('자판기 관리 기능의 동작이 요구사항과 일치해야 한다.', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const login = () => {
    cy.get('#login-button').click();
    cy.get('[name="email"]').type('woowa@woowacourse.com');
    cy.get('[name="password"]').type('testTEST1234');
    cy.get('#login-form').submit();
  }

  const shouldMainPage = () => {
    cy.get('#customer-charge-form-section').should('be.visible');
    cy.get('#product-table-section').should('be.visible');
    cy.get('#change-table-section').should('be.visible');
  }

  context('상품 관리에 대한 테스트', () => {
    const goProductManagementPage = () => {
      login();
      cy.get('[data-page="productManagement"]').click();
    }

    const addProduct = ({ name, price, quantity }) => {
      cy.get('[name="name"]').type(name);
      cy.get('[name="price"]').type(price);
      cy.get('[name="quantity"]').type(quantity);
      cy.get('#add-product-form').submit();
    }

    it('상품 현황 테이블에 새로운 상품 정보를 추가할 수 있다. 추가한 상품은 상품 현황 테이블에서 확인할 수 있다.', () => {
      // when
      goProductManagementPage();
      addProduct({ name: '콜라', price: 1500, quantity: 15 });
      addProduct({ name: '사이다', price: 1200, quantity: 20 });

      // then
      cy.get('#product-table').contains('콜라').should('be.visible');
      cy.get('#product-table').contains('사이다').should('be.visible');
    })

    it('상품 현황 테이블의 상품 정보를 삭제할 수 있다. 삭제 버튼을 누르면 confirm 확인 후 해당 상품이 상품 현황 테이블에서 사라진다.', () => {
      // given
      const confirmStub = cy.stub();
      cy.on('window:confirm', confirmStub);
      const product = { name: '콜라', price: 1500, quantity: 15 };

      // when
      goProductManagementPage();
      addProduct(product);

      cy.get('#product-table').as('productTable');
      cy.get('#product-table').contains(product.name).closest('tr').as('productRow');

      cy.get('@productTable').contains(product.name).should('be.visible');
      cy.get('@productRow').find('.product-delete-button').click().then(() => {
        expect(confirmStub).to.be.calledWith('정말 해당 상품을 삭제하시겠습니까?');
      });

      // then
      cy.get('#product-table').contains(product.name).should('not.exist');
    })

    it('상품 현황 테이블의 상품 정보를 수정할 수 있다. 수정 버튼을 누르고 정보 수정 후 확인 버튼을 누르면 저장된다.', () => {
      // given
      const product = { name: '콜라', price: 1500, quantity: 15 };
      const newProduct = { name: '콜라', price: 1000, quantity: 20 };

      // when
      goProductManagementPage();
      addProduct(product);

      cy.get('#product-table').as('productTable');
      cy.get('#product-table').contains(product.name).closest('tr').as('productRow');

      cy.get('@productTable').contains(product.name).should('be.visible');
      cy.get('@productRow').contains(product.price.toLocaleString()).should('be.visible');
      cy.get('@productRow').contains(product.quantity.toLocaleString()).should('be.visible');

      cy.get('@productRow').find('.product-update-button').click();
      cy.get('@productRow').find('[name="price"]').clear().type(newProduct.price);
      cy.get('@productRow').find('[name="quantity"]').clear().type(newProduct.quantity);
      cy.get('@productRow').find('.product-update-confirm-button').click();

      // then
      cy.get('@productRow').contains(newProduct.price.toLocaleString()).should('be.visible');
      cy.get('@productRow').contains(newProduct.quantity.toLocaleString()).should('be.visible');
    })

    it('상품 현황 테이블의 상품 정보 수정을 취소할 수 있다. 수정 버튼을 누르고 정보 수정 후 취소 버튼을 누르면 저장되지 않고, 기존 상품 정보가 나타난다.', () => {
      // given
      const product = { name: '콜라', price: 1500, quantity: 15 };
      const newProduct = { name: '콜라', price: 1000, quantity: 20 };

      // when
      goProductManagementPage();
      addProduct(product);

      cy.get('#product-table').as('productTable');
      cy.get('#product-table').contains(product.name).closest('tr').as('productRow');

      cy.get('@productTable').contains(product.name).should('be.visible');
      cy.get('@productRow').contains(product.price.toLocaleString()).should('be.visible');
      cy.get('@productRow').contains(product.quantity.toLocaleString()).should('be.visible');

      cy.get('@productRow').find('.product-update-button').click();
      cy.get('@productRow').find('[name="price"]').clear().type(newProduct.price);
      cy.get('@productRow').find('[name="quantity"]').clear().type(newProduct.quantity);
      cy.get('@productRow').find('.product-update-cancel-button').click();

      // then
      cy.get('@productRow').contains(product.price.toLocaleString()).should('be.visible');
      cy.get('@productRow').contains(product.quantity.toLocaleString()).should('be.visible');
    })
  })
})
