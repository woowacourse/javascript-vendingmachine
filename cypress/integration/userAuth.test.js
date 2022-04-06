import { ERROR_MSG } from '../../src/utils/constants';
describe('유저의 인증와 인가를 관련하여 테스트를 한다', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('회원가입시 이름이 2~6글자가 아닐때에 alert를 호출한다 ', () => {
    const userEmail = '12345@name.com';
    const userName = '1';
    const userPassword = '1234asdf!@';

    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.signIn(userEmail, userName, userPassword).then(() => {
      expect(alertStub).to.be.calledWith(ERROR_MSG.OVER_USER_NAME_RANGE);
    });
  });

  it('회원가입시 비밀번호가 규칙을 지키지 아닐 때에 alert를 호출한다 ', () => {
    const userEmail = '12345@name.com';
    const userName = '12';
    const userPassword = '1234';

    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.signIn(userEmail, userName, userPassword).then(() => {
      expect(alertStub).to.be.calledWith(ERROR_MSG.NOT_MATCH_PASSWORD_FORM);
    });
  });

  it('유저는 회원가입을 할 수 있다', () => {
    const userEmail = '789456@name.com';
    const userName = 'sally';
    const userPassword = '1234asdf!@#$';

    cy.signIn(userEmail, userName, userPassword);
    cy.get('#user-profile').should('have.text', 's');
  });

  it('유저는 로그인을 할 수 있다', () => {
    const userEmail = '789456@name.com';
    const userPassword = '1234asdf!@#$';

    cy.login(userEmail, userPassword);
    cy.get('#user-profile').should('have.text', 's');
  });

  it('유저는 회원 정보를 수정할 수 있다', () => {
    const userEmail = '789456@name.com';
    const userPassword = '1234asdf!@#$';

    const editedUserName = 'editN';

    cy.login(userEmail, userPassword);

    cy.get('#user-profile').click();

    cy.get('#edit-user-href').click();

    cy.get('#edit-name-input').clear().type(editedUserName);
    cy.get('#edit-password-input').type(userPassword);
    cy.get('#edit-password-confirm-input').type(userPassword);

    cy.get('#edit-user-info-form').submit();

    cy.get('#user-profile').should('have.text', 'e');
  });
});
