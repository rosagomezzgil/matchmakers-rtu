import { Outlet } from "react-router-dom";

const Header = () => (
  <header>
    <div class name="header bar">
        <nav class name="saved"></nav>
        <Link to="/saved" className="saved">Saved</Link>

        <div class name="logo"></div>
        <Link to="/" className="logo">GrowMate</Link>
        
        <nav class name="create"></nav>
        <Link to="/create" className="create">Create</Link>
      
    </div>
  </header>
);

/** Nav for header and create, div for logo
 *  this file is imported in Layout.jsx
 */
