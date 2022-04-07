import { markUnit } from '../../src/utils';
import { ERROR_MESSAGE } from '../../src/constants';

const baseUrl = 'http://localhost:9000/javascript-vendingmachine/';

describe('자판기 사용자의 잔돈 충전', () => {
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('사용자는 금액을 투입하여 잔돈을 충전할 수 있다.', () => {
    const userInputMoney = 1000;

    cy.get('.user-amount-form__change-input').type(userInputMoney);
    cy.get('.user-amount-form__charge-button').click();

    cy.get('.user-amount').contains(markUnit(userInputMoney));
    cy.get('#snackbar').contains('성공적으로 금액을 투입했습니다.');
  });

  it('10원으로 나누어 떨어지지 않는 금액을 투입했을 경우 잔돈을 충전할 수 없다.', () => {
    const userInputMoney = 999;

    cy.get('.user-amount-form__change-input').type(userInputMoney);
    cy.get('.user-amount-form__charge-button').click();

    cy.get('#snackbar').contains(ERROR_MESSAGE.INCORRECT_UNIT_CHARGE_MONEY);
  });

  it('투입할 금액과 투입된 금액의 합이 10,000원을 초과한 경우 잔돈을 충전할 수 없다.', () => {
    const userInputMoney = 100000;

    cy.get('.user-amount-form__change-input').type(userInputMoney);
    cy.get('.user-amount-form__charge-button').click();

    cy.get('.user-amount-form__change-input')
      .invoke('prop', 'validationMessage')
      .should('equal', '값은 10000 이하여야 합니다.');
  });

  it('금액을 입력하지 않고 `투입하기`버튼을 눌렀을 경우 잔돈을 충전할 수 없다.', () => {
    cy.get('.user-amount-form__charge-button').click();

    cy.get('.user-amount-form__change-input')
      .invoke('prop', 'validationMessage')
      .should('equal', '이 입력란을 작성하세요.');
  });
});

describe('상품 구매', () => {
  beforeEach(() => {
    cy.visit(baseUrl);
    cy.get('.login-button').click();
    cy.get('#signup-href').click();

    const email = Math.random().toString(36).substring(2, 6) + '@gmail.com';
    const name = '관리자';
    const password = 'qwer1234';

    cy.get('.signup-form').children('input[name="email"]').type(email);
    cy.get('.signup-form').children('input[name="userName"]').type(name);
    cy.get('.signup-form').children('input[name="password"]').type(password);
    cy.get('.signup-form').children('input[name="passwordConfirm"]').type(password);
    cy.get('.signup-page__signup-button').click();

    cy.get('.login-button').click();
    cy.get('.login-form').children('input[name="email"]').type(email);
    cy.get('.login-form').children('input[name="password"]').type(password);
    cy.get('.login-page__login-button').click();

    cy.get('.nav__product-manage-tab').click();

    cy.get('.product-manage-form').children('fieldset').children('input[name="productName"]').type('콜라');
    cy.get('.product-manage-form').children('fieldset').children('input[name="price"]').type(1000);
    cy.get('.product-manage-form').children('fieldset').children('input[name="quantity"]').type(10);

    cy.get('.product-manage-form__add-button').click();
    cy.get('.nav__product-purchase-tab').click();
  });

  it('상품 가격에 알맞는 금액이 투입되면, 해당 상품을 구매할 수 있다.', () => {
    const userInputMoney = 1000;

    cy.get('.user-amount-form__change-input').type(userInputMoney);
    cy.get('.user-amount-form__charge-button').click();
    cy.get('.purchase_button').click();

    cy.get('#snackbar').contains('성공적으로 상품을 구매했습니다.');
  });

  it('투입된 금액이 상품 가격보다 적다면 사용자는 상품을 구매할 수 없다.', () => {
    const userInputMoney = 500;

    cy.get('.user-amount-form__change-input').type(userInputMoney);
    cy.get('.user-amount-form__charge-button').click();
    cy.get('.purchase_button').click();

    cy.get('#snackbar').contains('잔액이 부족합니다.');
  });
});

describe('회원 가입', () => {
  beforeEach(() => {
    cy.visit(baseUrl);
    cy.get('.login-button').click();
    cy.get('#signup-href').click();
  });

  it('관리자가 되고자 하는 유저는 회원 가입을 할 수 있다.', () => {
    const email = Math.random().toString(36).substring(2, 6) + '@gmail.com';
    const name = '관리자';
    const password = 'qwer1234';

    cy.get('.signup-form').children('input[name="email"]').type(email);
    cy.get('.signup-form').children('input[name="userName"]').type(name);
    cy.get('.signup-form').children('input[name="password"]').type(password);
    cy.get('.signup-form').children('input[name="passwordConfirm"]').type(password);
    cy.get('.signup-page__signup-button').click();

    cy.get('#snackbar').contains(`${name}님 회원가입을 축하합니다.`);
  });

  it('이미 DB에 존재하는 이메일이면 회원 가입을 할 수 없다.', () => {
    const id = Math.random().toString(36).substring(2, 6);
    const email = id + '@gmail.com';
    const name = '관리자';
    const password = 'qwer1234';

    cy.get('.signup-form').children('input[name="email"]').type(email);
    cy.get('.signup-form').children('input[name="userName"]').type(name);
    cy.get('.signup-form').children('input[name="password"]').type(password);
    cy.get('.signup-form').children('input[name="passwordConfirm"]').type(password);
    cy.get('.signup-page__signup-button').click();

    cy.get('.login-button').click();
    cy.get('#signup-href').click();

    cy.get('.signup-form').children('input[name="email"]').type(email);
    cy.get('.signup-form').children('input[name="userName"]').type(name);
    cy.get('.signup-form').children('input[name="password"]').type(password);
    cy.get('.signup-form').children('input[name="passwordConfirm"]').type(password);
    cy.get('.signup-page__signup-button').click();

    cy.get('#snackbar').contains('Email already exists');
  });

  it('이름이 2글자 미만이거나 6글자를 초과인 경우 회원 가입을 할 수 없다.', () => {
    const email = Math.random().toString(36).substring(2, 6) + '@gmail.com';
    const name = '관';
    const password = 'qwer1234';

    cy.get('.signup-form').children('input[name="email"]').type(email);
    cy.get('.signup-form').children('input[name="userName"]').type(name);
    cy.get('.signup-form').children('input[name="password"]').type(password);
    cy.get('.signup-form').children('input[name="passwordConfirm"]').type(password);
    cy.get('.signup-page__signup-button').click();

    cy.get('#snackbar').contains('이름은 2글자 이상, 6글자 이하로 입력해주세요.');
  });

  it('이름이 2글자 미만이거나 6글자를 초과인 경우 회원 가입을 할 수 없다.', () => {
    const email = Math.random().toString(36).substring(2, 6) + '@gmail.com';
    const name = '관리자';
    const password = 'qwer1234';
    const passwordComfirm = '1234qwer';

    cy.get('.signup-form').children('input[name="email"]').type(email);
    cy.get('.signup-form').children('input[name="userName"]').type(name);
    cy.get('.signup-form').children('input[name="password"]').type(password);
    cy.get('.signup-form').children('input[name="passwordConfirm"]').type(passwordComfirm);
    cy.get('.signup-page__signup-button').click();

    cy.get('#snackbar').contains('비밀번호와 비밀번호 확인란이 일치하지 않습니다.');
  });

  it('비밀번호가 숫자와 영문자 조합이 아니거나 8글자 이상, 20글자 이하가 아닐 경우 회원 가입 할 수 없다.', () => {
    const email = Math.random().toString(36).substring(2, 6) + '@gmail.com';
    const name = '관리자';
    const password = 'qwerty';

    cy.get('.signup-form').children('input[name="email"]').type(email);
    cy.get('.signup-form').children('input[name="userName"]').type(name);
    cy.get('.signup-form').children('input[name="password"]').type(password);
    cy.get('.signup-form').children('input[name="passwordConfirm"]').type(password);
    cy.get('.signup-page__signup-button').click();

    cy.get('#snackbar').contains('비밀번호는 숫자와 영문자 조합으로 8글자 이상, 20글자 이하를 입력해주세요.');
  });
});

describe('로그인', () => {
  let email;
  const name = '관리자';
  const password = 'qwer1234';

  beforeEach(() => {
    cy.visit(baseUrl);
    email = Math.random().toString(36).substring(2, 6) + '@gmail.com';

    cy.get('.login-button').click();
    cy.get('#signup-href').click();

    cy.get('.signup-form').children('input[name="email"]').type(email);
    cy.get('.signup-form').children('input[name="userName"]').type(name);
    cy.get('.signup-form').children('input[name="password"]').type(password);
    cy.get('.signup-form').children('input[name="passwordConfirm"]').type(password);
    cy.get('.signup-page__signup-button').click();

    cy.get('.login-button').click();
  });

  it('DB에 존재하는 계정이라면 로그인 할 수 있다.', () => {
    cy.get('.login-form').children('input[name="email"]').type(email);
    cy.get('.login-form').children('input[name="password"]').type(password);
    cy.get('.login-page__login-button').click();

    cy.get('#snackbar').contains(`안녕하세요 ${name}님 :)`);
    cy.get('.user-name__menu-button').contains(name.substring(0, 1));
  });

  it('존재하지 않은 계정인 경우 로그인을 할 수 없다.', () => {
    const email = Math.random().toString(36).substring(2, 6) + '@gmail.com';

    cy.get('.login-form').children('input[name="email"]').type(email);
    cy.get('.login-form').children('input[name="password"]').type(password);
    cy.get('.login-page__login-button').click();

    cy.get('#snackbar').contains('Cannot find user');
  });

  it('비밀번호가 옳지 않은 경우 로그인을 할 수 없다.', () => {
    const incorrectPassword = '1234qwer';

    cy.get('.login-form').children('input[name="email"]').type(email);
    cy.get('.login-form').children('input[name="password"]').type(incorrectPassword);
    cy.get('.login-page__login-button').click();

    cy.get('#snackbar').contains('Incorrect password');
  });
});

describe('회원 정보 수정', () => {
  let email;
  const name = '관리자';
  const password = 'qwer1234';

  beforeEach(() => {
    cy.visit(baseUrl);

    email = Math.random().toString(36).substring(2, 6) + '@gmail.com';

    cy.get('.login-button').click();
    cy.get('#signup-href').click();

    cy.get('.signup-form').children('input[name="email"]').type(email);
    cy.get('.signup-form').children('input[name="userName"]').type(name);
    cy.get('.signup-form').children('input[name="password"]').type(password);
    cy.get('.signup-form').children('input[name="passwordConfirm"]').type(password);
    cy.get('.signup-page__signup-button').click();

    cy.get('.login-button').click();

    cy.get('.login-form').children('input[name="email"]').type(email);
    cy.get('.login-form').children('input[name="password"]').type(password);
    cy.get('.login-page__login-button').click();
  });

  it('로그인 한 유저는 회원 정보를 수정할 수 있다.', () => {
    cy.get('.user-name__menu-button').click();
    cy.get('.user-name__edit').click();

    const passwordToEdit = 'qwer1234';

    cy.get('.profile-edit-form').children('input[name="password"]').type(passwordToEdit);
    cy.get('.profile-edit-form').children('input[name="passwordConfirm"]').type(passwordToEdit);
    cy.get('.profile-edit-form__edit-button').click();

    cy.get('#snackbar').contains('성공적으로 회원 정보가 수정되었습니다.');
  });

  it('로그인 하지 않은 유저는 회원 정보를 수정할 수 없다.', () => {
    cy.get('.user-name__menu-button').click();
    cy.get('.user-name__logout').click();

    cy.visit(baseUrl + '/profile');

    cy.get('#snackbar').contains('로그인 후 이용할 수 있습니다.');
  });
});
