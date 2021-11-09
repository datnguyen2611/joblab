import { NavLink } from "react-router-dom";
import "./Navbar.scss";
const ListItemsNav = () => {
  return (
    <div className="navbar-clickable-options-container-left show-only-on-large">
      <NavLink to="/faq" className="nav-link-item">
        <span className="nav-text">FAQ</span>
      </NavLink>
      <NavLink to="/faq" className="nav-link-item">
        <span className="nav-text">FAQ</span>
      </NavLink>
      <NavLink to="/faq" className="nav-link-item">
        <span className="nav-text">FAQ</span>
      </NavLink>
      <NavLink to="/faq" className="nav-link-item">
        <span className="nav-text">FAQ</span>
      </NavLink>
    </div>
  );
};
export default ListItemsNav;
