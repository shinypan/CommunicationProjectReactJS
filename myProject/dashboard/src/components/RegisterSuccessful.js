import { Link } from "react-router-dom";

/**
 * Register component.
 * Used to render the Registration page
 * @type {React.FC}
 * @returns {React.ReactElement}
 */

const RegisterSuccessful = () => {
  return (
    <>
       <div className="container mt-5 col-md-6 col-xxl-9">
        <h1> Registration Successful </h1><br/> Thank you for your registration
        <br/><br/>
        <Link to="/login" className="btn btn-sm btn-link mx-2">
          Please login
        </Link>
        <br/><br/>
        <Link to="/register" className="btn btn-sm btn-link mx-2">
          Register New User?
        </Link>
      </div>
    </>
  );
}

export default RegisterSuccessful;
