const baseURL = 'https://dory-vending-machine.herokuapp.com';

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${baseURL}/login`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch(({ message }) => {
      window.alert(message);
    });

  return response;
};
