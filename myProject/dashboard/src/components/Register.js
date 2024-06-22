import React from "react";
import { Navigate, Link } from "react-router-dom";
import Nav from "./Nav";
import UserData from "../data/UserData";

/**
 * Register component.
 * Used to render the Registration page
 * @type {React.Component}
 * @returns {React.ReactElement}
 */

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerSuccess: false,
      users: UserData.getUsersList(),
      errors: {
        fullname: "",
        email: "",
        password: "",
        confirmpassword: "",
      },
    };
  }

  //To perform input validations for email and password
  changeHandler = (event) => {
    let name = event.target.name; // password, email
    let value = event.target.value; // password value, email value
    let errors = this.state.errors;

    switch (name) {
      case "email":
        var validRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        errors.email = value.match(validRegex) ? "" : "Email must be valid";

        break;

      case "password":
        errors.password =
          value.length < 5 ? "Password must be 8 characters in length" : "";
        break;

      case "confirmpassword":
        errors.confirmpassword =
          value.length < 5 ? "Password must be 8 characters in length" : "";
        break;
    }
    this.setState({ errors, [name]: value });
  };

  //To save user in local storage
  handleSubmit = (event) => {
    event.preventDefault(); // stop page refresh
    const fullname = event.target.elements.fullname.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    let users = this.state.users;

    debugger;
    let newUser = {
      id: users.length + 1,
      fullname: fullname,
      email: email,
      password: password,
    };
    UserData.saveUser(newUser);

    this.setState({
      registerSuccess: true,
    });
  };

  render() {
    <Nav />;
    const { registerSuccess } = this.state;
    const { errors } = this.state;

    if (registerSuccess) {
      return <Navigate to="/registerSuccessful" />;
    }

    return (
      <div className="container mt-5 col-md-6 col-xxl-9">
        <h1 className="text-center">Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            Fullname:{" "}
            <input
              type="text"
              name="fullname"
              className="form-control"
              placeholder="Enter Full Name"
              onChange={this.changeHandler}
            />
            <p className="error-message">{errors.fullname}</p>
          </div>
          <div>
            Email:
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              onChange={this.changeHandler}
            />
            <p className="error-message">{errors.email}</p>
          </div>
          <div>
            Password:{" "}
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              onChange={this.changeHandler}
            />
            <p className="error-message">{errors.password}</p>
          </div>
          <div>
            Confirm Password:{" "}
            <input
              type="password"
              name="confirmpassword"
              className="form-control"
              placeholder="Enter Confirm Password"
              onChange={this.changeHandler}
            />
            <p className="error-message">{errors.confirmpassword}</p>
          </div>
          <div>
            <input
              type="submit"
              className="btn btn-primary mt-2"
              value="Register"
            />

            <Link to="/login" className="btn btn-sm btn-link mx-2">
              Already Registered? Please login
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
