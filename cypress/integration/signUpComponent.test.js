describe('회원가입 유효성 검사', () => {
  before(() => {
    cy.visit('/');
  });

  it('메인 화면에서 로그인 버튼을 누르고, 회원가입 링크를 누르면 회원가입 화면이 보여진다.', () => {
    cy.get('.sign-in-button').click();
    cy.get('.sign-in-section__sign-up-button').click();

    cy.get('.sign-up-section').should('be.visible');
  });

  it('이메일 입력 칸에 잘못된 이메일 형식을 입력하고, 확인 버튼을 클릭하면 에러 메시지가 스넥바로 보여진다.', () => {
    cy.get('.sign-up-form__email-input').clear().type('kkojae77');
    cy.get('.sign-up-form__name-input').clear().type('꼬재');
    cy.get('.sign-up-form__password-input').clear().type('qwerty123123');
    cy.get('.sign-up-form__password-confirm-input')
      .clear()
      .type('qwerty123123');

    cy.get('.sign-up-form__verify-button').click();

    cy.get('.snack-bar-container__message').should(
      'have.text',
      '이메일 형식 오류'
    );
  });

  it('1글자인 이름을 입력하고, 확인 버튼을 클릭하면 에러 메시지가 스넥바로 보여진다.', () => {
    cy.wait(3000);
    cy.get('.sign-up-form__email-input').clear().type('kkojae777@gmail.com');
    cy.get('.sign-up-form__name-input').clear().type('꼬');
    cy.get('.sign-up-form__password-input').clear().type('qwerty123123');
    cy.get('.sign-up-form__password-confirm-input')
      .clear()
      .type('qwerty123123');

    cy.get('.sign-up-form__verify-button').click();

    cy.get('.snack-bar-container__message').should(
      'have.text',
      '이름은 2글자 ~ 6글자까지 입력 하실 수 있습니다.'
    );
  });

  it('7글자인 이름을 입력하고, 확인 버튼을 클릭하면 에러 메시지가 스넥바로 보여진다.', () => {
    cy.wait(3000);
    cy.get('.sign-up-form__email-input').clear().type('kkojae777@gmail.com');
    cy.get('.sign-up-form__name-input').clear().type('일곱글자인이름');
    cy.get('.sign-up-form__password-input').clear().type('qwerty123123');
    cy.get('.sign-up-form__password-confirm-input')
      .clear()
      .type('qwerty123123');

    cy.get('.sign-up-form__verify-button').click();

    cy.get('.snack-bar-container__message').should(
      'have.text',
      '이름은 2글자 ~ 6글자까지 입력 하실 수 있습니다.'
    );
  });

  it('8~16글자 사이의 영문 + 숫자 조합이 아닌 비밀번호를 입력하면 에러메시지가 스넥바로 보여진다.', () => {
    cy.wait(3000);
    cy.get('.sign-up-form__email-input').clear().type('kkojae777@gmail.com');
    cy.get('.sign-up-form__name-input').clear().type('꼬재');
    cy.get('.sign-up-form__password-input').clear().type('qwerty');
    cy.get('.sign-up-form__password-confirm-input').clear().type('qwerty');

    cy.get('.sign-up-form__verify-button').click();

    cy.get('.snack-bar-container__message').should(
      'have.text',
      '비밀번호 정규식 규칙 위반!!'
    );
  });

  it('비밀번호와 비밀번호 확인에 입력한 값이 서로 다를 경우 에러메시지가 스넥바로 보여진다.', () => {
    cy.wait(3000);
    cy.get('.sign-up-form__email-input').clear().type('kkojae777@gmail.com');
    cy.get('.sign-up-form__name-input').clear().type('꼬재');
    cy.get('.sign-up-form__password-input').clear().type('qwerty123123');
    cy.get('.sign-up-form__password-confirm-input').clear().type('qwerty');

    cy.get('.sign-up-form__verify-button').click();

    cy.get('.snack-bar-container__message').should(
      'have.text',
      '비밀번호와 비밀번호 확인이 일치하지 않습니다. 비밀번호를 확인 후 다시 입력해주세요.'
    );
  });
});
