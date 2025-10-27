import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import DiscoveryPage from '../pages/DiscoveryPage';
import ActivityDetailPage from '../pages/ActivityPage';
import SavedPage from '../pages/SavedPage';
import CreatePage from '../pages/CreatePage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import FallbackPage from '../pages/FallbackPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path= "/"/>
        </Routes>
    )
}