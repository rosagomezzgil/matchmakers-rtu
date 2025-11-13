const API_BASE_URL = "http://localhost:3000/api/user";

// Funktion zum Speichern des JWT-Tokens (wird für Authentifizierung benötigt)
const saveToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Temporäres Login (wird durch das ECHTE Login ersetzt)
const getFakeToken = () => "fake-jwt-token-for-testing";


// ECHTE Login-Funktion
const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }

    const data = await response.json();
    saveToken(data.token); // Speichert den JWT-Token
    return data;
    
  } catch (error) {
    console.error('API Login Error:', error);
    // FALLBACK: Wenn die API nicht läuft, nutzen wir den Fake-Token
    if (error.message.includes('Failed to fetch')) {
        saveToken(getFakeToken()); 
        return { token: getFakeToken(), user: { email, fake: true } };
    }
    throw error;
  }
};

// ECHTE Registrierungs-Funktion
const register = async (email, password) => {
    // Hier können Sie fast denselben Code wie oben verwenden, aber mit dem /register Endpunkt
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Registration failed');
        }

        const data = await response.json();
        saveToken(data.token); 
        return data;

    } catch (error) {
        console.error('API Registration Error:', error);
        // FALLBACK: Wenn die API nicht läuft, nutzen wir den Fake-Token
        if (error.message.includes('Failed to fetch')) {
            saveToken(getFakeToken()); 
            return { token: getFakeToken(), user: { email, fake: true } };
        }
        throw error;
    }
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