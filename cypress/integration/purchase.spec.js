import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../src/ts/constants.ts';

describe('금액 투입 테스트', () => {
  const baseUrl = '/index.html';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('사용자는 규칙에 적합하지 않은 금액(1만원 초과)을 투입할 수 없다', () => {
    const money = '10010';
    cy.get('#insert-money-input').type(money);
    cy.get('#insert-button').click();

    cy.get('#current-inserted-money').then(($span) => {
      const insertedMoney = $span.text();
      expect(insertedMoney).equal('0');
    });
  });

  it('사용자는 규칙에 적합하지 않은 금액(10의 배수 아님)을 투입할 수 없다', () => {
    const money = '123';
    cy.get('#insert-money-input').type(money);
    cy.get('#insert-button').click();

    cy.get('#current-inserted-money').then(($span) => {
      const insertedMoney = $span.text();
      expect(insertedMoney).equal('0');
    });
  });

  it('사용자는 규칙에 적합하지 않은 금액(10원 미만)을 투입할 수 없다', () => {
    const money = '9';
    cy.get('#insert-money-input').type(money);
    cy.get('#insert-button').click();

    cy.get('#current-inserted-money').then(($span) => {
      const insertedMoney = $span.text();
      expect(insertedMoney).equal('0');
    });
  });

  it('사용자는 규칙(10의 배수, 누적 10,000원 이하)에 적합한 금액을 투입할 수 있다', () => {
    const money = '10000';
    cy.get('#insert-money-input').type(money);
    cy.get('#insert-button').click();

    cy.get('toast-modal').invoke('attr', 'message').should('eq', SUCCESS_MESSAGE.MONEY_INSERTED);
    cy.get('#current-inserted-money').then(($span) => {
      const insertedMoney = $span.text();
      expect(insertedMoney).equal(money);
    });
  });
});

describe('상품 구매 테스트', () => {
  const baseUrl = '/index.html';
  const productsObj = [
    {
      _name: '사이다',
      _price: 1000,
      _quantity: 10,
    },
  ];

  beforeEach(() => {
    localStorage.setItem('products', JSON.stringify(productsObj));
    cy.visit(baseUrl);
  });

  it('해당 상품을 구매하기에 충분한 금액을 투입한 사용자는 상품을 구매할 수 있다.', () => {
    cy.insertMoney('1000');

    cy.get('.purchase-button').click();

    cy.get('.product-row-quantity').last().as('quantity');
    cy.get('@quantity').should('have.text', productsObj[0]._quantity - 1);
    cy.checkToastMessage(SUCCESS_MESSAGE.PURCHASE);
  });

  it('해당 상품을 구매하기에 충분한 금액을 투입하지 않은 사용자는 상품을 구매할 수 없다.', () => {
    cy.insertMoney('990');

    cy.get('.purchase-button').click();

    cy.get('.product-row-quantity').last().as('quantity');
    cy.get('@quantity').should('have.text', productsObj[0]._quantity);

    cy.checkToastMessage(ERROR_MESSAGE.INSUFFICIENT_MONEY);
  });
});

describe('잔돈 반환 테스트', () => {
  beforeEach(() => {
    // alias
    cy.get('#purchase-tab-coin-500').last().as('coin500');
    cy.get('#purchase-tab-coin-100').last().as('coin100');
    cy.get('#purchase-tab-coin-50').last().as('coin50');
    cy.get('#purchase-tab-coin-10').last().as('coin10');
  });
  it('보유한 동전이 모든 잔돈을 반환할 만큼 충분한 경우, 잔돈 반환 버튼을 누르면 최적 개수의 잔돈이 반환된다', () => {
    const money = [
      {
        _value: 500,
        _count: 100,
      },
      {
        _value: 100,
        _count: 100,
      },
      {
        _value: 50,
        _count: 100,
      },
      {
        _value: 10,
        _count: 100,
      },
    ];
    cy.rechargeMoney(money);
    cy.insertMoney('990');

    cy.get('#refund-button').click();

    cy.get('@coin500').should('have.text', '1');
    cy.get('@coin100').should('have.text', '4');
    cy.get('@coin50').should('have.text', '1');
    cy.get('@coin10').should('have.text', '4');
    cy.checkToastMessage(SUCCESS_MESSAGE.REFUND_COMPLETE);
  });

  it('보유한 동전이 모든 잔돈을 반환할 만큼 충분하지 않은 경우, 잔돈 반환 버튼을 누르면 최대로 반환 가능한 잔돈만이 반환되며 반환하지 못한 금액을 알려준다', () => {
    const money = [
      {
        _value: 500,
        _count: 1,
      },
      {
        _value: 100,
        _count: 4,
      },
      {
        _value: 50,
        _count: 1,
      },
      {
        _value: 10,
        _count: 1,
      },
    ];
    cy.rechargeMoney(money);
    cy.insertMoney('990');

    cy.get('#refund-button').click();

    cy.get('@coin500').should('have.text', '1');
    cy.get('@coin100').should('have.text', '4');
    cy.get('@coin50').should('have.text', '1');
    cy.get('@coin10').should('have.text', '1');
    cy.checkToastMessage('보유 중인 잔돈이 부족하여, 30원은 반환하지 못하였습니다.');
  });

  it('잔여 금액이 없는 경우 잔돈 반환 버튼을 누르면, 반환할 잔돈이 없음을 알린다.', () => {
    cy.get('#refund-button').click();

    cy.get('@coin500').should('have.text', '0');
    cy.get('@coin100').should('have.text', '0');
    cy.get('@coin50').should('have.text', '0');
    cy.get('@coin10').should('have.text', '0');
    cy.checkToastMessage(ERROR_MESSAGE.NOT_INSERTED_HOLDING_MONEY);
  });
});
