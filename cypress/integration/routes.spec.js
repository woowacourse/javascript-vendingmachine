import createRandomUserData from '../support/createRandomUserData';

const baseUrl = 'http://localhost:9000';

describe('회원/비회원 라우터 테스트', () => {
  const userOnlyRoutes = {
    '상품 관리 탭': '#/product',
    '잔돈 충전 탭': '#/charge',
    '사용자 정보 페이지': '#/user-info',
  };

  const nonUserOnlyRoutes = {
    '로그인 페이지': '#/login',
    '회원가입 페이지': '#/register',
  };

  function testRouteAccess(routeName, routeUrl) {
    it(`${routeName}에 접속할 수 있다.`, () => {
      cy.visit(routeUrl);

      cy.get('.not-found-section').should('not.exist');
    });
  }

  function testRouteDeny(routeName, routeUrl) {
    it(`${routeName}에 접속할 수 없다.`, () => {
      cy.visit(routeUrl);

      cy.get('.not-found-section').should('exist');
    });
  }

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  describe('비회원 라우터 테스트', () => {
    describe('비회원은 비회원만 접속 가능한 주소에 접속할 수 있다.', () => {
      Object.entries(nonUserOnlyRoutes).forEach(([routeName, routeUrl]) => {
        testRouteAccess(routeName, routeUrl);
      });
    });

    describe('비회원은 회원만 접속 가능 주소에 접속할 수 없다.', () => {
      Object.entries(userOnlyRoutes).forEach(([routeName, routeUrl]) => {
        testRouteDeny(routeName, routeUrl);
      });
    });
  });

  describe('회원 라우터 테스트', () => {
    before(() => {
      cy.visit(baseUrl);
      const userData = createRandomUserData();
      cy.registerNewUser(userData);
    });
    beforeEach(() => {
      Cypress.Cookies.preserveOnce('accessToken');
    });

    describe('회원은 회원만 접속 가능한 주소에 접속할 수 있다.', () => {
      Object.entries(userOnlyRoutes).forEach(([routeName, routeUrl]) => {
        testRouteAccess(routeName, routeUrl);
      });
    });

    describe('회원은 비회원만 접속 가능 주소에 접속할 수 없다.', () => {
      Object.entries(nonUserOnlyRoutes).forEach(([routeName, routeUrl]) => {
        testRouteDeny(routeName, routeUrl);
      });
    });
  });
});
