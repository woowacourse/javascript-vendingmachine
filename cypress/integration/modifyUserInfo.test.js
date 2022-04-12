import { ERROR_MESSAGE } from '../../src/ts/constants';

describe('로그인 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
    cy.login();
  });

  it('로그인을 한 후 유저 정보를 수정할 수 있다.', () => {
    cy.wait(1500);

    cy.get('.user-thumbnail').click();
    cy.get('.nav__user-button').click();
  });
});
