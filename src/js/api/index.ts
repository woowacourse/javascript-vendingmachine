const baseUrl = "http://localhost:3000";
const baseHeader = {
  "Content-Type": "application/json",
};
const request = async (path, { method, headers, body = {} }) => {
  const response = await fetch(baseUrl + path, {
    method,
    headers,
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
};

const api = {
  signUp: async (option) => {
    try {
      const response = await request("/register", {
        method: "POST",
        headers: baseHeader,
        body: option,
      });
      return { ...response, isError: false };
    } catch (error) {
      console.log(error);
      return { isError: true };
    }
  },

  login: async (option) => {
    try {
      const response = await request("/login", {
        method: "POST",
        headers: baseHeader,
        body: option,
      });
      return { ...response, isError: false };
    } catch (error) {
      return { isError: true };
    }
  },
};

export default api;
