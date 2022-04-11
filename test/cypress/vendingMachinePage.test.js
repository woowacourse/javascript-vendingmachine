describe('페이지 전환이 요구사항과 일치해야 한다.', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const userInfoForSuccessfulLogin = {
    email: 'tester@test.com',
    password: 'asdASD123',
  }

  const login = (userInfo) => {
    cy.get('#login-button').click();
    cy.get('[name="email"]').type(userInfo.email);
    cy.get('[name="password"]').type(userInfo.password);
    cy.get('#login-form').submit();
  }

  const shouldMainPage = () => {
    cy.get('#customer-charge-form-section').should('be.visible');
    cy.get('#product-table-section').should('be.visible');
    cy.get('#change-table-section').should('be.visible');
  }

  context('메인 페이지 테스트', () => {
    it('메인 페이지로 상품 구매 페이지가 보여야 한다.', () => {
      shouldMainPage();
    })

    it('로그인하지 않은 경우, 메인 페이지에서 다른 관리 페이지로 이동하는 버튼은 보이지 않는다.', () => {
      cy.get('nav').should('not.be.visible');
    })

    it('로그인하지 않은 경우, 메인 페이지에서 "로그인" 버튼이 보여야 한다.', () => {
      cy.get('#login-button').should('be.visible');
    })

    it('로그인한 경우, 메인 페이지에서 다른 관리 페이지로 이동하는 버튼이 보여야 한다.', () => {
      // when
      login(userInfoForSuccessfulLogin);

      // then
      cy.get('nav').should('be.visible');
    })

    it('로그인한 경우, 메인 페이지에서 사용자 썸네일 버튼이 보여야 한다.', () => {
      // when
      login(userInfoForSuccessfulLogin);

      // then
      cy.get('#user-thumbnail-button').should('be.visible');
    })
  })

  context('로그인하지 않은 사용자의 페이지 이동 테스트', () => {
    it('메인 페이지에서 "로그인" 버튼을 누르면, 로그인 페이지로 이동한다.', () => {
      // when
      cy.get('#login-button').click();

      // then
      cy.url().should('include', 'login');
      cy.get('.title').should('have.text', '로그인');
      cy.get('#login-form').should('be.visible');
    })

    it('로그인 페이지에서 "회원가입" 버튼을 누르면, 회원가입 페이지로 이동한다.', () => {
      // when
      cy.get('#login-button').click();
      cy.get('[data-page="signUp"]').click();

      // then
      cy.url().should('include', 'signUp');
      cy.get('.title').should('have.text', '회원가입');
      cy.get('#signup-form').should('be.visible');
    })

    it('로그인 페이지에서 "메인으로" 버튼을 누르면, 메인 페이지로 이동한다.', () => {
      // when
      cy.get('#login-button').click();
      cy.get('#go-main-button').click();

      // then
      shouldMainPage();
    })

    it('회원가입 페이지에서 "메인으로" 버튼을 누르면, 메인 페이지로 이동한다.', () => {
      // when
      cy.get('#login-button').click();
      cy.get('[data-page="signUp"]').click();
      cy.get('#go-main-button').click();

      // then
      shouldMainPage();
    })
  })

  context('로그인한 사용자의 페이지 이동 테스트', () => {
    it('메인 페이지에서 "상품 관리" 버튼을 누르면, 상품 관리 페이지로 이동한다.', () => {
      // when
      login(userInfoForSuccessfulLogin);
      cy.get('[data-page="productManagement"]').click();

      // then
      cy.url().should('include', 'productManagement');
      cy.get('#add-product-form-section').should('be.visible');
      cy.get('#product-table-section').should('be.visible');
    })

    it('메인 페이지에서 "잔돈 충전" 버튼을 누르면, 잔돈 충전 페이지로 이동한다.', () => {
      // when
      login(userInfoForSuccessfulLogin);
      cy.get('[data-page="vendingMachineChargeManagement"]').click();

      // then
      cy.url().should('include', 'vendingMachineChargeManagement');
      cy.get('#vendingmachine-charge-form-section').should('be.visible');
      cy.get('#vendingmachine-charge-table-section').should('be.visible');
    })

    it('메인 페이지에서 "상품 구매" 버튼을 누르면, 상품 구매 페이지로 이동한다.', () => {
      // when
      login(userInfoForSuccessfulLogin);
      cy.get('[data-page="productPurchase"]').click();

      // then
      cy.url().should('include', 'productPurchase');
      cy.get('#customer-charge-form-section').should('be.visible');
      cy.get('#product-table-section').should('be.visible');
      cy.get('#change-table-section').should('be.visible');
    })

    it('사용자 썸네일 버튼을 누르고, "회원 정보 수정" 메뉴를 선택하면 회원 정보 수정 페이지로 이동한다.', () => {
      // when
      login(userInfoForSuccessfulLogin);
      cy.get('#user-thumbnail-button').click();
      cy.get('[data-page="updateMyInfo"]').click();

      // then
      cy.url().should('include', 'updateMyInfo');
      cy.get('.title').should('have.text', '회원 정보 수정');
      cy.get('#update-my-info-form').should('be.visible');
    })

    it('사용자 썸네일 버튼을 누르고, "로그아웃" 메뉴를 선택하면 로그아웃되어 메인 페이지로 이동한다.', () => {
      // when
      login(userInfoForSuccessfulLogin);
      cy.get('#user-thumbnail-button').click();
      cy.get('#logout-button').click();

      // then
      shouldMainPage();
    })
  })

})
