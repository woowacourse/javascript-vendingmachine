import { manageErrors } from '../utils/domUtil';

const baseURL = 'https://dory-vending-machine.herokuapp.com';

export const editUser = async (id, userInfo) => {
  await fetch(`${baseURL}/users/${id}`, {
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

export const deleteUser = async (id) => {
  await fetch(`${baseURL}/users/${id}`, {
    method: 'DELETE',
  })
    .then(manageErrors)
    .then((res) => res.json())
    .catch(({ message }) => {
      window.alert(message);
    });
};
