import React, { useContext } from "react";
import UserBox from "./UserBox";
import { UsersListContext } from "../../contexts/usersListContext";
import "./UsersBoxContainer.scss";

function UsersBoxContainer({ filteredUsers }) {
  const { usersList } = useContext(UsersListContext);

  const data = filteredUsers ? (
    filteredUsers.length !== 0 ? (
      filteredUsers.map((user) => {
        return <UserBox key={user.id} user={user}></UserBox>;
      })
    ) : (
      <div className="not-found">No user found...</div>
    )
  ) : usersList.length === 0 ? (
    <div className="not-found">No friends...</div>
  ) : (
    usersList.map((user) => {
      return <UserBox key={user.id} user={user}></UserBox>;
    })
  );

  return <div className="users-box-container">{data}</div>;
}

export default UsersBoxContainer;
