import React, { createContext, useReducer } from "react";
import { usersListReducer } from "../reducers/usersListReducers";

export const UsersListContext = createContext();

export const UsersListContextProvider = (props) => {
  const [usersList, dispatchUsers] = useReducer(usersListReducer,[]);
  return (
    <UsersListContext.Provider value={{ usersList, dispatchUsers }}>
      {props.children}
    </UsersListContext.Provider>
  );
};
