import { fetcher } from '../lib/fetcher';
import { checkJoinPossible } from '../utils/validation';

export const loginUser = async (emailValue, passwordValue) => {
  try {
    const data = await fetcher({
      path: '/register',
      option: {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailValue, password: passwordValue }),
      },
    });

    console.log(data);
  } catch (error) {
    alert(error);
  }
};

export const joinUser = async (email, name, password, passwordReenter) => {
  try {
    if (checkJoinPossible(name, password, passwordReenter)) {
      const data = await fetcher({
        path: '/register',
        option: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, name }),
        },
      });
      // data로 setting
    }
  } catch ({ message }) {
    alert(message);
  }
};
