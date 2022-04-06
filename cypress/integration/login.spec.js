describe('로그인 테스트', () => {
  const email = 'a@naaver.com';
  const password = '1234!@#$asdf';

  it('메인 화면에서 로그인 버튼을 누르고, 이메일과 비밀번호를 입력한 후 확인을 누르면 메인화면에 썸네일 버튼이 생긴다.', () => {
    cy.login(email, password);
    cy.get('#thumbnail-button').should('be.visible');
  });
});
