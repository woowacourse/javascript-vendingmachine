describe('자판기를 이용할 수 있다.', () => {
  const product = {
    name: '티거',
    price: 1000,
    quantity: 10,
  };

  const user = {
    email: `${Date.now()}@test.com`,
    name: '티거',
    password: 'tiger',
  };

  before(() => {
    cy.visit('http://localhost:9000');

    document.cookie = `user_id=`;
    document.cookie = `access_token=`;
  });

  it('고객은 고객용 화면을 볼 수 있어야 한다.', () => {
    cy.showCustomerScreen();
  });

  it('로그인 버튼을 클릭하면 로그인 화면을 볼 수 있어야 한다.', () => {
    cy.get('.login-button').click();

    cy.hash().should('eq', '#!login');
    cy.get('vending-machine').should('not.be.visible');
    cy.get('log-in').should('be.visible');
  });

  it('회원 가입 버튼을 클릭하면 회원 가입 화면을 볼 수 있어야 한다.', () => {
    cy.get('.signup-button').click();

    cy.hash().should('eq', '#!signup');
    cy.get('log-in').should('not.be.visible');
    cy.get('sign-up').should('be.visible');
  });

  it('회원 가입을 할 수 있어야 한다.', () => {
    cy.signup(user);
  });

  it('로그인을 할 수 있어야 한다.', () => {
    cy.login(user);
  });

  it('로그인 한 관리자는 관리자용 화면을 볼 수 있어야 한다.', () => {
    const userNameFirstChar = user.name.charAt(0);

    cy.showDefaultAdministratorScreen(userNameFirstChar);
  });

  it('상품을 추가하면 추가한 상품을 상품 현황에서 볼 수 있어야 한다.', () => {
    const { name } = product;

    cy.get('.nav__product-manage-button').click();
    cy.typeAddProductInputs(product);

    cy.get(`[data-product-name="${name}"]`).should('be.visible');
  });

  it('추가한 상품을 구매 가능 상품 현황에서 볼 수 있어야 한다.', () => {
    const { name } = product;

    cy.get('.nav__product-purchase-button').click();

    cy.get(`[data-purchasable-product-name="${name}"]`).should('be.visible');
  });

  it('상품을 구매할 금액을 투입할 수 있어야 한다.', () => {
    const customerMoney = 1000;

    cy.get('#customer-money-input').type(customerMoney).type('{enter}');

    cy.get('.customer-money').should('have.text', customerMoney);
  });

  it('상품을 구매할 수 있어야 한다.', () => {
    const { name, price } = product;
    const customerMoney = 1000;

    cy.get(`[data-purchasable-product-name="${name}"]`).find('.table__product-purchase-button').click();

    cy.get('.customer-money').should('have.text', customerMoney - price);
    cy.get(`[data-purchasable-product-name="${name}"]`)
      .find('.purchasable-product-quantity-td')
      .should('have.text', product.quantity - 1);
  });

  it('회원 정보 수정 버튼을 클릭하면 회원 정보 수정 화면을 볼 수 있어야 한다.', () => {
    const { email } = user;

    cy.get('.user-button').click();
    cy.get('.user-info-modify-button').click();

    cy.hash().should('eq', '#!user-info-modify');
    cy.get('vending-machine').should('not.be.visible');
    cy.get('user-info-modify').should('be.visible');
    cy.get('#user-info-modify-email').should('have.attr', 'placeholder', email);
  });

  it('회원 정보를 수정할 수 있어야 한다.', () => {
    const newUserInfo = {
      name: '호랑',
      password: 'horang',
    };

    cy.typeModifyUserInfoInputs(newUserInfo);
  });

  it('로그아웃을 할 수 있어야 한다.', () => {
    cy.shouldBaseHash();

    cy.get('.user-button').click();
    cy.get('.logout-button').click();

    cy.showCustomerScreen();
  });
});
