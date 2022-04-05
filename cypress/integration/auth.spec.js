describe('관리자 인증 테스트', () => {
  beforeEach(() => {
    cy.visit('dist/index.html');
  });

  after(() => {
    cy.logout();
  });

  it('로그인했을 때 관리자 화면을 볼 수 있어야 한다.', () => {
    const email = 'test1@test1';
    const password = 'Password1234';
    cy.get('#login-button').click();
    cy.login(email, password);

    cy.get('nav').should('be.visible');
  });

  it('로그인 상태에서 로그아웃 버튼을 눌렀을 때 로그아웃이 되어야한다.', () => {
    cy.logout();
    cy.get('#login-button').should('be.visible');
  });

  it('로그인 상태에서 회원 정보를 수정할 수 있어야한다.', () => {
    const email = 'test1@test1';
    const password = 'Password1234';
    cy.get('#login-button').click();
    cy.login(email, password);

    cy.get('#manager-name-button').click();
    cy.get('#modify-info').click();

    // 회원 정보 수정
    const newName = 'new';
    cy.get('#name-input').clear();
    cy.get('#name-input').type(newName);
    cy.get('#password-input').type(password);
    cy.get('#password-check').type(password);
    cy.get('#sign-up-info-form button').click();

    cy.wait(1000);

    cy.login(email, password);

    cy.get('#manager-name-button').contains('n');
  });
});
