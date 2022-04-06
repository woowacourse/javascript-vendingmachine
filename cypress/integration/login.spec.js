describe("회원가입 및 로그인 테스트", () => {
  beforeEach(() => {
    cy.visit("dist/index.html");
  });

  it("로그인이 가능하다", () => {
    cy.get("login-status").click();
    cy.get("#login-email-input").type("hwangstar123@gmail.com");
    cy.get("#login-password-input").type("aldald1");

    cy.get(".login-button").click();
    cy.get("#page-tab-container").should("be.visible");
  });

  it("로그아웃이 가능하다", () => {
    cy.get("login-status").click();
    cy.get("#login-email-input").type("hwangstar123@gmail.com");
    cy.get("#login-password-input").type("aldald1");

    cy.get(".login-button").click();
    cy.get("login-status").shadow().find("#user-profile").click();
    cy.get("login-status").shadow().find("#logout-button").click();
    cy.get("login-status").shadow().find("#login-button").should("be.visible");
  });

  it("중복된 이메일을 회원가입시 에러 snackbar를 보여준다", () => {
    cy.get("login-status").click();

    cy.get("a").click();
    cy.get("#signup-email").type("hwangstar123@gmail.com");
    cy.get("#signup-name").type("스밍");
    cy.get("#signup-password").type("ghkdwjdals1!");
    cy.get("#signup-password-confirm").type("ghkdwjdals1!");
    cy.get(".button").click();
    cy.get("#snackbar").should("have.text", "Email already exists");
  });

  it("비밀번호를 잘못 입력하면 에러 snackbar를 보여준다", () => {
    cy.get("login-status").click();
    cy.get("#login-email-input").type("hwangstar123@gmail.com");
    cy.get("#login-password-input").type("tmald12");

    cy.get(".login-button").click();
    cy.get("#snackbar").should("have.text", "Incorrect password");
  });

  it("없는 이메일을 입력할시 에러 snackbar를 보여준다", () => {
    cy.get("login-status").click();
    cy.get("#login-email-input").type("hwangstar12345@gmail.com");
    cy.get("#login-password-input").type("aldald1");

    cy.get(".login-button").click();
    cy.get("#snackbar").should("have.text", "Cannot find user");
  });

  it("관리자 정보를 수정할수 있다", () => {
    cy.get("login-status").click();
    cy.get("#login-email-input").type("hwangstar123@gmail.com");
    cy.get("#login-password-input").type("aldald1");

    cy.get(".login-button").click();

    cy.get("login-status").shadow().find("#user-profile").click();
    cy.get("login-status")
      .shadow()
      .find(".user-menu-list")
      .find("li")
      .first()
      .click();

    cy.get("#edit-user-name").clear().type("밍밍");
    cy.get("#edit-user-password").type("aldald1");
    cy.get("#edit-user-password-confirm").type("aldald1");
    cy.get(".button").click();

    cy.get("login-status")
      .shadow()
      .find("#user-profile")
      .should("have.text", "밍");
  });
});
