const API_BASE_URL = `${import.meta.env.VITE_API_URL ?? "http://localhost:3000"}/api/user`;

const saveToken = (token) => {
  localStorage.setItem('authToken', token);
};

const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    let errorMessage = "Login failed";
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch (err) {
      console.error("Failed to parse login error response", err);
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();
  saveToken(data.token);
  return data;
};

const register = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    let errorMessage = "Registration failed";
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch (err) {
      console.error("Failed to parse registration error response", err);
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();
  saveToken(data.token);
  return data;
};

const logout = () => {
  localStorage.removeItem('authToken');
};

const AuthService = {
  login,
  register,
  logout,
  getCurrentUserToken: () => localStorage.getItem('authToken'),
};

export default AuthService;