const API_ERROR_MSG = {
  '"Email already exists"': '이메일이 중복되었어요 😱',
  '"Cannot find user"': '아이디와 비밀번호를 확인해주세요',
};

export const fetcher = async ({ path, option }) => {
  const response = await fetch(`${API_URL}${path}`, option);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`api 요청 중 에러 발생: ${API_ERROR_MSG[errorText]}`);
  }
  const data = await response.json();
  return data;
};
