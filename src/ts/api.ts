const requestSignup = async ({ name, email, password, passwordCheck }) => {
  // verifyUserName(name);
  // verifyUserEmail(email);
  // verifyPassword(password,passwordCheck)

  try {
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error("회원가입 실패");
    }

    const { accessToken, user } = await response.json();
    return { accessToken, user };
  } catch (error) {
    throw new Error(error.message);
  }
};

export { requestSignup };
