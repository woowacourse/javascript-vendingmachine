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

    const oldName = 'old';
    cy.modifyInfo(email, oldName, password);

    cy.get('#manager-name-button').contains('o');

    const newName = 'new';
    cy.modifyInfo(email, newName, password);

    cy.get('#manager-name-button').contains('n');
  });
});
