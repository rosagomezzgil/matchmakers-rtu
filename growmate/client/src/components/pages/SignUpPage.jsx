import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx"; 
import React, { useState } from 'react';

// Sign-up page component
export default function SignUpPage() {

  // Get register function and status from AuthContext
  const { signUp, loading, error } = useAuth();

  // Used to navigate after registration
  const navigate = useNavigate();

  // Local form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState(null);

  // Handle form submit
  const handleSignUp = async (e) => {
    e.preventDefault(); // stop page refresh
    setFormError(null);

    // simple password check
    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    // call backend through AuthContext
    const result = await signUp(email, password);

    // go to homepage when registration works
    if (result?.ok) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full p-10 space-y-10 rounded-3xl border border-gray-800 bg-gray-950/70 backdrop-blur-md shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
        <div className="space-y-3 text-center">
          <p className="text-sm tracking-[0.35em] uppercase text-gray-500">Growmate</p>
          <h2 className="text-3xl font-semibold">Create an account</h2>
          <p className="text-gray-400 text-sm">
            Start matching with curated activities around you.
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-5">
          {(error || formError) && <p className="text-red-400 text-center text-sm">{error || formError}</p>}

          <div className="space-y-1">
            <label htmlFor="email" className="text-xs uppercase tracking-wide text-gray-500">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-800 rounded-2xl bg-gray-900/60 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-xs uppercase tracking-wide text-gray-500">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-800 rounded-2xl bg-gray-900/60 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Create a password"
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="confirm-password" className="text-xs uppercase tracking-wide text-gray-500">
              Confirm password
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-800 rounded-2xl bg-gray-900/60 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Repeat password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors disabled:bg-gray-500 disabled:text-white/70"
          >
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </form>

        <div className="text-sm text-center text-gray-400">
          <span>Already have an account? </span>
          <Link
            to="/signin"
            className="font-semibold text-white hover:text-gray-200"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}