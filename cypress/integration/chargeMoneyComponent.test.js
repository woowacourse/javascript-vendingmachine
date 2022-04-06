import { setCookie } from '../../src/ts/cookie/cookie';

describe('동전 충전 탭 E2E 테스트', () => {
  before(() => {
    setCookie(
      'user',
      JSON.stringify({
        id: 1,
        name: '꼬재',
        accessToken:
          '%22%3A%22eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZGZAZ21haWwuY29tIiwiaWF0IjoxNjQ5MjIyODExLCJleHAiOjE2NDkyMjY0MTEsInN1YiI6IjgifQ.4Gdm73HKwY3C2Mqi9nl8GrxLM2pfrb_LStYq3pXXnzM%22%7D',
      }),
      {
        'max-age': 3600,
      }
    );
    cy.visit('/');
  });

  it('사용자는 상품 구입을 위해 투입할 금액을 입력하고 투입 버튼을 클릭하면 해당하는 금액이 투입한 금액에 표시된다.', () => {
    cy.get('.nav__charge-button').click();
    cy.get('.charge-form-section__charge-money-input').type(5000);
    cy.get('.charge-form-section__button').click();

    cy.get('.charge-form-section__total-charge-money').should(
      'have.text',
      5000
    );
  });

  it('정상적으로 금액이 투입되었다는 메시지를 스넥바를 통해 확인할 수 있다.', () => {
    cy.get('.coin-quantity').then((elements) => {
      const [coinQuantity500, coinQuantity100, coinQuantity50, coinQuantity10] =
        Array.from(elements, (element) => element.textContent);

      const sumCoins =
        Number(coinQuantity500) * 500 +
        Number(coinQuantity100) * 100 +
        Number(coinQuantity50) * 50 +
        Number(coinQuantity10) * 10;

      cy.get('.snack-bar-container__message').should(
        'have.text',
        `${sumCoins}원이 충전 되었습니다. 충전된 잔돈을 확인해주세요.`
      );
    });
  });
});
