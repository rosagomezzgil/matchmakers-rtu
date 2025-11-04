import { NavLink } from "react-router-dom";

const link = ({ isActive }) =>
  "leading-none " + (isActive ? "border-b pb-1" : "opacity-90 hover:opacity-100");

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md text-white">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-xl font-semibold tracking-wide">GrowMate</NavLink>
        <ul className="flex gap-6 text-sm sm:text-base">
          <li><NavLink to="/" className={link} end>Home</NavLink></li>
          <li><NavLink to="/faq" className={link}>FAQ</NavLink></li>
          <li><NavLink to="/contacts" className={link}>Contacts</NavLink></li>
          <li><NavLink to="/about" className={link}>About us</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}