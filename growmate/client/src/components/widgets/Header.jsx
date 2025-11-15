import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx"; 

const link = (isActive, textColorClass, activeBorderColor) =>
  `leading-none ${textColorClass} ` +
  (isActive ? `border-b pb-1 ${activeBorderColor}` : "opacity-90 hover:opacity-100");

export default function Header({ isLoggedIn }) {
const { signOut } = useAuth();

const bgColor = isLoggedIn ? "bg-white/30" : "bg-black/30";
  const textColor = isLoggedIn ? "text-gray-800" : "text-white";
  const activeBorderColor = isLoggedIn ? "border-gray-800" : "border-white";
  const getLinkClasses = ({ isActive }) =>
    link(isActive, textColor, activeBorderColor);

  // Haupt-Navigationslinks (nur sichtbar, wenn NICHT eingeloggt)
  const NotLoggedInNav = (
    <ul className="flex gap-6 text-sm sm:text-base">
      <li><NavLink to="/" className={getLinkClasses} end>Home</NavLink></li>
      <li><NavLink to="/faq" className={getLinkClasses}>FAQ</NavLink></li>
      <li><NavLink to="/contacts" className={getLinkClasses}>Contacts</NavLink></li>
      <li><NavLink to="/about" className={getLinkClasses}>About us</NavLink></li>
    </ul>
  );

  // Auth/Account-Links
  const AuthControls = isLoggedIn ? (
    // Eingeloggt: Saved, Create, Account
    <div className="flex gap-6 text-sm sm:text-base items-baseline">
        <NavLink to="/saved" className={getLinkClasses}>Saved</NavLink>
        <NavLink to="/create" className={getLinkClasses}>Create</NavLink>
        <NavLink to="/account" className={getLinkClasses}>Account</NavLink> 
    </div>
  ) : (
    // Nicht eingeloggt: Sign In, Sign Up
    <div className="flex gap-4 text-sm sm:text-base">
      <NavLink to="/signin" className={`${textColor} opacity-90 hover:opacity-100`}>Sign In</NavLink>
      <NavLink to="/signup" className={`${textColor} opacity-90 hover:opacity-100`}>Sign Up</NavLink>
    </div>
  );
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${bgColor} backdrop-blur-md ${textColor}`}
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        {/* Logo/App Name */}
        <NavLink to="/" className="text-xl font-semibold tracking-wide">
          GrowMate
        </NavLink>

        {/* Navigation wechselt je nach Zustand */}
        {isLoggedIn ? null : NotLoggedInNav}
        
        {/* Account/Auth Sektion */}
        {AuthControls}
      </nav>
    </header>
  );
}