export const fetchUtil = async function (url, method, body) {
  return await fetch(`${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};
