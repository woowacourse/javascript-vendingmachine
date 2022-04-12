import { ERROR_MESSAGE } from '../../src/ts/constants';
import { pickRandomIndex } from '../../src/ts/utils';

const createRandomEmail = () =>
  `${Array.from({ length: 15 }, () => pickRandomIndex(1, 30)).join(
    ''
  )}@random.com`;

describe('로그인 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/signup');
  });

  it('로그인을 한 후 유저 이름을 수정할 수 있다.', () => {
    const randomEmail = createRandomEmail();
    const name = '후이';
    const password = 'test123!';

    cy.signup(randomEmail, name, password, password);

    cy.wait(1500);

    cy.get('.user-thumbnail').click();
    cy.get('.nav__user-button').click();

    const modifiedName = '변경한 이름';

    cy.get('.modify-name-input').clear().type(modifiedName);
    cy.get('.modify-password-input').clear().type(password);
    cy.get('.modify-password-confirm-input').clear().type(password);

    cy.get('.user-modify-button').click();

    const modifiedThumbnail = modifiedName[0];
    cy.get('.user-thumbnail').should('have.text', modifiedThumbnail);
  });

  it('로그인을 한 후 비밀번호를 수정할 수 있다.', () => {
    const randomEmail = createRandomEmail();
    const name = '후이';
    const password = 'test123!';

    cy.signup(randomEmail, name, password, password);

    cy.wait(1500);

    cy.get('.user-thumbnail').click();
    cy.get('.nav__user-button').click();

    const modifiedPassword = 'modifiedPassword123!';
    cy.get('.modify-password-input').type(modifiedPassword);
    cy.get('.modify-password-confirm-input').type(modifiedPassword);

    cy.get('.user-modify-button').click();

    cy.wait(1500);
    cy.logout();

    cy.login(randomEmail, modifiedPassword);
  });

  it('비밀번호를 수정할 때 입력한 비밀번호와 비밀번호 확인이 다르면 에러 메시지를 보여준다.', () => {
    const randomEmail = createRandomEmail();
    const name = '후이';
    const password = 'test123!';

    cy.signup(randomEmail, name, password, password);

    cy.wait(1500);

    cy.get('.user-thumbnail').click();
    cy.get('.nav__user-button').click();

    const modifiedPassword = 'modifiedPassword123!';
    const wrongModifiedPasswordConfrim = 'modifiedPassword123@';
    cy.get('.modify-password-input').type(modifiedPassword);
    cy.get('.modify-password-confirm-input').type(wrongModifiedPasswordConfrim);

    cy.get('.user-modify-button').click();

    cy.checkErrorMessage(ERROR_MESSAGE.NOT_CONFIRMED_PASSWORD);
  });
});
