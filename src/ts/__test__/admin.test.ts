import { Admin } from '../../index.d';
import AdminImpl from '../interactor/AdminImpl';

let admin: Admin;

describe('회원 가입', () => {
  beforeEach(() => {
    admin = new AdminImpl();
  });

  it(`이메일 형식이 잘못됐을 때, 회원 가입할 수 없다.`, () => {
    const user = { email: 'asd', name: 'hi', password: 'asdf123', passwordConfirmation: 'asdf123' };
    const test = () => admin.signup(user);

    expect(test).toThrow('이메일 형식을 지켜주세요!');
  });

  it(`이름이 1글자일 때, 회원 가입할 수 없다.`, () => {
    const user = { email: 'woowa123@gmail.com', name: 'h', password: 'asdf123', passwordConfirmation: 'asdf123' };
    const test = () => admin.signup(user);

    expect(test).toThrow('이름은 2이상 6이하로 입력해주세요!');
  });

  it(`이름이 7글자일 때, 회원 가입할 수 없다.`, () => {
    const user = { email: 'woowa123@gmail.com', name: 'abcdefg', password: 'asdf123', passwordConfirmation: 'asdf123' };
    const test = () => admin.signup(user);

    expect(test).toThrow('이름은 2이상 6이하로 입력해주세요!');
  });

  it(`비밀번호가 6글자일 때, 회원 가입할 수 없다.`, () => {
    const user = { email: 'woowa123@gmail.com', name: 'hi', password: 'asdf12', passwordConfirmation: 'asdf12' };
    const test = () => admin.signup(user);

    expect(test).toThrow('비밀번호는 7이상 15이하로 입력해주세요!');
  });

  it(`비밀번호가 16글자일 때, 회원 가입할 수 없다.`, () => {
    const user = { email: 'woowa123@gmail.com', name: 'hi', password: 'abcde12345123456', passwordConfirmation: 'abcde12345123456' };
    const test = () => admin.signup(user);

    expect(test).toThrow('비밀번호는 7이상 15이하로 입력해주세요!');
  });

  it('비밀번호가 문자로만 이뤄졌을 때, 회원 가입할 수 없다.', () => {
    const user = { email: 'woowa123@gmail.com', name: 'hi', password: 'abcdabcde', passwordConfirmation: 'abcdabcde' };
    const test = () => admin.signup(user);

    expect(test).toThrow('비밀번호는 문자와 숫자를 모두 포함해야 합니다!');
  });

  it('비밀번호가 숫자로만 이뤄졌을 때, 회원 가입할 수 없다.', () => {
    const user = { email: 'woowa123@gmail.com', name: 'hi', password: '12345123', passwordConfirmation: '12345123' };
    const test = () => admin.signup(user);

    expect(test).toThrow('비밀번호는 문자와 숫자를 모두 포함해야 합니다!');
  });

  it('비밀번호와 비밀번호 확인이 일치하지 않을 때, 회원 가입할 수 없다.', () => {
    const user = { email: 'woowa123@gmail.com', name: 'hi', password: 'asdf123', passwordConfirmation: 'asdf125' };
    const test = () => admin.signup(user);

    expect(test).toThrow('비밀번호와 비밀번호 확인이 일치해야 합니다!');
  });
});
