describe("회원가입 및 로그인 테스트", () => {
  beforeEach(() => {
    cy.visit("dist/index.html");
  });

  it("로그인이 가능하다", () => {
    cy.login("hwangstar123@gmail.com", "aldald1");

    cy.get("#page-tab-container").should("be.visible");
  });

  it("로그아웃이 가능하다", () => {
    cy.login("hwangstar123@gmail.com", "aldald1");
    cy.logout();
    cy.get("login-status").shadow().find("#login-button").should("be.visible");
  });

  it("중복된 이메일을 회원가입시 에러 snackbar를 보여준다", () => {
    cy.signup("hwangstar123@gmail.com", "ghkdwjdals1!", "스밍");
    cy.get("#snackbar").should("have.text", "Email already exists");
  });

  it("비밀번호를 잘못 입력하면 에러 snackbar를 보여준다", () => {
    cy.login("hwangstar123@gmail.com", "tmald1");
    cy.get("#snackbar").should("have.text", "Incorrect password");
  });

  it("없는 이메일을 입력할시 에러 snackbar를 보여준다", () => {
    cy.login("hwangstar12345@gmail.com", "aldald1");

    cy.get("#snackbar").should("have.text", "Cannot find user");
  });

  it("관리자 정보를 수정할수 있다", () => {
    cy.login("hwangstar123@gmail.com", "aldald1");

    cy.userEdit("밍밍", "aldald1");

    cy.get("login-status")
      .shadow()
      .find("#user-profile")
      .should("have.text", "밍");
  });
});
