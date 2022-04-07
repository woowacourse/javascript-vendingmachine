import { ERROR_MESSAGES } from "./utils/constants";
import { verifyPassword, verifyUserName } from "./utils/validation";

const requestSignup = async ({ name, email, password, passwordCheck }) => {
  verifyUserName(name);
  verifyPassword(password, passwordCheck);

  try {
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.FAIL_SIGNUP);
    }

    const { accessToken, user } = await response.json();
    return { accessToken, user };
  } catch (error) {
    throw new Error(error.message);
  }
};

const requestLogin = async ({ email, password }) => {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.FAIL_LOGIN);
    }

    const { accessToken, user } = await response.json();
    return { accessToken, user };
  } catch (error) {
    throw new Error(error.message);
  }
};

export { requestSignup, requestLogin };
