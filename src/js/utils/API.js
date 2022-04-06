export const signup = async (nameValue, emailValue, passwordValue) => {
  return await fetch('https://json-web-server-ronci.herokuapp.com/register', {
    method: 'POST',
    body: JSON.stringify({
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const login = async (loginEmailValue, loginPasswordValue) => {
  return await fetch('https://json-web-server-ronci.herokuapp.com/login', {
    method: 'POST',
    body: JSON.stringify({
      email: loginEmailValue,
      password: loginPasswordValue,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const modifyUserInfo = async (nameValue, emailValue, passwordValue, id) => {
  await fetch(`https://json-web-server-ronci.herokuapp.com/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
