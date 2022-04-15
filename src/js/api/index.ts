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
    return { isError: true };
  }
  const data = await response.json();
  return { ...data, isError: false };
};

const api = {
  signUp: async (option: ISignUpOption) => {
    const response = await request("/register", {
      method: METHODS.POST,
      headers: baseHeader,
      body: JSON.stringify(option),
    });
    return response;
  },

  login: async (option: ILoginOption) => {
    const response = await request("/login", {
      method: METHODS.POST,
      headers: baseHeader,
      body: JSON.stringify(option),
    });
    return response;
  },

  getUser: async (userId: string, accessToken: string) => {
    const response = await request(`/600/users/${userId}`, {
      method: METHODS.GET,
      headers: { ...baseHeader, Authorization: `Bearer ${accessToken}` },
    });
    return response;
  },

  updateUserInfo: async (
    userId: string,
    user: IUserInfoOption,
    accessToken: string
  ) => {
    const response = await request(`/600/users/${userId}`, {
      method: METHODS.PATCH,
      body: JSON.stringify(user),
      headers: { ...baseHeader, Authorization: `Bearer ${accessToken}` },
    });
    return response;
  },
};

export default api;
