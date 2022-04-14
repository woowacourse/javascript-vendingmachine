import { baseUrl } from '../../src/apis';
import { coinType, PRICE_RULE } from '../../src/ts/constants';
import { getUser, insertNBSP } from '../../src/ts/utils';

const defaultProduct = { name: '콜라', price: 1000, quantity: 10 };

function addProduct(product) {
  cy.get('.product-addition__input[name=name]').type(product.name);
  cy.get('.product-addition__input[name=price]').type(`${product.price}`);
  cy.get('.product-addition__input[name=quantity]').type(
    `${product.quantity}{enter}`,
  );
}

function sumAllCoins(coinGrid) {
  let sum: number = 0;
  for (let i = 0; i < coinType.length * 2; i += 2) {
    const type = Number(coinGrid[i + 2].innerText.slice(0, -1));
    const count = Number(coinGrid[i + 3].innerText.slice(0, -1));
    sum += type * count;
  }
  return sum;
}

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

  describe('관리자 권한이 있는 UI 테스트', () => {
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
      cy.get('.logined-user-tab').select('로그아웃');

      cy.get('.login-button').should('be.visible');
    });
  });

  describe('상품관리 탭 테스트', () => {
    beforeEach(() => {
      addProduct(defaultProduct);
    });

    it('상품을 추가하면, 상품현황에 추가진다.', () => {
      cy.get(
        `.product-inventory__input[data-product-name=${insertNBSP(
          defaultProduct.name,
        )}]`,
      ).as('product');

      cy.get('@product').eq(0).should('have.value', defaultProduct.name);
      cy.get('@product').eq(1).should('have.value', defaultProduct.price);
      cy.get('@product').eq(2).should('have.value', defaultProduct.quantity);
    });

    it('상품을 삭제하면, 상품현황에 제거된다.', () => {
      const stub = cy.stub();

      stub.onFirstCall().returns(true);

      cy.on('window:confirm', stub);

      cy.get('.product-inventory__delete-button').click();

      cy.get(
        `.product-inventory__input[data-product-name=${insertNBSP(
          defaultProduct.name,
        )}]`,
      ).should('have.length', 0);
    });

    it('상품을 수정하면, 상품현황이 수정된다.', () => {
      const editedProduct = {
        ...defaultProduct,
        name: `${defaultProduct.name}사이다`,
        price: defaultProduct.price + PRICE_RULE.UNIT,
        quantity: defaultProduct.quantity + 1,
      };

      cy.get(
        `.product-inventory__input[data-product-name=${insertNBSP(
          defaultProduct.name,
        )}]`,
      ).as('product');

      cy.get('.product-inventory__edit-button').click();

      cy.get('@product').eq(0).clear().type(editedProduct.name);
      cy.get('@product').eq(1).clear().type(`${editedProduct.price}`);
      cy.get('@product').eq(2).clear().type(`${editedProduct.quantity}`);

      cy.get('@product').eq(0).should('have.value', editedProduct.name);
      cy.get('@product').eq(1).should('have.value', editedProduct.price);
      cy.get('@product').eq(2).should('have.value', editedProduct.quantity);
    });
  });

  describe('잔돈 충천 탭 테스트', () => {
    const cash = 10000;

    beforeEach(() => {
      cy.get('.nav__button[name=coin-charge]').click();
      cy.get('.coin-charge__input').type(`${cash}{enter}`);
    });

    it('잔돈을 충천하면, 현재 보유금액이 충전금액만큼 증가한다.', () => {
      cy.get('.coin-charge__total-cash').should('have.text', cash);
    });

    it('잔돈을 충전하면, 충전금액만큼 동전이 증가한다.', () => {
      cy.get('.coin-holdings__item').as('coinGrid');

      cy.get('@coinGrid').then(coinGrid => {
        expect(sumAllCoins(coinGrid)).to.equal(cash);
      });
    });
  });

  describe('상품 구매 탭 테스트', () => {
    const money = 10000;

    beforeEach(() => {
      addProduct(defaultProduct);
      cy.get('.nav__button[name=product-purchase]').click();
      cy.get('.money-charge__input').type(`${money}{enter}`);
    });

    it('금액을 투입하면, 투입한 금액이 증가한다.', () => {
      cy.get('.money-charge__total-money').should('have.text', money);
    });

    it('상품을 구매하면, 상품 수량이 한 개 줄어든다.', () => {
      cy.get('.product-menu__button').click();
      cy.get('.item-quantity').should('have.text', defaultProduct.quantity - 1);
    });

    it('상품을 구매하고, 상품 수량이 0이면 구매 가능상품 현황에서 제거된다.', () => {
      Array(defaultProduct.quantity)
        .fill('')
        .forEach(() => cy.get('.product-menu__button').click());

      cy.get(
        `.product-menu-item[data-product-name=${insertNBSP(
          defaultProduct.name,
        )}`,
      ).should('have.length', 0);
    });
  });

  describe('잔돈 반환 테스트', () => {
    const money = 9000;

    beforeEach(() => {
      cy.get('.nav__button[name=coin-charge]').click();
      cy.get('.coin-charge__input').type(`${money}{enter}`);

      cy.get('.nav__button[name=product-purchase]').click();
    });

    it('잔돈이 충분할 때, 반환을 누르면, 투입 금액 모두 반환된다.', () => {
      cy.get('.money-charge__input').type(`${money}{enter}`);

      cy.get('.coin-return__button').click();

      cy.get('.coin-return__item').as('coinGrid');

      cy.get('@coinGrid').then(coinGrid => {
        expect(sumAllCoins(coinGrid)).to.equal(money);
      });
    });

    it('잔돈이 부족할 때, 반환을 누르면, 자판기 잔돈 만큼만 반환된다.', () => {
      const additionalMoney = 1000;

      cy.get('.money-charge__input').type(`${money + additionalMoney}{enter}`);

      cy.get('.coin-return__button').click();

      cy.get('.coin-return__item').as('coinGrid');

      cy.get('@coinGrid').then(coinGrid => {
        expect(sumAllCoins(coinGrid)).to.equal(money);
      });

      cy.get('.money-charge__total-money').should('have.text', additionalMoney);
    });
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
