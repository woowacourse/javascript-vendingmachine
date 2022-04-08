import { ERROR_MESSAGE, GUIDE_MESSAGE } from '../../src/es/constants/index'

describe('고객의 금액 충전, 상품 구매, 잔돈 반환 기능이 요구사항과 일치해야 한다.', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const userInfoForSuccessfulLogin = {
    email: 'tester@test.com',
    password: 'asdASD123',
  }

  const dummyProducts = [
    { name: '콜라', price: 1500, quantity: 15 }, 
    { name: '사이다', price: 1200, quantity: 20 }
  ]

  const dummyVendingMachineCharge = 5000;

  const login = (userInfo) => {
    cy.get('#login-button').click();
    cy.get('[name="email"]').type(userInfo.email);
    cy.get('[name="password"]').type(userInfo.password);
    cy.get('#login-form').submit();
  }

  const logout = () => {
    cy.get('#user-thumbnail-button').click();
    cy.get('#logout-button').click();
  }

  const goProductManagementPage = () => {
    cy.get('[data-page="productManagement"]').click();
  }

  const goVendingMachineChargeManagementPage = () => {
    cy.get('[data-page="vendingMachineChargeManagement"]').click();
  }

  const addProduct = ({ name, price, quantity }) => {
    cy.get('[name="name"]').clear().type(name);
    cy.get('[name="price"]').clear().type(price);
    cy.get('[name="quantity"]').clear().type(quantity);
    cy.get('#add-product-form').submit({force: true});
  }

  const addVendingMachineCharge = (charge) => {
    cy.get('[name="vendingmachine-charge"]').type(charge);
    cy.get('#vendingmachine-charge-form').submit({force: true});
  }

  const addCustomerCharge = (charge) => {
    cy.get('[name="customerCharge"]').type(charge);
    cy.get('#customer-charge-form').submit({force: true});
  }

  const initialSettingForPurchase = () => {
    login(userInfoForSuccessfulLogin);

    goProductManagementPage();
    dummyProducts.forEach((product) => addProduct(product));

    goVendingMachineChargeManagementPage();
    addVendingMachineCharge(dummyVendingMachineCharge);

    logout();
  }

  context('상품 구매 금액 충전에 대한 테스트', () => {
    it('상품 구매 금액을 충전할 수 있다. 충전을 성공하면 투입한 금액이 충전금만큼 증가하고 성공 안내 snack bar를 확인할 수 있다.', () => {
      const firstCustomerCharge = 5000;
      const secondCustomerCharge = 2000;

      addCustomerCharge(firstCustomerCharge);
      cy.get('#total-customer-charge').should('have.text', `${firstCustomerCharge.toLocaleString()}원`);

      addCustomerCharge(secondCustomerCharge);
      cy.get('#total-customer-charge').should('have.text', `${(firstCustomerCharge + secondCustomerCharge).toLocaleString()}원`);
      cy.get('.snackbar').should('be.visible').and('have.text', GUIDE_MESSAGE.CUSTOMER_CHARGE_SUCCESS);
    })

    it('상품 구매 금액은 10원 단위로 입력 가능하다. 해당 조건을 벗어나는 경우 안내 snack bar를 확인할 수 있다.', () => {
      const customerCharge = 1055;

      addCustomerCharge(customerCharge);
      cy.get('.snackbar').should('be.visible').and('have.text', ERROR_MESSAGE.CUSTOMER_CHARGE_WRONG_UNIT);
    })

    it('상품 구매 금액은 한 번에 최대 10,000원까지 충전할 수 있다. 해당 조건을 벗어나는 경우 안내 snack bar를 확인할 수 있다.', () => {
      const customerCharge = 10050;

      addCustomerCharge(customerCharge);
      cy.get('.snackbar').should('be.visible').and('have.text', ERROR_MESSAGE.CUSTOMER_CHARGE_WRONG_LIMIT);
    })

  })

  context('상품 구매에 대한 테스트', () => {
    it('상품 구매에 성공하면, 안내 snack bar를 확인할 수 있다.', () => {
      // given
      const productToPurchase = dummyProducts[0];
      initialSettingForPurchase();

      cy.get('#product-table').as('productTable');
      cy.get('#product-table').contains(productToPurchase.name).closest('tr').as('productRow');

      // when
      addCustomerCharge(productToPurchase.price + 1000);
      cy.get('@productRow').find('.product-purchase-button').click();

      // then
      cy.get('.snackbar').should('be.visible').and('have.text', GUIDE_MESSAGE.PURCHASE_SUCCESS(productToPurchase.name));
    })

    it('상품 구매 금액이 부족하여 상품 구매에 실패하면, 안내 snack bar를 확인할 수 있다.', () => {
      // given
      const productToPurchase = dummyProducts[0];
      initialSettingForPurchase();

      cy.get('#product-table').as('productTable');
      cy.get('#product-table').contains(productToPurchase.name).closest('tr').as('productRow');

      // when
      cy.get('@productRow').find('.product-purchase-button').click();

      // then
      cy.get('.snackbar').should('be.visible').and('have.text', GUIDE_MESSAGE.INSUFFICIENT_CHARGE_TO_PURCHASE);
    })
  })
  
  context('잔돈 반환에 대한 테스트', () => {
    it('잔돈 반환에 성공하면, 안내 snack bar를 확인할 수 있다.', () => {
      // given
      const customerCharge = dummyVendingMachineCharge - 1000;
      initialSettingForPurchase();

      // when
      addCustomerCharge(customerCharge);
      cy.get('#return-change-button').click();

      // then
      cy.get('.snackbar').should('be.visible').and('have.text', GUIDE_MESSAGE.RETURN_CHANGES_SUCCESS);
    })

    it('자판기 잔돈이 부족하여 고객의 잔돈을 모두 돌려주지 못 하면, 안내 snack bar를 확인할 수 있다.', () => {
      // given
      const customerCharge = dummyVendingMachineCharge + 1000;
      initialSettingForPurchase();

      // when
      addCustomerCharge(customerCharge);
      cy.get('#return-change-button').click();

      // then
      cy.get('.snackbar').should('be.visible').and('have.text', GUIDE_MESSAGE.RETURN_INSUFFICIENT_CHANGES);
    })
  })
})
