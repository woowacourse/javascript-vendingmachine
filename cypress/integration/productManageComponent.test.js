import { setCookie } from '../../src/ts/cookie/cookie';

describe('상품 관리 탭 E2E 테스트', () => {
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

  it('상품관리 탭에서 상품명, 상품 가격, 상품 수량을 입력하고 추가 버튼을 누르면 상품이 정상적으로 등록된 상품을 확인할 수 있다.', () => {
    cy.get('.nav__product-button').click();

    cy.get('.product-info-form__product-input').type('콜라');
    cy.get('.product-info-form__price-input').type('1200');
    cy.get('.product-info-form__quantity-input').type('12');
    cy.get('.product-info-form__add-button').click();

    cy.get('.product-table__product-name').should('have.text', '콜라');
    cy.get('.product-table__product-price').should('have.text', '1200');
    cy.get('.product-table__product-quantity').should('have.text', '12');
  });

  it('상품이 정상적으로 등록된 후 상품명, 상품 가격, 상품 수량을 입력할 수 있는 칸이 공백으로 초기화 되고, 상품이 정상적으로 등록되었다는 메시지를 스넥바를 통해 확인할 수 있다.', () => {
    cy.get('.product-info-form__product-input').should('have.text', '');
    cy.get('.product-info-form__price-input').should('have.text', '');
    cy.get('.product-info-form__quantity-input').should('have.text', '');

    cy.get('.snack-bar-container__message').should(
      'have.text',
      '상품이 정상적으로 등록되었습니다. 등록된 상품을 확인해주세요.'
    );
  });

  it('등록된 상품의 수정하기 버튼을 클릭 후 해당하는 상품을 수정 후 확인 버튼을 누르면 정상적으로 수정된 상품을 확인할 수 있다.', () => {
    cy.wait(3000);

    cy.get('.product-table__edit-button').click();

    cy.get('.product-table__product-name-input--edit').clear().type('사이다');
    cy.get('.product-table__product-price-input--edit').clear().type('2000');
    cy.get('.product-table__product-quantity-input--edit').clear().type('20');
    cy.get('.product-table__confirm-button').click();

    cy.get('.product-table__product-name').should('have.text', '사이다');
    cy.get('.product-table__product-price').should('have.text', '2000');
    cy.get('.product-table__product-quantity').should('have.text', '20');
  });

  it('상품이 정상적으로 수정되었다는 메시지를 스넥바를 통해 확인할 수 있다.', () => {
    cy.get('.snack-bar-container__message').should(
      'have.text',
      '상품이 정상적으로 수정되었습니다. 수정된 상품을 확인해주세요.'
    );
  });

  it('등록된 상품의 삭제하기 버튼을 클릭하면 해당하는 상품이 제거된 것을 확인할 수 있다.', () => {
    cy.wait(3000);

    cy.get('.product-table__delete-button').click();

    cy.get('.product-table__product-name').should('be.not.exist');
    cy.get('.product-table__product-price').should('be.not.exist');
    cy.get('.product-table__product-quantity').should('be.not.exist');
  });

  it('상품이 정상적으로 삭제되었다는 메시지를 스넥바를 통해 확인할 수 있다.', () => {
    cy.get('.snack-bar-container__message').should(
      'have.text',
      '상품이 정상적으로 삭제되었습니다.'
    );
  });
});
