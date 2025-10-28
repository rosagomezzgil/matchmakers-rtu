import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => (
    <div>
        {/* ...Header / Nav ... */}
        <Outlet />
        {/* ...Footer ... */}
    </div>
);

export default Layout;

/* Layout component to wrap around pages that share common layout elements
only a sketch so far*/
