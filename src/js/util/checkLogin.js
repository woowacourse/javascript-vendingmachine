import { getLocalStorage } from "./localStorage";

const isLogin = () => {
  const user = getLocalStorage("user-info");
  return !!user;
};

export default isLogin;
