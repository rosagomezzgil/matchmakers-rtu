import { Outlet } from "react-router-dom";
import Header from "../components/widgets/Header.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Layout() {
  const { isLoggedIn } = useAuth();

  const layoutClass = isLoggedIn
    ? "bg-white text-gray-800" 
    : "bg-black text-white";

  return (
    <div className={`min-h-screen ${isLoggedIn ? 'bg-white text-gray-800' : 'bg-black text-white'}`}>
      <Header isLoggedIn={isLoggedIn} />{" "}
      <main className="pt-20 px-6 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

/* Layout component to wrap around pages that share common layout elements
only a sketch so far*/