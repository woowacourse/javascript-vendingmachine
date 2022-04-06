import { UserInfo } from "../components/signup/SignupComponent";
import { getSessionStorage, saveSessionStorage } from "../utils/sessionStorage";

class AuthManager {
  private accessToken: string = getSessionStorage("accessToken");
  private userInfo: UserInfo = getSessionStorage("userInfo");

  getAccessToken() {
    return this.accessToken;
  }

  setAccessToken(accessToken: string) {
    saveSessionStorage("accessToken", accessToken);
  }

  getUserInfo() {
    return this.userInfo;
  }

  setUserInfo(userInfo: UserInfo) {
    saveSessionStorage("userInfo", userInfo);
  }
}

export default AuthManager;
