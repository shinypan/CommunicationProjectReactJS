import React from "react";
import UserData from "../data/UserData";
import { Navigate, Link } from "react-router-dom";

/**
 * Login component.
 * Used to authenticate user by email and password
 * @type {React.Component}
 * @returns {React.ReactElement}
 */

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginSuccess: false,
      invalidUser: false,
    };
  }

  //To handle user login by validating against users stored in local storage
  handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    const user = UserData.findUser(email, password);
    if (user !== undefined) {
      this.setState({
        loginSuccess: true,
      });
      UserData.saveUserToSession(user);
    } else {
      this.setState({
        invalidUser: true,
      });
    }
  };

  render() {
    const { loginSuccess } = this.state;
    const { invalidUser } = this.state;

    if (loginSuccess) {
      return <Navigate to="/loginSuccessful" />;
    }

    return (
      <>
        {invalidUser && (
          <div className="container mt-5 alert alert-danger" role="alert">
            Invalid user email or password. Please retry with correct
            credentials.
          </div>
        )}
 
        <div className="container mt-5 col-md-6 col-xxl-9">
          <h1 className="text-center">Login</h1>
          <form className="col-xxl-6" onSubmit={this.handleSubmit}>
            Enter Email:{" "}
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Enter Email"
            />
            Enter Password:{" "}
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
            />
            <input
              className="btn btn-primary m-2"
              type="submit"
              value="Login"
            />
            <Link to="/register" className="btn btn-sm btn-link mx-2">
              Not Registered? Please register
            </Link>
          </form>
        </div>
      </>
    );
  }
}
