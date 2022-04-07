describe('인가 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('로그인 전 인가 테스트', () => {
    it('로그인 전 상품 관리 주소를 들어가면 로그인 창으로 리다이렉트 된다.', () => {
      cy.visit('/#/manage');
      cy.get('h1').should('have.text', '로그인');
      cy.get('#snackbar').should('have.text', '로그인이 필요합니다.');
    });

    it('로그인 전 잔돈 충전 주소를 들어가면 로그인 창으로 리다이렉트 된다.', () => {
      cy.visit('/#/charge');
      cy.get('h1').should('have.text', '로그인');
      cy.get('#snackbar').should('have.text', '로그인이 필요합니다.');
    });

    it('로그인 전 회원정보 수정 주소를 들어가면 로그인 창으로 리다이렉트 된다.', () => {
      cy.visit('/#/myprofile');
      cy.get('h1').should('have.text', '로그인');
      cy.get('#snackbar').should('have.text', '로그인이 필요합니다.');
    });
  });

  describe('로그인 후 인가 테스트', () => {
    beforeEach(() => {
      const email = 'test123@naver.com';
      const password = 'Abc1234!';
      cy.login(email, password);
    });

    it('로그인 후 로그인 주소를 들어가면 상품 구매 창으로 리다이렉트 된다.', () => {
      cy.wait(1000);
      cy.visit('/#/login');
      cy.get('#snackbar').should('have.text', '이미 로그인한 상태입니다.');
      cy.get('#purchase-tab-menu').should('have.class', 'current');
    });

    it('로그인 후 회원가입 주소를 들어가면 상품 구매 창으로 리다이렉트 된다.', () => {
      cy.wait(1000);
      cy.visit('/#/signup');
      cy.get('#snackbar').should('have.text', '이미 로그인한 상태입니다.');
      cy.get('#purchase-tab-menu').should('have.class', 'current');
    });
  });
});
