import React from "react";

import Welcome from "./components/Welcome";
import Nav from "./components/Nav";
import Login from "./components/Login";
import LoginSuccessful from "./components/LoginSuccessful";
import Register from "./components/Register";
import RegisterSuccessful from "./components/RegisterSuccessful";
import GroupChat from "./components/GroupChat";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import DocumentList from "./components/DocumentList";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";

/**
 * Main component.
 *
 * @type {React.Component}
 * @returns {React.ReactElement} Main
 */

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />}>
            <Route path="loginSuccessful" element={<LoginSuccessful />} />
            <Route path="chats" element={<GroupChat />} />
            <Route path="users" element={<UserList />} />
            <Route path="documents" element={<DocumentList />} />
            <Route path="logout" element={<Welcome />} />
            <Route path="/editUser/:id" element={<EditUser />} />
          </Route>

          <Route path="welcome" element={<Welcome />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="registerSuccessful" element={<RegisterSuccessful />} />
          <Route path="*" element={<Welcome />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
