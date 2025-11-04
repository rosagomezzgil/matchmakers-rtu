import { Outlet } from "react-router-dom";
import Header from "../components/widgets/Header.jsx";

export default function Layout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-20 px-6">
        <Outlet />
      </main>
    </div>
  );
}

/* Layout component to wrap around pages that share common layout elements
only a sketch so far*/