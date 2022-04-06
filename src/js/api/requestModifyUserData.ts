import { ALERT_MESSAGE, ERROR_MESSAGE } from '../constants';
import { User } from '../interfaces/UserData.interface';

const requestModifyUserData = async (userData: User) => {
  const response = await fetch(`http://localhost:3000/users/${userData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const dataResult = await response.json();

  if (!response.ok) {
    switch (dataResult) {
      case 'Password is too short':
        throw new Error(ERROR_MESSAGE.PASSWORD_IS_TOO_SHORT);
    }
  }

  const updatedInfo = {
    email: dataResult.email,
    name: dataResult.name,
    id: dataResult.id,
  };

  localStorage.setItem('user', JSON.stringify(updatedInfo));
  return ALERT_MESSAGE.USER_INFO_MODIFY_SUCCESS;
};

export default requestModifyUserData;
