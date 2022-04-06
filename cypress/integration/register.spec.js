describe('회원가입 테스트', () => {
  const email = `${Math.random().toString(36).substring(3, 8)}@naaver.com`;
  const name = '김이박';
  const password = '1234!@#$asdf';
  const confirmPassword = '1234!@#$asdf';

  it('회원가입 페이지에 들어간 후, 올바른 정보를 입력하고 확인을 누르면 해당 아이디와 비밀번호로 로그인이 가능하다.', () => {
    cy.register(email, name, password, confirmPassword);
    cy.login(email, password);
    cy.get('#thumbnail-button').should('have.text', name[0]);
  });
});
