export const fetcher = async ({ path, option }) => {
  const response = await fetch(`${API_URL}${path}`, option);

  if (!response.ok) {
    throw new Error(`api 요청 중 에러 발생: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
