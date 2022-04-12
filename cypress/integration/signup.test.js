import { ERROR_MESSAGE } from '../../src/ts/constants';
import { pickRandomIndex } from '../../src/ts/utils';

const createRandomEmail = () =>
  `${Array.from({ length: 15 }, () => pickRandomIndex(1, 30)).join(
    ''
  )}@random.com`;

describe('회원가입 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/signup');
  });

  it('회원가입을 할 수 있다.', () => {
    const name = '후이';
    const password = 'random123!';

    cy.signup(createRandomEmail(), name, password, password);

    cy.url().should('eq', 'http://localhost:9000/products');
  });

  it('이미 존재하는 이메일이라면 에러 메시지를 보여준다.', () => {
    const existEmail = 'test@test.com';
    const userName = '후이';
    const password = 'test123!';

    cy.signup(existEmail, userName, password, password);

    cy.checkErrorMessage(ERROR_MESSAGE.ALREADY_EXIST_EMAIL);
  });

  it('입력한 비밀번호와 비밀번호 확인이 다르다면 에러 메세지를 보여준다.', () => {
    const existEmail = 'test@test.com';
    const userName = '후이';
    const password = 'test123!';
    const wrongPasswordConfirm = 'test123@';

    cy.signup(existEmail, userName, password, wrongPasswordConfirm);

    cy.checkErrorMessage(ERROR_MESSAGE.NOT_CONFIRMED_PASSWORD);
  });
});
