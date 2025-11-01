import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import DiscoveryPage from "../components/pages/DiscoveryPage.jsx";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<DiscoveryPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;

/** all pathes are declared in this file
 * first block of pathes uses the layout, the second block does not
 * parent route: layout, child routes: other pages
 * Route index element is for declaration of main page
 * no header, no filterbar in landing, sign-in, sign-up pages
 */
