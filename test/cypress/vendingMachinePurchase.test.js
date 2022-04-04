import { ERROR_MESSAGE } from '../../src/es/constants/index'

describe('상품 구매 기능의 동작이 요구사항과 일치해야 한다.', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const userInfoForSuccessfulLogin = {
    email: 'woowa@woowacourse.com',
    password: 'testTEST1234',
  }

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

  const initialSettingForPurchase = () => {
    login(userInfoForSuccessfulLogin);

    goProductManagementPage();
    addProduct({ name: '콜라', price: 1500, quantity: 15 });
    addProduct({ name: '사이다', price: 1200, quantity: 20 });

    goVendingMachineChargeManagementPage();
    addVendingMachineCharge(10000);

    logout();
  }

  context('상품 구매 금액 충전에 대한 테스트', () => {
    const addCustomerCharge = (charge) => {
      cy.get('[name="customerCharge"]').type(charge);
      cy.get('#customer-charge-form').submit({force: true});
    }

    it('상품 구매 금액을 충전할 수 있다. 충전을 성공하면 투입한 금액이 충전금만큼 증가한다.', () => {
      const firstCharge = 5000;
      const secondCharge = 2000;

      addCustomerCharge(firstCharge);
      cy.get('#total-customer-charge').should('have.text', `${firstCharge.toLocaleString()}원`);

      addCustomerCharge(secondCharge);
      cy.get('#total-customer-charge').should('have.text', `${(firstCharge + secondCharge).toLocaleString()}원`);
    })

    it('상품 구매 금액은 10원 단위로 입력 가능하다. 해당 조건을 벗어나는 경우 안내 snack bar가 나타난다.', () => {
      const charge = 1055;

      addCustomerCharge(charge);
      cy.get('.snackbar').should('be.visible').and('have.text', ERROR_MESSAGE.CUSTOMER_CHARGE_WRONG_UNIT);
    })

    it('상품 구매 금액은 한 번에 최대 10,000원까지 충전할 수 있다. 해당 조건을 벗어나는 경우 안내 snack bar가 나타난다.', () => {
      const charge = 10050;

      addCustomerCharge(charge);
      cy.get('.snackbar').should('be.visible').and('have.text', ERROR_MESSAGE.CUSTOMER_CHARGE_WRONG_LIMIT);
    })


  })
  

})
