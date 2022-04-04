import { ERROR_MESSAGE } from '../../src/js/constants';

const baseUrl = 'http://localhost:9000';

describe('사용자 인증 테스트', () => {
  function createRandomUserData() {
    return { email: `${Date.now()}@test.com`, name: 'test', password: 'abcd1234!!' };
  }

  describe('기본 기능 테스트', () => {
    beforeEach(() => {
      cy.visit(baseUrl);

      // 모든 테스트 시작 전 로그아웃
      cy.logout();
    });

    it('처음 접속하면 상품 구매 탭이 표시된다.', () => {
      cy.get('#purchase-tab-title').should('exist');
    });

    it('로그인 하지 않은 상태에서는 탭 전환 메뉴가 표시되지 않는다', () => {
      cy.get('#tab-menu-navigation').should('not.exist');
    });

    it('로그인 페이지로 이동할 수 있다.', () => {
      cy.get('#login-link-button').click();

      cy.hash().should('eq', '#/login');
    });

    it('로그인 페이지에서 회원가입 페이지로 이동할 수 있다.', () => {
      cy.get('#login-link-button').click();
      cy.get('#register-page-link').click();

      cy.hash().should('eq', '#/register');
    });

    it('회원가입을 마치면 상품관리 페이지로 이동된다.', () => {
      const userData = createRandomUserData();
      cy.registerNewUser(userData);

      cy.get('#manage-tab-title').should('exist');
    });

    it('회원가입을 마치면 로그인 버튼이 사라져야 한다.', () => {
      const userData = createRandomUserData();
      cy.registerNewUser(userData);

      cy.get('#login-link-button').should('not.exist');
    });

    it('회원가입을 마치면 탭 메뉴가 표시된다.', () => {
      const userData = createRandomUserData();
      cy.registerNewUser(userData);

      cy.get('#tab-menu-navigation').should('exist');
    });

    it('로그인을 하면 프로필 버튼을 클릭할 수 있어야 한다.', () => {
      const userData = createRandomUserData();

      cy.loginWithNewUser(userData);

      cy.get('#user-button').click();
    });

    it('로그인을 하면 로그아웃을 할 수 있어야 한다.', () => {
      const userData = createRandomUserData();

      cy.loginWithNewUser(userData);

      cy.get('#user-button').click();
      cy.get('#logout-button').click();
    });

    it('로그인을 하면 탭 메뉴가 표시된다.', () => {
      const userData = createRandomUserData();

      cy.loginWithNewUser(userData);

      cy.get('#tab-menu-navigation').should('exist');
    });

    it('로그인을 했을 때 사용자 이름을 수정할 수 있다.', () => {
      cy.intercept({
        method: 'PATCH',
        url: '**/users/*',
      }).as('updateUserRequest');
      const userData = createRandomUserData();
      const newName = `${userData.name}1`;

      cy.loginWithNewUser(userData);

      cy.get('#user-button').click();
      cy.get('#user-info-link').click();

      cy.get('#name-input').clear().type(newName);
      cy.get('.submit-button').click();

      cy.wait('@updateUserRequest');

      cy.get('#name-input').should('have.value', newName);
    });
  });

  describe('회원가입 시 오류 테스트', () => {
    beforeEach(() => {
      cy.visit(baseUrl);

      // 모든 테스트 시작 전 로그아웃
      cy.logout();
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

    it('2자 미만의 이름을 입력하면 이름 길이 오류 메시지가 표시된다.', () => {
      const userData = createRandomUserData();
      userData.name = '블';

      cy.validateRegister(userData);

      cy.get('.snackbar').should(
        'have.text',
        ERROR_MESSAGE.USER_DATA.NAME_LENGTH_OUT_OF_RANGE
      );
    });

    it('6자 초과의 이름을 입력하면 이름 길이 오류 메시지가 표시된다.', () => {
      const userData = createRandomUserData();
      userData.name = '블링블링블링블';

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
      cy.logout();

      cy.registerNewUser(userData);

      cy.get('.snackbar').should('have.text', ERROR_MESSAGE.USER_DATA.DUPLICATE_EMAIL);
    });
  });

  describe('회원정보 수정 시 오류 테스트', () => {
    const userData = createRandomUserData();

    before(() => {
      cy.logout();
      cy.visit(baseUrl);
      cy.registerNewUser(userData);
    });

    beforeEach(() => {
      cy.get('#user-button').click();
      cy.get('#user-info-link').click();
    });

    it('이름을 2글자 미만으로 수정하려고 하면 오류가 발생한다.', () => {
      cy.get('#name-input').clear().type(userData.name[0]);

      cy.get('.submit-button').click();

      cy.get('.snackbar').should(
        'have.text',
        ERROR_MESSAGE.USER_DATA.NAME_LENGTH_OUT_OF_RANGE
      );
    });

    it('이름을 6글자 초과로 수정하려고 하면 오류가 발생한다.', () => {
      cy.get('#name-input').clear().type(userData.name.padEnd(7, 'a'));

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
      cy.logout();
      cy.registerNewUser(userData);
    });

    beforeEach(() => {
      cy.logout();
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
