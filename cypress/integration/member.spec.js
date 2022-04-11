describe('회원가입 및 로그인을 테스트한다.', () => {
  before(() => {
    cy.visit('http://localhost:9000');
  });

  const randomEmail = `${Math.random()}@naver.com`;
  const name = '나인';
  const password = 'asdqwe123!';

  it('회원가입을 진행할 수 있다.', () => {
    cy.signUp(randomEmail, name, password);
    cy.get('login-header button').should('have.text', '로그인');
  });

  it('로그인을 진행할 수 있다.', () => {
    cy.login();
    cy.get('login-info button').should('be.visible');
  });
});
