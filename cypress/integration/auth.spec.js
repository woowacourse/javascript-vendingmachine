const baseUrl = 'http://localhost:9000';

describe('사용자 인증 테스트', () => {
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  function createRandomUserData() {
    return { email: `${Date.now()}@test.com`, name: 'test', password: '1234' };
  }

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
    cy.get('#login-link-button').click();
    cy.get('#register-page-link').click();

    const userData = createRandomUserData();
    cy.registerNewUser(userData);

    cy.get('#manage-tab-title').should('exist');
  });

  it('회원가입을 마치면 로그인 버튼이 사라져야 한다.', () => {
    cy.get('#login-link-button').click();
    cy.get('#register-page-link').click();

    const userData = createRandomUserData();
    cy.registerNewUser(userData);

    cy.get('#login-link-button').should('not.exist');
  });

  it('회원가입을 마치면 탭 메뉴가 표시된다.', () => {
    cy.get('#login-link-button').click();
    cy.get('#register-page-link').click();

    const userData = createRandomUserData();
    cy.registerNewUser(userData);

    cy.get('#tab-menu-navigation').should('exist');
  });
});
