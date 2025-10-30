import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "../layout/Layout";
import LandingPage from "../pages/LandingPage";
import DiscoveryPage from "../pages/DiscoveryPage";
import ActivityDetailPage from "../pages/ActivityPage";
import SavedPage from "../pages/SavedPage";
import CreatePage from "../pages/CreatePage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import FallbackPage from "../pages/FallbackPage";

const AppRouter = () => {
  return (
    <Router>-   
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
