import SUCCESS_MESSAGE from '../../src/ts/constants/successMessage';
import { SET_EDIT_PRODUCT, SET_PRODUCT } from './testConstant';
import { SNACK_BAR_DELAY_TIME } from '../../src/ts/constants/snackBar';

describe('상품 관리 탭 E2E 테스트', () => {
  before(() => {
    cy.visit('/');
    cy.setSignIn();
  });

  it('상품관리 탭에서 상품명, 상품 가격, 상품 수량을 입력하고 추가 버튼을 누르면 상품이 정상적으로 등록된 상품을 확인할 수 있다.', () => {
    cy.get('.nav__product-button').click();

    cy.setProduct();
    cy.get('.product-info-form__add-button').click();

    cy.get('.product-table__product-name').should(
      'have.text',
      SET_PRODUCT.PRODUCT_NAME
    );
    cy.get('.product-table__product-price').should(
      'have.text',
      SET_PRODUCT.PRODUCT_PRICE
    );
    cy.get('.product-table__product-quantity').should(
      'have.text',
      SET_PRODUCT.PRODUCT_QUANTITY
    );
  });

  it('상품이 정상적으로 등록된 후 상품명, 상품 가격, 상품 수량을 입력할 수 있는 칸이 공백으로 초기화 되고, 상품이 정상적으로 등록되었다는 메시지를 스넥바를 통해 확인할 수 있다.', () => {
    cy.get('.product-info-form__product-input').should('have.text', '');
    cy.get('.product-info-form__price-input').should('have.text', '');
    cy.get('.product-info-form__quantity-input').should('have.text', '');

    cy.get('.snack-bar-container__message').should(
      'have.text',
      SUCCESS_MESSAGE.ADDED_PRODUCT
    );
  });

  it('등록된 상품의 수정하기 버튼을 클릭 후 해당하는 상품을 수정 후 확인 버튼을 누르면 정상적으로 수정된 상품을 확인할 수 있다.', () => {
    cy.wait(SNACK_BAR_DELAY_TIME);

    cy.get('.product-table__edit-button').click();

    cy.setEditProduct();
    cy.get('.product-table__confirm-button').click();

    cy.get('.product-table__product-name').should(
      'have.text',
      SET_EDIT_PRODUCT.PRODUCT_NAME
    );
    cy.get('.product-table__product-price').should(
      'have.text',
      SET_EDIT_PRODUCT.PRODUCT_PRICE
    );
    cy.get('.product-table__product-quantity').should(
      'have.text',
      SET_EDIT_PRODUCT.PRODUCT_QUANTITY
    );
  });

  it('상품이 정상적으로 수정되었다는 메시지를 스넥바를 통해 확인할 수 있다.', () => {
    cy.get('.snack-bar-container__message').should(
      'have.text',
      SUCCESS_MESSAGE.EDITED_PRODUCT
    );
  });

  it('등록된 상품의 삭제하기 버튼을 클릭하면 해당하는 상품이 제거된 것을 확인할 수 있다.', () => {
    cy.wait(SNACK_BAR_DELAY_TIME);

    cy.get('.product-table__delete-button').click();

    cy.get('.product-table__product-name').should('be.not.exist');
    cy.get('.product-table__product-price').should('be.not.exist');
    cy.get('.product-table__product-quantity').should('be.not.exist');
  });

  it('상품이 정상적으로 삭제되었다는 메시지를 스넥바를 통해 확인할 수 있다.', () => {
    cy.get('.snack-bar-container__message').should(
      'have.text',
      SUCCESS_MESSAGE.DELETED_PRODUCT
    );
  });
});
