import React from "react";
import { Link } from "react-router-dom";
import UserData from "../data/UserData";
import { Navigate } from "react-router-dom";

/**
 * UserList component.
 * Used to render the list of user with options to edit and delete
 * @type {React.Component}
 * @returns {React.ReactElement}
 */

export default class UserList extends React.Component {
  constructor() {
    super();

    this.state = {
      users: UserData.getUsersList(),
      isAuthenticated: UserData.isUserLoggedIn(),
      id: "",

      currentUser: UserData.getUserFromSession(),
    };
  }

  //To delete user from local storage
  deleteUser = () => {
    UserData.deleteUser(this.state.id);
    let users = UserData.getUsersList();
    this.setState({
      users: users,
    });
    var modal = document.getElementById("exampleModal");
    modal.style.display = "none";
  };

  render() {
    const { isAuthenticated } = this.state;
    const { currentUser } = this.state;
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return (
      <>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Confirm User Deletion
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body"> Are you Sure?</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.deleteUser}
                  data-bs-dismiss="modal"
                >
                  OK
                </button>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <form>
          <div class="mt-5 col-md-6 col-xxl-9 ">
            <h1 className="text-center">Users</h1>
            <div className="table-responsive">
              <table className="table table-striped table-border">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>User Email ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map((usr, index) => (
                    <tr key={index}>
                      <td>{usr.fullname}</td>
                      <td>{usr.email}</td>
                      <td>
                        <Link
                          className={`btn btn-link link-underline-secondary ${
                            usr.id === currentUser.id ? "disabled" : ""
                          }`}
                          to={`/editUser/${usr.id}`}
                        >
                          Edit
                        </Link>
                        |
                        <button
                          type="button"
                          className={`btn btn-link link-underline-secondary ${
                            usr.id === currentUser.id ? "disabled" : ""
                          }`}
                          onClick={() => this.setState({ id: usr.id })}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </>
    );
  }
}
