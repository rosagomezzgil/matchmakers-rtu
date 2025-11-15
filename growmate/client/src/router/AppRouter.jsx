import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import LandingPage from "../components/pages/LandingPage.jsx";
import AboutUsPage from "../components/pages/AboutUsPage.jsx";
import FAQPage from "../components/pages/FAQPage.jsx";
import ContactsPage from "../components/pages/ContactsPage.jsx";
import FallbackPage from "../components/pages/FallbackPage.jsx";
import SignInPage from "../components/pages/SignInPage.jsx";
import SignUpPage from "../components/pages/SignUpPage.jsx";
import ActivityDetailPage from "../components/pages/ActivityDetailPage.jsx";
import DiscoveryPage from "../components/pages/DiscoveryPage.jsx"; 
import SavedPage from "../components/pages/SavedPage.jsx"; 
import CreatePage from "../components/pages/CreatePage.jsx"; 
import AccountPage from "../components/pages/AccountPage.jsx"; 
import { useAuth } from "../contexts/AuthContext.jsx";

// Komponente zur Umschaltung: / zeigt entweder Landing oder Discovery
const HomeRoute = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <DiscoveryPage /> : <LandingPage />;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        
        {/* ROUTE-BLOCK 1: Seiten OHNE Layout (Header) */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        {/* ROUTE-BLOCK 2: Seiten MIT Layout */}
        <Route path="/" element={<Layout />}>
          
          {/* Index-Route: Umschaltung Landing/Discovery */}
          <Route index element={<HomeRoute />} /> 
          
          {/* Eingeloggte Routen: Saved, Create, Activity Detail, Account */}
          <Route path="saved" element={<SavedPage />} /> 
          <Route path="create" element={<CreatePage />} /> {/* <<< PLATZHALTER ENTFERNT */}
          <Route path="activity/:id" element={<ActivityDetailPage />} />
          <Route path="account" element={<AccountPage />} /> 

          {/* Allgemeine Routen mit Layout */}
          <Route path="faq" element={<FAQPage />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="contacts" element={<ContactsPage />} />

          <Route path="*" element={<FallbackPage />} /> 
        </Route>
        
      </Routes>
    </Router>
  );
};

export default AppRouter;