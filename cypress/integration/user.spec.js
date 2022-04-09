describe("유저 정보 테스트", () => {
  before(() => {
    cy.visit("/");
    cy.login();
  });

  it("로그인 상태에서는 자판기 관리 탭을 볼 수 있다.", () => {
    cy.get(".menu-nav").should("be.visible");
  });

  it("회원 이름을 수정하면 썸네일 문자가 변경된다.", () => {
    const newUserName = "woo";
    const password = "aaaaaa1!";

    cy.get(".header__thumnail-button").click();
    cy.get('[data-menu="#profile"]').click();

    cy.get(".profile-form__name-input").clear();
    cy.get(".profile-form__name-input").type(newUserName);
    cy.get(".profile-form__password-input").type(password);
    cy.get(".profile-form__password-input--check").type(password);
    cy.get(".profile-form__confirm-button").click();

    cy.get(".header__thumnail-button").contains(newUserName.slice(0, 1));
  });

  it("로그아웃하고 나면 썸네일 문자가 로그인 버튼으로 변경된다.", () => {
    cy.get(".header__thumnail-button").click();
    cy.get('[data-menu="#logout"]').click();

    cy.get(".header__login-button").should("be.visible");
  });

  it("로그아웃 상태에서는 자판기 관리 탭을 볼 수 없다.", () => {
    cy.get(".menu-nav").should("not.be.visible");
  });
});
