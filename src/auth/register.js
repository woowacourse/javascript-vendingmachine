import { manageErrors } from '../utils/commons';

export const registerUser = async (userInfo) => {
  const response = await fetch('http://localhost:3000/register', {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(manageErrors)
    .then((res) => res.json())
    .catch(({ message }) => {
      window.alert(message);
    });

  return response;
};
