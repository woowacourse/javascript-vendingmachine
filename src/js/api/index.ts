const request = async (path, option = {}) => {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(option),
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
      const response = await request("http://localhost:3000/register", option);
      return { ...response, isError: false };
    } catch (error) {
      return { isError: true };
    }
  },
};

export default api;
