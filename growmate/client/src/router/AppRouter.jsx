import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";
import LandingPage from "../components/pages/LandingPage.jsx";
import DiscoveryPage from "../components/pages/DiscoveryPage.jsx";
import ActivityDetailPage from "../components/pages/ActivityDetail.jsx";
import SavedPage from "../components/pages/SavedPage.jsx";
import CreatePage from "../components/pages/CreatePage.jsx";
import SignInPage from "../components/pages/SignInPage.jsx";
import SignUpPage from "../components/pages/SignUpPage.jsx";
import FallbackPage from "../components/pages/FallbackPage.jsx";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DiscoveryPage />} />
          <Route path="activity/:id" element={<ActivityDetailPage />} />
          <Route path="saved" element={<SavedPage />} />
          <Route path="create" element={<CreatePage />} />
          <Route path="*" element={<FallbackPage />} />
        </Route>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
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
