describe('로그인 사용자 e2e 테스트', () => {
  let productName = '코카콜라';
  let productPrice = 2000;
  let productQuantity = 10;
  let balance = 10_000;
  let purchaseMoney = 10_000;

  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  context('로그인 사용자, 상품 관리 탭과 상품 구매 탭 연동 테스트', () => {
    it('상품 관리 탭을 클릭했을때, 추가 상품 입력 폼과 상품현황이 보여야한다.', () => {
      cy.get('#product-manage-nav-button').click();

      cy.get('.balance-charge-container').should('not.be.visible');
      cy.get('.product-purchase-container').should('not.be.visible');

      cy.get('.product-manage-container').should('be.visible');
      cy.get('#product-information-input-form').should('be.visible');
      cy.get('.product-manage-container .table-container').should('be.visible');
    });

    it('상품명, 가격, 수량을 입력하고 추가 버튼을 클릭했을때, 상품 관리 탭과 상품 구매 탭에서 추가된 상품이 보여야한다', () => {
      cy.get('#product-name-input').type(productName);
      cy.get('#product-price-input').type(productPrice);
      cy.get('#product-quantity-input').type(productQuantity);
      cy.get('#product-information-submit-btn').click();

      cy.get(`#product-table #${productName}`).as('addedProduct');
      cy.get('@addedProduct').find('.product-name span').should('have.text', productName);
      cy.get('@addedProduct').find('.product-price span').should('have.text', productPrice);
      cy.get('@addedProduct').find('.product-quantity span').should('have.text', productQuantity);

      cy.get('#product-purchase-nav-button').click();

      cy.get(`#purchasable-product-table #${productName}`).as('addedProduct');
      cy.get('@addedProduct').find('.product-name span').should('have.text', productName);
      cy.get('@addedProduct').find('.product-price span').should('have.text', productPrice);
      cy.get('@addedProduct').find('.product-quantity span').should('have.text', productQuantity);
    });

    it('상품 구매 탭에서 상품을 구매할 금액을 입력하고 투입 버튼을 클릭했을때, 투입한 금액이 해당 금액만큼 증가해야한다', () => {
      cy.get('#purchase-money-input').type(purchaseMoney);
      cy.get('#purchase-money-submit-btn').click();

      cy.get('#purchase-money').should('have.text', purchaseMoney);
    });

    it('상품 구매 탭에서 상품 구매버튼을 클릭했을때, 상품의 수량이 감소하고 사용자가 투입한 금액이 상품 가격만큼 감소해야하고, 상품 관리 탭에서 해당 상품의 수량이 감소해야한다.', () => {
      cy.get(`#purchasable-product-table #${productName}`).as('firstProduct');
      cy.get('@firstProduct').find('.purchase-button').click();

      productQuantity -= 1;

      cy.get('@firstProduct').find('.product-quantity span').should('have.text', productQuantity);

      purchaseMoney -= productPrice;
      cy.get('#product-purchase-nav-button').click();

      cy.get('#purchase-money').should('have.text', purchaseMoney);
    });

    it('상품 관리 탭에서 수정 버튼을 클릭했을때, 현재 상품의 상품명, 가격, 수량이 적혀진 입력창과 확인 버튼이 보여야하고 수정 버튼과 삭제 버튼이 보이지 않아야한다.', () => {
      cy.get('#product-manage-nav-button').click();

      cy.get(`#product-table #${productName}`).as('firstProduct');
      cy.get('@firstProduct').find('.edit-button').click();

      cy.get('@firstProduct').find('.product-name input').should('have.value', productName);
      cy.get('@firstProduct').find('.product-price input').should('have.value', productPrice);
      cy.get('@firstProduct').find('.product-quantity input').should('have.value', productQuantity);

      cy.get('@firstProduct').find('.edit-button').should('not.be.visible');
      cy.get('@firstProduct').find('.delete-button').should('not.be.visible');
    });

    it('정보를 수정하고 확인 버튼을 클릭했을때, 수정된 상품명, 가격, 수량과 수정 버튼, 삭제 버튼이 보여야하고 확인 버튼이 보이지 않아야한다.', () => {
      cy.get(`#product-table #${productName}`).as('firstProduct');

      productName = '코카콜라제로';

      cy.get('@firstProduct').find('.product-name input').clear().type(`${productName}`);
      cy.get('@firstProduct').find('.confirm-button').click();

      cy.get(`#product-table #${productName}`).as('editedProduct');

      cy.get('@editedProduct').find('.product-name span').should('have.text', productName);
      cy.get('@editedProduct').find('.product-price span').should('have.text', productPrice);
      cy.get('@editedProduct').find('.product-quantity span').should('have.text', productQuantity);
    });
  });

  context('로그인 사용자, 잔돈 충전 탭과 상품 구매 탭 연동 테스트', () => {
    it('잔돈 충전 탭을 클릭했을때, 잔돈 충전 폼과 자판기가 보유한 동전 목록이 보여야한다.', () => {
      cy.get('#charge-balance-nav-button').click();

      cy.get('#charge-balance-input-form').should('be.visible');
      cy.get('#coin-vault-table').should('be.visible');
    });

    it('잔돈 충전 금액을 입력하고 충전 버튼을 클릭하면 현재 보유 금액에 충전된 금액이 보여야한다.', () => {
      cy.get('#charge-balance-input').type(balance);
      cy.get('#charge-balance-submit-btn').click();
      cy.get('#current-balance').should('have.text', balance);
    });

    it('상품 구매탭에서 상품을 구매하고 반환 버튼을 클릭했을때, 남은 금액만큼 투입 금액과 잔돈 충전 탭의 보유한 금액이 감소해야한다.', () => {
      cy.get('#product-purchase-nav-button').click();
      cy.get('#purchasable-product-table');

      cy.get(`#purchasable-product-table #${productName}`).as('firstProduct');
      cy.get('@firstProduct').find('.purchase-button').click();

      const remainder = purchaseMoney - productPrice;
      cy.get('#purchase-money').should('have.text', remainder);

      cy.get('.return-button').click();

      cy.get('#charge-balance-nav-button').click();
      cy.get('#current-balance').should('have.text', balance - remainder);
    });
  });
});

describe('비로그인 사용자 e2e 테스트', () => {
  // 이메일 무작위 생성
  const randomString = (Math.random() + 1).toString(36).substring(7);
  const email = `${randomString}@naver.com`;

  before(() => {
    cy.logout();
  });

  context('비로그인 사용자, 웹사이트 접속 후 화면 테스트', () => {
    it('상품 구매탭이 보여야한다.', () => {
      cy.get('.product-purchase-container').should('be.visible');
    });

    it('로그인 버튼이 보야아한다.', () => {
      cy.get('#login-button').should('be.visible');
    });
  });

  context('비로그인 사용자, 회원가입, 로그아웃, 로그인 테스트', () => {
    it('로그인 버튼을 클릭했을때, 로그인 폼과 회원가입 링크가 보여야한다.', () => {
      cy.get('#login-button').click();

      cy.get('#login-form').should('be.visible');
      cy.get('.signup-link').should('be.visible');
    });

    it('회원가입 버튼을 클릭했을때, 회원가입 폼이 보여야한다.', () => {
      cy.get('.signup-link').click();

      cy.get('#login-form').should('not.exist');
      cy.get('#signup-form').should('be.visible');
    });

    it('회원가입 폼에 이메일, 이름, 비밀번호, 비밀번호 확인 정보를 입력하고 확인버튼을 클릭했을때, 3개의 탭 메뉴, 상품구매, 유저 썸네일 버튼이 보여야한다.', () => {
      cy.get('#email').type(email);
      cy.get('#name').type('앨버');
      cy.get('#password').type('abcd1234!');
      cy.get('#password-confirmation').type('abcd1234!');
      cy.get('#signup-form .submit-button').click();

      cy.get('.thumbnail').should('be.visible');
      cy.get('#product-manage-nav-button').should('be.visible');
      cy.get('#charge-balance-nav-button').should('be.visible');
      cy.get('#product-purchase-nav-button').should('be.visible');
      cy.get('.product-purchase-container').should('be.visible');
    });

    it('유저 썸네일 버튼을 클릭했을때, 로그아웃 버튼과 회원 정보 수정 버튼이 보여야한다.', () => {
      cy.get('.thumbnail').click();

      cy.get('.select-container').should('be.visible');
      cy.get('.edit-user-info-button').should('be.visible');
      cy.get('.logout-button').should('be.visible');
    });

    it('로그아웃 버튼을 클릭했을때, 상품 구매와 로그인 버튼만 볼 수 있어야한다', () => {
      cy.get('.logout-button').click();

      cy.get('.thumbnail .name').should('not.be.visible');
      cy.get('nav').should('not.be.visible');

      cy.get('.product-purchase-container').should('be.visible');
      cy.get('#login-button').should('be.visible');
    });

    it('로그인 폼에 이메일, 비밀번호를 입력하고 확인 버튼을 클릭했을때, 3개의 탭 메뉴, 상품구매, 유저 썸네일 버튼이 보여야한다.', () => {
      cy.get('#login-button').click();

      cy.get('#login-form #email').type(email);
      cy.get('#login-form #password').type('abcd1234!');
      cy.get('#login-form .submit-button').click();

      cy.get('.thumbnail').should('be.visible');
      cy.get('#product-manage-nav-button').should('be.visible');
      cy.get('#charge-balance-nav-button').should('be.visible');
      cy.get('#product-purchase-nav-button').should('be.visible');
      cy.get('.product-purchase-container').should('be.visible');
    });
  });

  context('비로그인 사용자, 상품 구매 테스트', () => {
    before(() => {
      cy.logout();
    });

    it('상품을 구매할 금액을 입력하고 투입 버튼을 클릭했을때, 투입한 금액이 해당 금액만큼 증가해야한다', () => {
      const purchaseMoney = 2000;

      cy.get('#purchase-money-input').type(purchaseMoney);
      cy.get('#purchase-money-submit-btn').click();

      cy.get('#purchase-money').should('have.text', purchaseMoney);
    });

    it('상품의 구매버튼을 클릭했을때, 상품의 수량이 감소하고 투입한 금액이 상품 가격만큼 감소해야한다', () => {
      cy.get('#purchasable-product-table .product-table-body')
        .find('tr')
        .first()
        .as('firstPurchasableProduct');

      cy.get('@firstPurchasableProduct').find('.purchase-button').click();
      cy.get('@firstPurchasableProduct').find('.product-quantity').should('have.text', 7);

      cy.get('#purchase-money').should('have.text', 0);
    });
  });
});
