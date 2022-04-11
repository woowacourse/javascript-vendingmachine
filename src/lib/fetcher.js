const API_ERROR_MSG = {
  'Email already exists': '이메일이 중복되었어요 😱',
  'Cannot find user': '이메일과 비밀번호를 확인해주세요',
  'Incorrect password': '이메일과 비밀번호를 확인해주세요',
  'You must add a "users" collection to your db': '유저 정보가 존재하지 않습니다.',
  'Email format is invalid': '부정확한 이메일입니다.',
  'Email and password are required': '이메일과 비밀번호를 입력해주세요',
  'Password is too short': '비밀번호가 너무 짧습니다.',
};

export const fetcher = async ({ path, option }) => {
  const response = await fetch(`${API_URL}${path}`, option);
  if (!response.ok) {
    const errorText = JSON.parse(await response.text());
    throw new Error(`api 요청 중 에러 발생: ${API_ERROR_MSG[errorText]}`);
  }
  const data = await response.json();
  return data;
};
