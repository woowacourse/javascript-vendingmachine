import { ERROR_MESSAGE } from '../../src/ts/constants/errorMessage';
import { SNACK_BAR_DELAY_TIME } from '../../src/ts/constants/snackBar';
import { VALID, INVALID } from './testConstant';

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
    cy.get('.sign-up-form__email-input').clear().type(INVALID.EMAIL);
    cy.get('.sign-up-form__name-input').clear().type(VALID.NAME);
    cy.get('.sign-up-form__password-input').clear().type(VALID.PASSWORD);
    cy.get('.sign-up-form__password-confirm-input')
      .clear()
      .type(VALID.PASSWORD);

    cy.get('.sign-up-form__verify-button').click();

    cy.get('.snack-bar-container__message').should(
      'have.text',
      ERROR_MESSAGE.WRONG_FORMAT_EMAIL
    );
  });

  it('1글자인 이름을 입력하고, 확인 버튼을 클릭하면 에러 메시지가 스넥바로 보여진다.', () => {
    cy.wait(SNACK_BAR_DELAY_TIME);
    cy.get('.sign-up-form__email-input').clear().type(VALID.EMAIL);
    cy.get('.sign-up-form__name-input').clear().type(INVALID.TO_SHORT_NAME);
    cy.get('.sign-up-form__password-input').clear().type(VALID.PASSWORD);
    cy.get('.sign-up-form__password-confirm-input')
      .clear()
      .type(VALID.PASSWORD);

    cy.get('.sign-up-form__verify-button').click();

    cy.get('.snack-bar-container__message').should(
      'have.text',
      ERROR_MESSAGE.WRONG_FORMAT_NAME
    );
  });

  it('7글자인 이름을 입력하고, 확인 버튼을 클릭하면 에러 메시지가 스넥바로 보여진다.', () => {
    cy.wait(SNACK_BAR_DELAY_TIME);
    cy.get('.sign-up-form__email-input').clear().type(VALID.EMAIL);
    cy.get('.sign-up-form__name-input').clear().type(INVALID.TO_LONG_NAME);
    cy.get('.sign-up-form__password-input').clear().type(VALID.PASSWORD);
    cy.get('.sign-up-form__password-confirm-input')
      .clear()
      .type(VALID.PASSWORD);

    cy.get('.sign-up-form__verify-button').click();

    cy.get('.snack-bar-container__message').should(
      'have.text',
      ERROR_MESSAGE.WRONG_FORMAT_NAME
    );
  });

  it('8 ~ 16글자 사이의 영문 + 숫자 조합이 아닌 비밀번호를 입력하면 에러메시지가 스넥바로 보여진다.', () => {
    cy.wait(SNACK_BAR_DELAY_TIME);
    cy.get('.sign-up-form__email-input').clear().type(VALID.EMAIL);
    cy.get('.sign-up-form__name-input').clear().type(VALID.NAME);
    cy.get('.sign-up-form__password-input')
      .clear()
      .type(INVALID.ONLY_TEXT_PASSWORD);
    cy.get('.sign-up-form__password-confirm-input')
      .clear()
      .type(INVALID.ONLY_TEXT_PASSWORD);

    cy.get('.sign-up-form__verify-button').click();

    cy.get('.snack-bar-container__message').should(
      'have.text',
      ERROR_MESSAGE.WRONG_FORMAT_PASSWORD
    );
  });

  it('비밀번호와 비밀번호 확인에 입력한 값이 서로 다를 경우 에러메시지가 스넥바로 보여진다.', () => {
    cy.wait(SNACK_BAR_DELAY_TIME);
    cy.get('.sign-up-form__email-input').clear().type(VALID.EMAIL);
    cy.get('.sign-up-form__name-input').clear().type(VALID.NAME);
    cy.get('.sign-up-form__password-input').clear().type(VALID.PASSWORD);
    cy.get('.sign-up-form__password-confirm-input')
      .clear()
      .type(INVALID.CONFLICT_CONFIRM_PASSWORD);

    cy.get('.sign-up-form__verify-button').click();

    cy.get('.snack-bar-container__message').should(
      'have.text',
      ERROR_MESSAGE.MISMATCH_PASSWORD
    );
  });
});
