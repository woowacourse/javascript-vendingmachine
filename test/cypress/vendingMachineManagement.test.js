import { ERROR_MESSAGE } from '../../src/es/constants/index'

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

  context('상품 관리에 대한 테스트', () => {
    const goProductManagementPage = () => {
      login();
      cy.get('[data-page="productManagement"]').click();
    }

    const addProduct = ({ name, price, quantity }) => {
      cy.get('[name="name"]').clear().type(name);
      cy.get('[name="price"]').clear().type(price);
      cy.get('[name="quantity"]').clear().type(quantity);
      cy.get('#add-product-form').submit({force: true});
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

    it(`추가할 상품 이름은 최소 1자, 최대 10자까지 가능하다. 해당 조건 범위를 벗어나는 경우 안내 snack bar가 나타난다.`, () => {
      goProductManagementPage();

      addProduct({ name: '가나다라마바사아자차카타파하', price: 15000, quantity: 20 });
      cy.get('.snackbar').should('be.visible').and('have.text', ERROR_MESSAGE.PRODUCT_NAME_LENGTH);
    })

    it(`추가할 상품의 가격은 최소 100원, 최대 10,000원까지 가능하다. 해당 조건 범위를 벗어나는 경우 안내 snack bar가 나타난다.`, () => {
      goProductManagementPage();

      addProduct({ name: '콜라', price: 50, quantity: 15 });
      cy.get('.snackbar').should('be.visible').and('have.text', ERROR_MESSAGE.PRODUCT_PRICE_WRONG_RANGE);

      addProduct({ name: '사이다', price: 15000, quantity: 20 });
      cy.get('.snackbar').should('be.visible').and('have.text', ERROR_MESSAGE.PRODUCT_PRICE_WRONG_RANGE);
    })

    it(`추가할 상품의 가격은 10원 단위로 입력 가능하다. 해당 조건을 벗어나는 경우 안내 snack bar가 나타난다.`, () => {
      goProductManagementPage();

      addProduct({ name: '콜라', price: 1055, quantity: 15 });
      cy.get('.snackbar').should('be.visible').and('have.text', ERROR_MESSAGE.PRODUCT_PRICE_WRONG_UNIT);
    })

    it(`추가할 상품의 수량은 최소 1개, 최대 20개까지 가능하다. 해당 조건 범위를 벗어나는 경우 안내 snack bar가 나타난다.`, () => {
      goProductManagementPage();

      addProduct({ name: '콜라', price: 1000, quantity: 0 });
      cy.get('.snackbar').should('be.visible').and('have.text', ERROR_MESSAGE.PRODUCT_QUANTITY_WRONG_RANGE);

      addProduct({ name: '사이다', price: 2000, quantity: 22 });
      cy.get('.snackbar').should('be.visible').and('have.text', ERROR_MESSAGE.PRODUCT_QUANTITY_WRONG_RANGE);
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

  context('잔돈 충전에 대한 테스트', () => {
    const goProductManagementPage = () => {
      login();
      cy.get('[data-page="vendingMachineChargeManagement"]').click();
    }

    const addVendingMachineCharge = (charge) => {
      cy.get('[name="vendingmachine-charge"]').type(charge);
      cy.get('#vendingmachine-charge-form').submit({force: true});
    }
    
    it('자판기 잔돈을 충전할 수 있다. 충전을 성공하면 현재 보유 금액이 충전금만큼 증가한다.', () => {
      const firstCharge = 5000;
      const secondCharge = 2000;

      goProductManagementPage();
      addVendingMachineCharge(firstCharge);
      cy.get('#total-vendingmachine-charge').should('have.text', `${firstCharge.toLocaleString()}원`);

      addVendingMachineCharge(secondCharge);
      cy.get('#total-vendingmachine-charge').should('have.text', `${(firstCharge + secondCharge).toLocaleString()}원`);
    })

    it(`자판기 잔돈 충전금은 10원 단위로 입력 가능하다. 해당 조건을 벗어나는 경우 안내 snack bar가 나타난다.`, () => {
      const charge = 1055;

      goProductManagementPage();
      addVendingMachineCharge(charge);

      cy.get('.snackbar').should('be.visible').and('have.text', ERROR_MESSAGE.HOLDING_AMOUNT_WRONG_UNIT);
    })

    it(`자판기 잔돈은 누적 100,000원까지 충전 가능하다. 해당 조건을 벗어나는 경우 안내 snack bar가 나타난다.`, () => {
      const firstCharge = 90000;
      const secondCharge = 10100;

      goProductManagementPage();
      addVendingMachineCharge(firstCharge);
      addVendingMachineCharge(secondCharge);

      cy.get('.snackbar').should('be.visible').and('have.text', ERROR_MESSAGE.HOLDING_AMOUNT_WRONG_LIMIT);
    })
  })
})
