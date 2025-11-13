import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx"; 
import React, { useState } from 'react'; // NEU: useState importieren

export default function SignInPage() {
  const { signIn, loading, error } = useAuth(); // 'error' und 'loading' verwenden
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    await signIn(email, password);
    // Nach erfolgreichem Login (unabhängig davon, ob es ein Fake-Login war), navigieren
    if (AuthService.getCurrentUserToken()) { // Prüfen, ob ein Token gesetzt wurde
        navigate("/"); 
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 space-y-8">
        <h2 className="text-3xl font-bold text-center">Log In</h2>
        <p className="text-center text-gray-400">
          Welcome back to GrowMate
        </p>

        <form onSubmit={handleSignIn} className="space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {/* Email Feld */}
          <div>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Email"
            />
          </div>

          {/* Passwort Feld */}
          <div>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Password"
            />
          </div>

          {/* Anmelde-Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-500"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <div className="text-sm text-center">
          <Link
            to="/signup"
            className="font-medium text-green-500 hover:text-green-400"
          >
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
}