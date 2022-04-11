export const MEMBER = {
  SUCCESS_SIGN_UP: '가입이 완료되었습니다.',
  PLEASE_EMAIL: '이메일을 입력해주세요.',
  PLEASE_PASSWORD: '비밀번호를 입력해주세요.',
  SUCCESS_LOGIN: '로그인 완료',
  SUCCESS_MODIFY_INFO: '정보가 변경되었습니다.',
  SUCCESS_LOG_OUT: '로그아웃 되었습니다.',

  DIFFERENT_PASSWORD: '비밀번호가 다릅니다. 다시 확인해주세요.',
  NEED_MORE_COMPLICATED_PASSWORD: '영문, 숫자, 특수문자를 모두 사용하여 비밀번호를 구성해주세요.',
  NO_REPEATED_CHAR: '같은 문자를 4번 이상 사용하실 수 없습니다.',
  NO_SPACE_REQUIRED: '비밀번호는 공백 없이 입력해주세요.',
};

export const API_ERROR = {
  NON_EXIST_MEMBER: '존재하지 않는 유저입니다.',
  INVALID_API: '요청을 잘못하신 것 같습니다. API를 다시 확인해주세요.',
  INVALID_LOGIN_INFO: '로그인 정보가 올바르지 않습니다. 다시 로그인해주세요.',
  NON_AUTHORIZED_USER: '데이터를 요청할 수 있는 권한이 없습니다.',
  CANNOT_FIND_PAGE: '페이지를 찾지 못했습니다.',
  DEFAULT_ERROR: '에러가 발생했습니다. 관리자에게 문의해주세요.',
};

export const API = 'https://nine-db-api.herokuapp.com';
