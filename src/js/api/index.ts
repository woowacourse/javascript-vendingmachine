import { ISignUpOption, ILoginOption, IUserInfoOption } from "../type";

const baseUrl = "http://localhost:3000";
const baseHeader = {
  "Content-Type": "application/json",
};

type TGetMethod = "GET";
type TPostMethod = "POST";
type TPatchMethod = "PATCH";

const METHODS = {
  GET: "GET" as TGetMethod,
  POST: "POST" as TPostMethod,
  PATCH: "PATCH" as TPatchMethod,
};

type TMethods = TGetMethod | "POST" | "PATCH";
interface IOption {
  method: TMethods;
  headers: HeadersInit;
  body?: string;
}

const request = async (path: string, option: IOption) => {
  const response = await fetch(baseUrl + path, option);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
};

const api = {
  signUp: async (option: ISignUpOption) => {
    try {
      const response = await request("/register", {
        method: METHODS.POST,
        headers: baseHeader,
        body: JSON.stringify(option),
      });
      return { ...response, isError: false };
    } catch (error) {
      return { isError: true };
    }
  },

  login: async (option: ILoginOption) => {
    try {
      const response = await request("/login", {
        method: METHODS.POST,
        headers: baseHeader,
        body: JSON.stringify(option),
      });
      return { ...response, isError: false };
    } catch (error) {
      return { isError: true };
    }
  },

  getUser: async (userId: string, accessToken: string) => {
    try {
      const response = await request(`/600/users/${userId}`, {
        method: METHODS.GET,
        headers: { ...baseHeader, Authorization: `Bearer ${accessToken}` },
      });
      return { ...response, isError: false };
    } catch (error) {
      return { isError: true };
    }
  },

  updateUserInfo: async (
    userId: string,
    user: IUserInfoOption,
    accessToken: string
  ) => {
    try {
      const response = await request(`/600/users/${userId}`, {
        method: METHODS.PATCH,
        body: JSON.stringify(user),
        headers: { ...baseHeader, Authorization: `Bearer ${accessToken}` },
      });
      return { ...response, isError: false };
    } catch (error) {
      return { isError: true };
    }
  },
};

export default api;
