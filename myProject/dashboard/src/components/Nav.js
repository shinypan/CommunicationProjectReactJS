import { useNavigate, Link, Outlet } from "react-router-dom";
import UserData from "../data/UserData";

/**
 * Navigation component.
 * Used to render the Navigation bar
 * @type {React.FC}
 * @returns {React.ReactElement}
 */

const Nav = () => {
  const navigate = useNavigate();

  //Invoked when user clicks on Log Out tab, clears user details from Session storage
  const logout = () => {
    UserData.clearSession();
    navigate("/welcome");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Dashboard
          </Link>
      
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="nav nav-pillsclassName">
              <li className="nav-item">
                <Link className="nav-link" to="/welcome">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/chats">
                  Group Chat
                </Link>
              </li>
              <li className="nav-item active">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/users"
                >
                  Manage Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/documents">
                  Manage Documents
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={logout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default Nav;
