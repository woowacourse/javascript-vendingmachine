describe('회원가입 및 로그인을 테스트한다.', () => {
  before(() => {
    cy.visit('http://localhost:9000');
  });
  const randomEmail = `${Math.random()}@naver.com`;
  const password = 'asdqwe123!';

  it('회원가입을 진행할 수 있다.', () => {
    cy.get('login-header button').click();
    cy.get('.sign-up-link').click();
    cy.get('[name=email]').type(randomEmail);
    cy.get('[name=name]').type('나인');
    cy.get('[name=password]').type(password);
    cy.get('[name=confirm-password]').type(password);
    cy.get('.signup-form button').click();

    cy.wait(1000);
    cy.get('login-header button').should('have.text', '로그인');
  });

  it('로그인을 진행할 수 있다.', () => {
    cy.get('login-header button').click();
    cy.get('[name=email]').type(String(randomEmail));
    cy.get('[name=password]').type('asdqwe123!');
    cy.get('login-form button').click();
    cy.wait(1000);
    cy.get('login-info button').should('have.text', '나');
  });
});
