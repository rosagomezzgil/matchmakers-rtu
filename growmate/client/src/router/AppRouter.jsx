import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import DiscoveryPage from "../components/pages/DiscoveryPage.jsx";
import AboutUsPage from "../components/pages/AboutUsPage.jsx";
import FAQPage from "../components/pages/FAQPage.jsx";
import ContactsPage from "../components/pages/ContactsPage.jsx";
import FallbackPage from "../components/pages/FallbackPage.jsx";
import SignInPage from "../components/pages/SignInPage.jsx";
import SignUpPage from "../components/pages/SignUpPage.jsx";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Layout-Routes */}
        <Route path="/" element={<Layout />}>
        <Route index element={<DiscoveryPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="about" element={<AboutUsPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="*" element={<FallbackPage />} />   {/* genau hier */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        </Route>
      

      /** These two have to go ether INTO route or OUTSIDE it, but depends
      if we want to have the header everywhere or nah */
      
        {/* Routen ohne Layout */}
       <Route path="/signin" element={<SignInPage />} />
       <Route path="/signup" element={<SignUpPage />} />

       
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
