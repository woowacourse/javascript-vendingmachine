import { ERROR_MESSAGES } from "./constants";

const saveSessionStorage = (key: string, data) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

const getSessionStorage = (key: string) => {
  try {
    return JSON.parse(sessionStorage.getItem(key)) ?? "";
  } catch {
    throw new Error(ERROR_MESSAGES.CANNOT_PARSE_JSON);
  }
};

const removeSessionStorage = (key: string) => {
  sessionStorage.removeItem(key);
};

export { saveSessionStorage, getSessionStorage, removeSessionStorage };
