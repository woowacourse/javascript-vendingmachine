describe('로그인 및 로그아웃 테스트', () => {
  const email = `${Math.random().toString(36).substring(3, 8)}@naaver.com`;
  const name = '김이박';
  const password = '1234!@#$asdf';
  const confirmPassword = '1234!@#$asdf';

  before(() => {
    cy.register(email, name, password, confirmPassword);
  });

  it('메인 화면에서 로그인 버튼을 누르고, 이메일과 비밀번호를 입력한 후 확인을 누르면 메인화면에 썸네일 버튼이 생긴다.', () => {
    cy.login(email, password);
    cy.get('#thumbnail-button').should('be.visible');
  });

  it('로그인 후, 썸네일 버튼을 누르고 로그아웃을 선택하면 로그아웃되고, 로그인 버튼으로 바뀐다.', () => {
    cy.login(email, password);
    cy.get('#thumbnail-button').click();
    cy.get('.thumbnail-option').select('logout');
    cy.get('#login-button').should('be.visible');
  });
});
