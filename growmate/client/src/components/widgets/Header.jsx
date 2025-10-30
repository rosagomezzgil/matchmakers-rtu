import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white shadow-md z-20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        {/*left side: saved*/}
        <nav className="flex-1"></nav>
        <Link to="/saved" className="text-gray-700 hover:text-gray-900 font-medium">
          Saved
        </Link>

        {/*middle: logo, no nav just div*/}
        <div className="flex-1 text-center"></div>
        <Link to="/" className="text-2xl font-serif font-bold text-gray-800">
          GrowMate
        </Link>

        {/*right side both nav: Create | Account*/}
        <nav className="flex-1 text-right space-x-6 relative"></nav>

        {/*right: create*/}
        <nav className="create"></nav> 
        <Link to="/create" className="text-gray-700 hover:text-gray-900 font-medium">
          Create
        </Link>

        {/* right: button for account, only a panel*/}
        <button  onClick={() => setIsPanelOpen(!isPanelOpen)} 
            className="text-gray-700 hover:text-gray-900 font-medium focus:outline-none">
            Account
        </button>

          {isPanelOpen && (
            // account panel and example for content
            <div className="absolute top-10 right-0 w-64 bg-white shadow-lg border border-gray-100 rounded-lg p-4">
              <p className="font-semibold mb-2">UsersloggedIn</p> 
              <button 
                // example for logout logic
                className="w-full text-left text-sm text-red-500 hover:text-red-700"
                onClick={() => {
                  // logout logic here
                  setIsPanelOpen(false); // closing panel after logout
                }}
              >
                Logout
              </button>
            </div>
          )}

      </div>
    </header>
  );
};

/** Nav for header and create, div for logo
 *  this file is imported in Layout.jsx
 */
