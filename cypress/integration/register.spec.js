import { SELECTOR } from '../../src/ts/constant/selector';

describe('회원가입 테스트', () => {
  const name = '김이박';
  const password = '1234!@#$asdf';
  const confirmPassword = '1234!@#$asdf';

  it('회원가입 페이지에 들어간 후, 올바른 정보를 입력하고 확인을 누르면 해당 아이디와 비밀번호로 로그인이 가능하다.', () => {
    const email = `${Math.random().toString(36).substring(3, 8)}@naaver.com`;
    cy.register(email, name, password, confirmPassword);
    cy.login(email, password);

    cy.get(SELECTOR.THUMBNAIL_BUTTON).should('have.text', name[0]);
  });

  it('입력값 중 하나라도 공백이면, 경고창이 뜬다.', () => {
    const email = '   ';
    cy.register(email, name, password, confirmPassword);

    cy.checkSnackbarVisibility();
  });

  it('이름이 최소 글자 수(2글자) 미만이면, 경고창이 뜬다.', () => {
    const email = `${Math.random().toString(36).substring(3, 8)}@naaver.com`;
    const name = '박';
    cy.register(email, name, password, confirmPassword);

    cy.checkSnackbarVisibility();
  });

  it('비밀번호가 비밀 번호 규칙을 따르지 않으면, 경고창이 뜬다.', () => {
    const email = `${Math.random().toString(36).substring(3, 8)}@naaver.com`;
    const password = '12341234!@#$';
    const confirmPassword = '12341234!@#$';
    cy.register(email, name, password, confirmPassword);

    cy.checkSnackbarVisibility();
  });

  it('비밀번호와 비밀번호 확인 입력값이 다르면, 경고창이 뜬다.', () => {
    const email = `${Math.random().toString(36).substring(3, 8)}@naaver.com`;
    const confirmPassword = '12341234!@#$';
    cy.register(email, name, password, confirmPassword);

    cy.checkSnackbarVisibility();
  });
});
