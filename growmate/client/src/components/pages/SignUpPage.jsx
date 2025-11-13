import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx"; 
import React, { useState } from 'react'; // NEU: useState importieren
import AuthService from '../../services/AuthService'; // NEU: AuthService für Token-Check

export default function SignUpPage() {
  const { signUp, loading, error } = useAuth(); 
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }
    
    await signUp(email, password);
    
    // Nach erfolgreicher Registrierung/Login navigieren
    if (AuthService.getCurrentUserToken()) { 
        navigate("/"); 
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 space-y-8">
        <h2 className="text-3xl font-bold text-center">Register</h2>
        <p className="text-center text-gray-400">
          Join GrowMate and start growing together.
        </p>

        <form onSubmit={handleSignUp} className="space-y-6">
          {(error || formError) && <p className="text-red-500 text-center">{error || formError}</p>}
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
          
          {/* Passwort bestätigen */}
          <div>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Confirm Password"
            />
          </div>

          {/* Registrieren-Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-500"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="text-sm text-center">
          <Link
            to="/signin"
            className="font-medium text-green-500 hover:text-green-400"
          >
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
}