import { Outlet } from "react-router-dom";
import Header from "./widgets/Header";

const Layout = () => (
  <div>
    <Header />
    <main class name="main">
      <Outlet />
    </main>
  </div>
);

export default Layout;

/* Layout component to wrap around pages that share common layout elements
only a sketch so far*/