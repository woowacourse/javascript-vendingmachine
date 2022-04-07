import { ERROR_MESSAGE, SNACKBAR } from '../../src/constants';

const visitURL = 'http://localhost:9000/';

describe('회원가입 테스트', () => {
  it('이미 가입되어있는 이메일을 작성한 경우, 에러 메시지를 확인할 수 있어야한다.', () => {
    cy.visit(visitURL);
    cy.get('.login-button').click();
    cy.get('.signup').click();
    cy.get('#signup-email-input').type('rladpwl0512@gmail.com'); // heroku의 db.json의 default user값입니다. (테스트용)
    cy.get('#signup-name-input').type('위니');
    cy.get('#signup-password-input').clear().type('alreadyexist0512');
    cy.get('#password-confirm-input').clear().type('alreadyexist0512');
    cy.on('window:alert', (str) => {
      expect(str).to.equal(ERROR_MESSAGE.EMAIL_ALREADY_EXISTS);
    });
  });
  it('비밀번호가 10자리 미만인 경우, 에러 메시지를 확인할 수 있어야한다.', () => {
    cy.get('#signup-email-input')
      .clear()
      .type(`${Math.random().toString(36).substring(10)}@email.com`);
    cy.get('#signup-password-input').clear().type('under');
    cy.get('#password-confirm-input').clear().type('under');
    cy.get('.signup-confirm-button').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(ERROR_MESSAGE.IS_NOT_CORRECTED_PASSWORD);
    });
  });
  it('비밀번호에 영어 대문자, 소문자, 숫자 중 2종류 이상이 조합되지 않은 경우, 에러 메시지를 확인할 수 있어야한다.', () => {
    cy.get('#signup-password-input').clear().type('onlyenglish');
    cy.get('#password-confirm-input').clear().type('onlyenglish');
    cy.get('.signup-confirm-button').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(ERROR_MESSAGE.IS_NOT_CORRECTED_PASSWORD);
    });
  });
  it('비밀번호 입력과 비밀번호 확인 입력이 다른 경우, 에러 메시지를 확인할 수 있어야한다.', () => {
    cy.get('#signup-password-input').clear().type('notmatch0512');
    cy.get('#password-confirm-input').clear().type('notmatch512');
    cy.get('.signup-confirm-button').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(ERROR_MESSAGE.IS_NOT_MATCHED_PASSWORD);
    });
  });
  it('회원가입이 가능하다.', () => {
    cy.get('#signup-password-input').clear().type('correctpassword0512');
    cy.get('#password-confirm-input').clear().type('correctpassword0512');
    cy.get('.signup-confirm-button').click();
    cy.get('#snackbar').should('have.text', SNACKBAR.SIGNUP_SUCCESS);
  });
});

// describe('회원 정보 수정 테스트', () => {
//   it('비밀번호가 10자리 미만인 경우, 에러 메시지를 확인할 수 있어야한다.', () => {
//     cy.get('.profile-button').click();
//     cy.get('.info-modify').click();
//     cy.get('#info-name-input').type('로이');
//     cy.get('#info-password-input').type('under');
//     cy.get('#info-password-confirm-input').type('under');
//     cy.get('.info-confirm-button').click();

//     cy.on('window:alert', (str) => {
//       expect(str).to.equal(ERROR_MESSAGE.IS_NOT_CORRECTED_PASSWORD);
//     });
//   });
//   it('비밀번호에 영어 대문자, 소문자, 숫자 중 2종류 이상이 조합되지 않은 경우, 에러 메시지를 확인할 수 있어야한다.', () => {
//     cy.get('#info-password-input').clear().type('onlyenglish');
//     cy.get('#info-password-confirm-input').clear().type('onlyenglish');
//     cy.get('.info-confirm-button').click();
//     cy.on('window:alert', (str) => {
//       expect(str).to.equal(ERROR_MESSAGE.IS_NOT_CORRECTED_PASSWORD);
//     });
//   });
//   it('비밀번호 입력과 비밀번호 확인 입력이 다른 경우, 에러 메시지를 확인할 수 있어야한다.', () => {
//     cy.get('#info-password-input').clear().type('notmatch0512');
//     cy.get('#info-password-confirm-input').clear().type('notmatch512');
//     cy.get('.info-confirm-button').click();
//     cy.on('window:alert', (str) => {
//       expect(str).to.equal(ERROR_MESSAGE.IS_NOT_MATCHED_PASSWORD);
//     });
//   });
//   it('회원 정보 수정이 가능하다.', () => {
//     cy.get('#info-password-input').clear().type('correct0512');
//     cy.get('#info-password-confirm-input').clear().type('correct0512');
//     const userInfo = JSON.parse(localStorage.getItem('userAuth'));
//     console.log(userInfo);
//     cy.get('.info-confirm-button').click();

//     cy.get('#snackbar').should('have.text', SNACKBAR.MODIFY_SUCCESS);
//   });
// });

describe('로그아웃이 가능하다.', () => {
  it('로그아웃 버튼이 클릭되면, 로그아웃 완료 메시지를 확인할 수 있다.', () => {
    cy.get('.profile-button').click();
    cy.get('.logout').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(ERROR_MESSAGE.IS_NOT_MATCHED_PASSWORD);
    });
  });
});

it('로그인이 가능하다.', () => {});
