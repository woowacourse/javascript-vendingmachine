describe('관리자 인증 테스트', () => {
  beforeEach(() => {
    cy.visit('dist/index.html');
  });

  it('회원가입 및 로그인 테스트', () => {
    const email = 'test1@test1';
    const name = 'test';
    const password = 'Password1234';
    cy.signupAndLogin(email, name, password);

    cy.get('nav').should('be.visible');
  });

  it('로그아웃 테스트', () => {
    const email = 'test1@test1';
    const password = 'Password1234';
    cy.get('#login-button').click();
    cy.login(email, password);

    cy.get('#manager-name-button').click();
    cy.get('#logout').click();
    cy.get('#login-button').should('be.visible');
  });

  it('회원 정보 수정 테스트', () => {
    const email = 'test1@test1';
    const password = 'Password1234';
    cy.get('#login-button').click();
    cy.login(email, password);

    cy.get('#manager-name-button').click();
    cy.get('#modify-info').click();

    // 회원 정보 수정
    const newName = 'new';
    cy.get('#name-input').type(newName);
    cy.get('#password-input').type(password);
    cy.get('#password-check').type(password);
    cy.get('#sign-up-info-form button').click();

    cy.wait(1000);

    cy.login(email, password);

    cy.get('#manager-name-button').contains('n');
  });
});
