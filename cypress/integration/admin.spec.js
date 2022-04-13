import { SELECTOR } from '../../src/js/constants/viewConstants';
import Storage from '../../src/js/api/storage';

describe('관리자 상품, 잔돈 관리', () => {
  before(() => {
    cy.interceptAdminRequest();
    cy.visit('http://localhost:9000');

    Storage.setAccessToken('askfdin123412njwefn931nsndnf98');
    Storage.setUserData({
      email: 'rkadndud06@naver.com',
      password: 'asdflkmsadfk123anf08dsfny',
      name: '밧드',
      id: 1,
    });

    cy.get(SELECTOR.CLASS.CHARGE_MONEY_INPUT);

    cy.get(SELECTOR.ID.ITEM_MANAGE_TAB).click();
  });

  it('상품관리 탭에서 상품을 추가할 수 있다.', () => {
    const name = '환타';
    const price = 1000;
    const quantity = 8;

    cy.get(`${SELECTOR.CLASS.ITEM_TABLE} tr`).then(trList => {
      const targetIndex = trList.length - 1;

      cy.get(SELECTOR.ID.ADD_ITEM_NAME).type(name);
      cy.get(SELECTOR.ID.ADD_ITEM_PRICE).type(price);
      cy.get(SELECTOR.ID.ADD_ITEM_QUANTITY).type(`${quantity}{enter}`);

      cy.get(`.${SELECTOR.CLASS_STRING.TABLE_ITEM_NAME}`).eq(targetIndex).contains(name);
      cy.get(`.${SELECTOR.CLASS_STRING.TABLE_ITEM_PRICE}`).eq(targetIndex).contains(price);
      cy.get(`.${SELECTOR.CLASS_STRING.TABLE_ITEM_QUANTITY}`).eq(targetIndex).contains(quantity);
    });
  });

  it('상품관리 탭에서 상품을 수정할 수 있다.', () => {
    const editedName = '오란씨';
    const editedPrice = 100;
    const editedQuantity = 1;

    cy.get(SELECTOR.CLASS.ITEM_TABLE_CHANGE_BUTTON).eq(0).click();

    cy.get(`.${SELECTOR.CLASS_STRING.TABLE_ITEM_INPUT_NAME}`).eq(0).clear().type(editedName);
    cy.get(`.${SELECTOR.CLASS_STRING.TABLE_ITEM_INPUT_PRICE}`).eq(0).clear().type(editedPrice);
    cy.get(`.${SELECTOR.CLASS_STRING.TABLE_ITEM_INPUT_QUANTITY}`)
      .eq(0)
      .clear()
      .type(editedQuantity);
    cy.get(SELECTOR.CLASS.ITEM_TABLE_CONFIRM_BUTTON).click();

    cy.get(`.${SELECTOR.CLASS_STRING.TABLE_ITEM_NAME}`).eq(0).contains(editedName);
    cy.get(`.${SELECTOR.CLASS_STRING.TABLE_ITEM_PRICE}`).eq(0).contains(editedPrice);
    cy.get(`.${SELECTOR.CLASS_STRING.TABLE_ITEM_QUANTITY}`).eq(0).contains(editedQuantity);
  });

  it('상품관리 탭에서 상품을 삭제할 수 있다.', () => {
    cy.get(`${SELECTOR.CLASS.ITEM_TABLE} tr`).then(trList => {
      const trCount = trList.length;

      cy.get(`.${SELECTOR.CLASS_STRING.ITEM_TABLE_DELETE_BUTTON}`).eq(1).click();

      cy.get(`${SELECTOR.CLASS.ITEM_TABLE} tr`).should('have.length', trCount - 1);
    });
  });

  it('잔돈충전 탭에서 잔돈을 추가할 수 있다.', () => {
    const inputMoney = 1000;

    cy.get(SELECTOR.ID.MONEY_CHARGE_TAB).click();

    cy.get(SELECTOR.CLASS.CHARGE_MONEY_INPUT).type(`${inputMoney}{enter}`);
    cy.get(SELECTOR.ID.CURRENT_CHARGE_MONEY).contains(inputMoney);
  });
});
