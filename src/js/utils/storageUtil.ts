export const setData = (key: string, data: object) =>
  localStorage.setItem(key, JSON.stringify(data));

export const getData = (key: string) => JSON.parse(localStorage.getItem(key));
