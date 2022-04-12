import { HASH } from "../../src/js/constant";
import { SELECTOR, TEST_USER } from "../utils";

describe("관리자가 되고자 하는 유저는 회원 가입을 할 수 있다.", () => {
  beforeEach(() => {
    cy.visit(`/${HASH.SIGNUP}`);
  });

  it("name은 2~6글자까지 가능하다.", () => {
    cy.signUp({
      email: TEST_USER.EMAIL,
      name: ".",
      password: TEST_USER.PASSWORD,
      confirmPassword: TEST_USER.PASSWORD,
    });
    cy.get(SELECTOR.SNACKBAR).should("be.visible");
  });

  it("password는 대문자 영어 최소 1개, 소문자 영어 최소 1개, 특수문자 최소 1개의 8자 이상의 조합으로 이루어져야 한다.", () => {
    cy.signUp({
      email: TEST_USER.EMAIL,
      name: TEST_USER.NAME,
      password: "abcd1234!",
      confirmPassword: "abcd1234!",
    });
    cy.get(SELECTOR.SNACKBAR).should("be.visible");
  });

  it("입력된 비밀번호와 비밀번호 확인이 일치해야 한다.", () => {
    cy.signUp({
      email: TEST_USER.EMAIL,
      name: TEST_USER.NAME,
      password: TEST_USER.PASSWORD,
      confirmPassword: "Abcd1234",
    });

    cy.get(SELECTOR.SNACKBAR).should("be.visible");
  });

  it("회원가입이 성공적으로 되면 메인 페이지로 리다이렉트 된다.", () => {
    cy.signUp({
      email: TEST_USER.EMAIL,
      name: TEST_USER.NAME,
      password: TEST_USER.PASSWORD,
      confirmPassword: TEST_USER.PASSWORD,
    });
    cy.location("pathname").should("eq", "/");
  });
});

describe("관리자는 로그인할 수 있다.", () => {
  beforeEach(() => {
    cy.visit(`/${HASH.LOGIN}`);
  });

  it("로그인한 유저의 이름중 첫번째 글자가 썸네일로 보인다.", () => {
    cy.login(TEST_USER.EMAIL, TEST_USER.PASSWORD);
    cy.get(SELECTOR.USER_AVATAR).contains(TEST_USER.NAME[0]);
  });

  it("로그인한 유저의 썸네일을 hover 하면, 회원 정보 수정과 로그아웃 메뉴가 보인다.", () => {
    cy.login(TEST_USER.EMAIL, TEST_USER.PASSWORD);
    cy.get(SELECTOR.TOOLTIP).invoke("css", "visibility", "visible");
    cy.get(SELECTOR.LOGOUT).should("be.visible");
    cy.get(SELECTOR.UPDATE_USER).should("be.visible");
  });

  it("로그아웃 하면 로그인 버튼이 보인다.", () => {
    cy.login(TEST_USER.EMAIL, TEST_USER.PASSWORD);
    cy.get(SELECTOR.TOOLTIP).invoke("css", "visibility", "visible");
    cy.get(SELECTOR.LOGOUT).click();
    cy.get(SELECTOR.LOGOUT).should("not.exist");
    cy.get(SELECTOR.UPDATE_USER).should("not.exist");
    cy.get(SELECTOR.LOGIN).should("be.visible");
  });
});

describe("관리자가 아닌 일반 사용자는 관리자 페이지에 접근 할 수 없다.", () => {
  it("일반 사용자는 상품 관리 페이지에 접근하면 메인 페이지로 리다이렉트 된다.", () => {
    cy.visit(`/${HASH.PRODUCT_MANAGEMENT}`);
    cy.location("pathname").should("eq", "/");
  });

  it("일반 사용자는 잔돈 충전 페이지에 접근하면 메인 페이지로 리다이렉트 된다.", () => {
    cy.visit(`/${HASH.CHARGE_CHANGES}`);
    cy.location("pathname").should("eq", "/");
  });

  it("일반 사용자는 회원 정보 페이지에 접근하면 메인 페이지로 리다이렉트 된다.", () => {
    cy.visit(`/${HASH.USER_INFO}`);
    cy.location("pathname").should("eq", "/");
  });
});

describe("관리자로 로그인된 사용자는 로그인, 회원가입 페이지에 접근 할 수 없다.", () => {
  before(() => {
    cy.visit(`/${HASH.LOGIN}`);
    cy.login(TEST_USER.EMAIL, TEST_USER.PASSWORD);
  });

  it("관리자는 로그인 페이지에 접근하면 메인 페이지로 리다이렉트 된다.", () => {
    cy.visit(`/${HASH.LOGIN}`);
    cy.location("pathname").should("eq", "/");
  });

  it("관리자는 회원가입 페이지에 접근하면 메인 페이지로 리다이렉트 된다.", () => {
    cy.visit(`/${HASH.SIGNUP}`);
    cy.location("pathname").should("eq", "/");
  });
});
