const testSetting = {
  userEmail: `${Math.random().toString(36)}@compy.life`,
  userPassword: 'compyIsFree123',
  userName: '콤피',
  userNewPassword: 'compyIsFree456',
};

describe('1. 회원 시스템 사용 순서 테스트', () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.visit('http://localhost:9000');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('1. 첫 접속 시 비로그인 상태여야하며, 로그인 버튼이 출력되어야 한다.', () => {
    cy.get('#user-login-button').should('be.visible');
  });

  it('2. 로그인 버튼을 누르면 로그인 화면이 출력되어야 한다.', () => {
    cy.get('#user-login-button').click();
    cy.get('#login-form-section').should('be.visible');
  });

  it('3. 회원가입 링크를 누르면 회원가입 화면이 출력되어야 한다.', () => {
    cy.get('a[data-route="/register"]').click();
    cy.get('#register-form-section').should('be.visible');
  });

  it('4. 회원가입 시 잘못된 가입 정보로 회원가입을 시도할 시 스낵바가 출력되어야 한다.', () => {
    cy.get('#register-form-section input[name="email"]').type('nomail@mail.com');
    cy.get('#register-form-section input[name="name"]').type('이름이여섯글자가넘어버리다니');

    cy.get('#register-form-submit-button').click();
    cy.get('.snackbar-container').should('be.visible');
  });

  it('5. 회원 정보를 입력 후 로그인이 되어야 한다.', () => {
    cy.get('#register-form-section').enterUserLoginInfo({
      email: testSetting.userEmail,
      password: testSetting.userPassword,
    });

    cy.get('#register-form-section input[name="name"]').clear();

    cy.get('#register-form-section input[name="name"]').type(testSetting.userName);
    cy.get('#register-form-section input[name="password-confirm"]').type(testSetting.userPassword);

    cy.get('#register-form-submit-button').click();
    cy.get('#user-info-profile').should('be.visible');
  });

  it('6. 프로필을 클릭한 후 추가 메뉴를 열 수 있어야 한다.', () => {
    cy.get('#user-info-profile').click();
    cy.get('.user-info-menu').should('be.visible');
  });

  it('7. 프로필 수정을 눌러, 프로필 편집 페이지로 이동할 수 있어야 한다.', () => {
    cy.get('#user-info-profile-edit').click();
    cy.get('#user-profile-edit-form').should('be.visible');
  });

  it('8. 회원 정보 수정을 통해 비밀번호를 바꿀 수 있어야 한다.', () => {
    cy.get('#user-profile-edit-form input[name="password"]').type(testSetting.userNewPassword);
    cy.get('#user-profile-edit-form input[name="password-confirm"]').type(
      testSetting.userNewPassword,
    );

    cy.get('#register-form-submit-button').click();
  });

  it('9. 프로필 메뉴를 열고, 로그아웃 메뉴를 누르면 로그아웃 되어야 한다.', () => {
    cy.get('#user-info-profile').click();
    cy.get('#user-info-logout').click();

    cy.get('#user-login-button').should('be.visible');
  });

  it('10. 변경한 패스워드로 다시 로그인할 수 있어야 한다.', () => {
    cy.get('#user-login-button').click();

    cy.get('#login-form').enterUserLoginInfo({
      email: testSetting.userEmail,
      password: testSetting.userNewPassword,
    });

    cy.get('#login-form-submit-button').click();
  });
});
