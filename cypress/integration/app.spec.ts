import { baseUrl } from '../../src/apis';
import { getUser } from '../../src/ts/utils';

describe('관리자 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        url: `${baseUrl}/600/users/*`,
      },
      { fixture: 'user.json' },
    );
    cy.clearCookies();

    cy.setCookie('user_id', '1');
    cy.setCookie('access_token', 'abcd1234');

    cy.visit('/');
  });

  it('관리자에게는 nav를 보여준다.', () => {
    cy.get('.nav').should('be.visible');
  });

  it('관리자에게는 썸네일을 보여준다.', async () => {
    const user = await getUser();

    if (typeof user === 'string') return;

    cy.get('.user-thumbnail')
      .should('be.visible')
      .and('have.text', user.name[0]);
  });

  it('관리자에게는 상품 관리탭이 보여진다.', () => {
    cy.get('.nav > .active').should('contain', '상품 관리');
  });

  it('관리자는 로그아웃할 수 있다.', () => {
    cy.get('.logined-user-tab').click();
    cy.get('.logout-button').click();

    cy.get('.login-button').should('be.visible');
  });
});

describe('비회원 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('비회원에게는 nav를 보여주지 않는다.', () => {
    cy.get('.nav').should('not.be.visible');
  });

  it('비회원에게는 로그인 버튼이 보여진다.', () => {
    cy.get('.login-button').should('be.visible');
  });

  it('비회원에게는 상품 구매탭이 보여진다.', () => {
    cy.get('.money-charge').should('be.visible');
  });
});
