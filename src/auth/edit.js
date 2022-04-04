import { manageErrors } from '../utils/domUtil';

export const editUser = async (id, userInfo) => {
  await fetch(`http://localhost:3000/users/${id}`, {
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
