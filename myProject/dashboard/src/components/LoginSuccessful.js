import UserData from "../data/UserData";

/**
 * Login Success component.
 * Used to display successful User Login page
 * @type {React.FC}
 * @returns {React.ReactElement}
 */

const LoginSuccessful = () => {
  const user = UserData.getUserFromSession();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <h1 className="card-title">Login Successful</h1>
        <div className="container mt-5">
          <div className="card-body">
            <h5 className="card-title">Welcome!</h5>
            <br />
            <p className="card-text">
              <strong>{user.fullname}</strong>
              <br />
              <em>{user.email}</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSuccessful;
