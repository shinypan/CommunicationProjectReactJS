import React from "react";
import { Link } from "react-router-dom";

/**
 * Welcome component.
 * Used to render the options to either Login or Register
 * @type {React.Component}
 * @returns {React.ReactElement}
 */

class Welcome extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        <div className="container mt-5">
          <h2 className="text-center">Welcome to users module</h2>
          <div class="text-center">
            <p>
              <strong>Existing Users</strong>
            </p>
            <Link className="btn btn-primary" to="/login">
              Login
            </Link>
          </div>
          <p />
          <div class="text-center">
            <p>
              <strong>New Users</strong>
            </p>
            <Link className="btn btn-primary" to="/register">
              Register
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default Welcome;
