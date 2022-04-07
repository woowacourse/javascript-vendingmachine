const baseUrl = "http://localhost:3000";
const baseHeader = {
  "Content-Type": "application/json",
};
const request = async (path, option) => {
  const response = await fetch(baseUrl + path, option);
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
        body: JSON.stringify(option),
      });
      return { ...response, isError: false };
    } catch (error) {
      return { isError: true };
    }
  },

  login: async (option) => {
    try {
      const response = await request("/login", {
        method: "POST",
        headers: baseHeader,
        body: JSON.stringify(option),
      });
      return { ...response, isError: false };
    } catch (error) {
      return { isError: true };
    }
  },

  getUser: async (userId, accessToken) => {
    try {
      const response = await request(`/600/users/${userId}`, {
        method: "GET",
        headers: { ...baseHeader, Authorization: `Bearer ${accessToken}` },
      });
      return { ...response, isError: false };
    } catch (error) {
      return { isError: true };
    }
  },

  updateUserInfo: async (userId, user, accessToken) => {
    try {
      console.log(user);
      const response = await request(`/600/users/${userId}`, {
        method: "PATCH",
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
