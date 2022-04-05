import { ERROR_MESSAGE, USER_REGISTER_RULES } from '../../src/js/constants';
import createRandomUserData from '../support/createRandomUserData';

const baseUrl = 'http://localhost:9000';

describe('사용자 인증 오류 테스트', () => {
  describe('회원가입 시 오류 테스트', () => {
    beforeEach(() => {
      cy.visit(baseUrl);
    });

    it('모든 칸을 채우지 않으면 모든 칸을 작성하라는 메시지가 표시된다.', () => {
      const userData = createRandomUserData();
      delete userData.name;

      cy.validateRegister(userData);

      cy.get('.snackbar').should(
        'have.text',
        ERROR_MESSAGE.USER_DATA.MISSING_REQUIRED_DATA
      );
    });

    it(`${USER_REGISTER_RULES.NAME_MIN_LENGTH}자 미만의 이름을 입력하면 이름 길이 오류 메시지가 표시된다.`, () => {
      const userData = createRandomUserData();
      userData.name = userData.name.slice(0, USER_REGISTER_RULES.NAME_MIN_LENGTH - 1);

      cy.validateRegister(userData);

      cy.get('.snackbar').should(
        'have.text',
        ERROR_MESSAGE.USER_DATA.NAME_LENGTH_OUT_OF_RANGE
      );
    });

    it(`${USER_REGISTER_RULES.NAME_MAX_LENGTH}자 초과의 이름을 입력하면 이름 길이 오류 메시지가 표시된다.`, () => {
      const userData = createRandomUserData();
      userData.name = userData.name.padEnd(USER_REGISTER_RULES.NAME_MAX_LENGTH + 1, 'a');

      cy.validateRegister(userData);

      cy.get('.snackbar').should(
        'have.text',
        ERROR_MESSAGE.USER_DATA.NAME_LENGTH_OUT_OF_RANGE
      );
    });

    it('8자 미만의 비밀번호를 입력하면 비밀번호 규칙을 확인하라는 메시지가 표시된다.', () => {
      const userData = createRandomUserData();
      userData.password = 'abcd12!';

      cy.validateRegister(userData);

      cy.get('.snackbar').should('have.text', ERROR_MESSAGE.USER_DATA.INVALID_PASSWORD);
    });

    it('20자 초과의 비밀번호를 입력하면 비밀번호 규칙을 확인하라는 메시지가 표시된다.', () => {
      const userData = createRandomUserData();
      userData.password = 'abcde12345!!!!!@@@@@@';

      cy.validateRegister(userData);

      cy.get('.snackbar').should('have.text', ERROR_MESSAGE.USER_DATA.INVALID_PASSWORD);
    });

    it('특수 문자를 포함하지 않은 비밀번호를 입력하면 비밀번호 규칙을 확인하라는 메시지가 표시된다.', () => {
      const userData = createRandomUserData();
      userData.password = 'abcde123';

      cy.validateRegister(userData);

      cy.get('.snackbar').should('have.text', ERROR_MESSAGE.USER_DATA.INVALID_PASSWORD);
    });

    it('숫자를 포함하지 않은 비밀번호를 입력하면 비밀번호 규칙을 확인하라는 메시지가 표시된다.', () => {
      const userData = createRandomUserData();
      userData.password = 'abcde!!!';

      cy.validateRegister(userData);

      cy.get('.snackbar').should('have.text', ERROR_MESSAGE.USER_DATA.INVALID_PASSWORD);
    });

    it('영소문자를 포함하지 않은 비밀번호를 입력하면 비밀번호 규칙을 확인하라는 메시지가 표시된다.', () => {
      const userData = createRandomUserData();
      userData.password = '12345!!!';

      cy.validateRegister(userData);

      cy.get('.snackbar').should('have.text', ERROR_MESSAGE.USER_DATA.INVALID_PASSWORD);
    });

    it('비밀번호와 비밀번호 확인이 일치하지 않으면 일치하지 않는다는 메시지가 표시된다.', () => {
      const userData = createRandomUserData();
      userData.passwordConfirm = 'abcd1234!!!';

      cy.validateRegister(userData);

      cy.get('.snackbar').should('have.text', ERROR_MESSAGE.USER_DATA.NO_MATCH_PASSWORD);
    });

    it('가입한 이메일로 다시 가입하려고 하면 오류 메시지가 표시된다.', () => {
      const userData = createRandomUserData();

      cy.registerNewUser(userData);

      cy.get('#user-button').click();
      cy.get('#logout-button').click();

      cy.registerNewUser(userData);

      cy.get('.snackbar').should('have.text', ERROR_MESSAGE.USER_DATA.DUPLICATE_EMAIL);
    });
  });

  describe('회원정보 수정 시 오류 테스트', () => {
    const userData = createRandomUserData();

    before(() => {
      cy.visit(baseUrl);
      cy.registerNewUser(userData);
    });

    beforeEach(() => {
      cy.get('#user-button').click();
      cy.get('#user-info-link').click();
    });

    it(`이름을 ${USER_REGISTER_RULES.NAME_MIN_LENGTH}글자 미만으로 수정하려고 하면 오류가 발생한다.`, () => {
      const shortName = userData.name.slice(0, USER_REGISTER_RULES.NAME_MIN_LENGTH - 1);
      cy.get('#name-input').clear().type(shortName);

      cy.get('.submit-button').click();

      cy.get('.snackbar').should(
        'have.text',
        ERROR_MESSAGE.USER_DATA.NAME_LENGTH_OUT_OF_RANGE
      );
    });

    it(`이름을 ${USER_REGISTER_RULES.NAME_MAX_LENGTH}글자 초과로 수정하려고 하면 오류가 발생한다.`, () => {
      cy.get('#name-input')
        .clear()
        .type(userData.name.padEnd(USER_REGISTER_RULES.NAME_MAX_LENGTH + 1, 'a'));

      cy.get('.submit-button').click();

      cy.get('.snackbar').should(
        'have.text',
        ERROR_MESSAGE.USER_DATA.NAME_LENGTH_OUT_OF_RANGE
      );
    });

    it('8자 미만의 비밀번호를 입력하면 비밀번호 규칙을 확인하라는 메시지가 표시된다.', () => {
      const newPassword = 'abcd12!';

      cy.updatePassword(newPassword);

      cy.get('.snackbar').should('have.text', ERROR_MESSAGE.USER_DATA.INVALID_PASSWORD);
    });

    it('20자 초과의 비밀번호를 입력하면 비밀번호 규칙을 확인하라는 메시지가 표시된다.', () => {
      const newPassword = 'abcde12345!!!!!@@@@@@';

      cy.updatePassword(newPassword);

      cy.get('.snackbar').should('have.text', ERROR_MESSAGE.USER_DATA.INVALID_PASSWORD);
    });

    it('특수 문자를 포함하지 않은 비밀번호를 입력하면 비밀번호 규칙을 확인하라는 메시지가 표시된다.', () => {
      const newPassword = 'abcde123';

      cy.updatePassword(newPassword);

      cy.get('.snackbar').should('have.text', ERROR_MESSAGE.USER_DATA.INVALID_PASSWORD);
    });

    it('숫자를 포함하지 않은 비밀번호를 입력하면 비밀번호 규칙을 확인하라는 메시지가 표시된다.', () => {
      const newPassword = 'abcde!!!';

      cy.updatePassword(newPassword);

      cy.get('.snackbar').should('have.text', ERROR_MESSAGE.USER_DATA.INVALID_PASSWORD);
    });

    it('영소문자를 포함하지 않은 비밀번호를 입력하면 비밀번호 규칙을 확인하라는 메시지가 표시된다.', () => {
      const newPassword = '12345!!!';

      cy.updatePassword(newPassword);

      cy.get('.snackbar').should('have.text', ERROR_MESSAGE.USER_DATA.INVALID_PASSWORD);
    });

    it('비밀번호와 비밀번호 확인이 일치하지 않으면 일치하지 않는다는 메시지가 표시된다.', () => {
      const newPassword = 'a1234!!!';
      const newPasswordConfirm = 'a1234!!!!';

      cy.updatePassword(newPassword, newPasswordConfirm);

      cy.get('.snackbar').should('have.text', ERROR_MESSAGE.USER_DATA.NO_MATCH_PASSWORD);
    });
  });

  describe('로그인 시 오류 테스트', () => {
    const userData = createRandomUserData();
    before(() => {
      cy.visit(baseUrl);
      cy.registerNewUser(userData);
      cy.logout();
    });

    beforeEach(() => {
      cy.visit(baseUrl);
    });

    it('존재하지 않는 이메일로 로그인을 시도하면 오류가 표시된다.', () => {
      const unknownData = { ...userData, email: userData.email.slice(0, -1) };
      cy.login(unknownData);

      cy.get('.snackbar').should(
        'have.text',
        ERROR_MESSAGE.USER_DATA.INCORRECT_LOGIN_DATA
      );
    });

    it('올바르지 않은 비밀번호로 로그인을 시도하면 오류가 표시된다.', () => {
      const unknownData = { ...userData, password: userData.password.slice(0, -1) };
      cy.login(unknownData);

      cy.get('.snackbar').should(
        'have.text',
        ERROR_MESSAGE.USER_DATA.INCORRECT_LOGIN_DATA
      );
    });
  });
});
