/**
 * User data component.
 * Used to contain User CRUD operations
 * @type {React.FC}
 */

const UserData = (() => {
  //Retrieve all registered users from local storage
  const getUsers = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };

  //Retrieve logged in user details from session storage
  const getSessionUser = () => {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  return {
    //Retrieve all registered users from local storage
    getUsersList: () => {
      return getUsers();
    },

    //Save details of the user to local storage
    saveUser: (user) => {
      const users = getUsers();
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
    },

    //Retrieve user from local storage by email and password
    findUser: (email, password) => {
      debugger;
      const users = getUsers();
      return users.find(
        (user) => user.email === email && user.password === password
      );
    },

    //Retrieve user from local storage by user Id
    findUserById: (selId) => {
      let users = getUsers();
      debugger;
      return users.find((user) => user.id === parseInt(selId.id));
    },

    //Save details of logged in user to session storage
    saveUserToSession: (user) => {
      sessionStorage.setItem("user", JSON.stringify(user));
    },

    //Return true if the user has logged in
    isUserLoggedIn: () => {
      const user = getSessionUser();
      debugger;
      return user === null ? false : true;
    },

    //Retrieve logged in user details from session storage
    getUserFromSession: () => {
      return getSessionUser();
    },

    //Clear logged in user from session storage
    clearSession: () => {
      sessionStorage.removeItem("user");
    },

    //Delete selected user by Id from local storage
    deleteUser: (id) => {
      let users = getUsers();
      users = users.filter((user) => user.id != id);
      localStorage.setItem("users", JSON.stringify(users));
    },

    //Push all users to local storage
    saveUsers: (users) => {
      localStorage.setItem("users", JSON.stringify(users));
    },
  };
})();

export default UserData;
