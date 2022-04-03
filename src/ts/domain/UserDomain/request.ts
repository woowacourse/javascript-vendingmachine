type RequestType = 'signin' | 'signup';

const request = async (purpose: RequestType, user: object) => {
  const url = `http://localhost:3000/${
    purpose === 'signup' ? 'register' : 'login'
  }`;
  let resInfo;

  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async response => {
    if (!response.ok) {
      throw new Error();
    }
    await response.json().then(res => {
      resInfo = res;
    });
  });

  return resInfo;
};

const requestUpdate = async (user: object, id: string) => {
  const url = `http://localhost:3000/users/${id}`;
  let resInfo;

  await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async response => {
    if (!response.ok) {
      throw new Error();
    }
    await response.json().then(res => {
      resInfo = res;
    });
  });

  return resInfo;
};

export { request, requestUpdate };
