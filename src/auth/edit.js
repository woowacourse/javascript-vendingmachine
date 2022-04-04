import { manageErrors } from '../utils/commons';

export const getUserData = async () => {
  const response = await fetch(`http://localhost:3000/users`, {
    method: 'GET',
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

export const editUser = async (userInfo) => {
  await fetch(`http://localhost:3000/users/${this.state.userId}`, {
    method: 'PUT',
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
};

export const deleteUser = async () => {
  await fetch(`http://localhost:3000/users/${this.state.userId}`, {
    method: 'DELETE',
  })
    .then(manageErrors)
    .then((res) => res.json())
    .catch(({ message }) => {
      window.alert(message);
    });
};
