describe('', () => {
  before(() => {
    cy.visit('/');
  });

  it('회원가입 완료 버튼을 누르면 회원가입을 할 수 있다', () => {
    cy.get('#signup').click();
  });
});
