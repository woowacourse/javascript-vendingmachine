export async function getUser(userId, accessToken) {
  const response = await fetch(`http://localhost:3000/600/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  return data;
}

export const loginUser = async ({ email, password }) => {
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  console.log(response);

  return response;
};
