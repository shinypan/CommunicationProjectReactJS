import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserData from "../data/UserData";

/**
 * Edit user  component.
 * Used to edit user name or email
 * @type {React.FC}
 * @returns {React.ReactElement}
 */

const EditUser = () => {
  let { id } = useParams();
  const user = UserData.findUserById({ id });
  const navigate = useNavigate();

  //To persist updated user information in local storage
  const handleEditUser = (event) => {
    debugger;
    event.preventDefault(); // stop page refresh
    const fullname = event.target.elements.fullname.value;
    const email = event.target.elements.email.value;
    const id = parseInt(event.target.elements.id.value);

    let storedUsers = UserData.getUsersList();
    const updatedUsers = storedUsers.map((u) => {
      if (u.id === id) {
        u.fullname = fullname;
        u.email = email;
      }
      return u;
    });
    UserData.saveUsers(updatedUsers);
    alert("User " + fullname + " has been updated successfully");
    navigate("/users");
  };

  //To cancel edit and move to User list page
  const handleCancel = (event) => {
    event.preventDefault(); // stop page refresh
    navigate("/users");
  };

  return (
    <>
      <form className="col-xxl-6" onSubmit={handleEditUser}>
        <h1>Edit User Information</h1>

        <div class="container">
          <div>
            Fullname:{" "}
            <input
              className="form-control"
              type="text"
              name="fullname"
              defaultValue={user.fullname}
            />
          </div>
          <div>
            Email:{" "}
            <input
              className="form-control"
              type="email"
              name="email"
              defaultValue={user.email}
            />
            <input
              className="form-control"
              type="hidden"
              name="id"
              defaultValue={user.id}
            />
          </div>
          <div>
            <input
              type="submit"
              className="btn btn-primary"
              value="Save"
              key={user.id}
            />
            &nbsp;
            <input
              type="button"
              className="btn btn-secondary"
              value="Cancel"
              onClick={handleCancel}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default EditUser;
