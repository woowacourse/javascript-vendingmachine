describe('로그인 유효성 검사', () => {
  before(() => {
    cy.visit('/');
  });

  it('메인화면에서 로그인 버튼을 누르면, 로그인 화면이 보여진다.', () => {
    cy.get('.sign-in-button').click('');
    cy.get('.sign-in-section').should('be.visible');
  });

  it('잘못된 이메일 형식의 이메일을 기입 후 확인 버튼을 누르면 에러메시지가 스넥바로 보여진다.', () => {
    cy.get('.sign-in-form__email-input').clear().type('kkojae');
    cy.get('.sign-in-form__password-input').clear().type('1234');

    cy.get('.sign-in-form__verify-button').click();

    cy.get('.snack-bar-container__message').should(
      'have.text',
      '이메일 형식 오류'
    );
  });

  it('존재하지 않은 이메일을 기입 후 확인 버튼을 누르면 에러메시지가 스넥바로 보여진다.', () => {
    cy.wait(3000);
    cy.get('.sign-in-form__email-input').clear().type('kkojae@gmail.com');
    cy.get('.sign-in-form__password-input').clear().type('1234');

    cy.get('.sign-in-form__verify-button').click();

    cy.get('.snack-bar-container__message').should(
      'have.text',
      '존재하지 않는 이메일입니다. 이메일을 확인 후 다시 로그인 해주세요.'
    );
  });
});
