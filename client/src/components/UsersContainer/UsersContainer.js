import React, { useContext, useEffect, useState } from "react";
import FindUsers from "./FindUsers";
import UsersBoxContainer from "./UsersBoxContainer";
import "./UsersContainer.scss";
import { SocketContext } from "../../contexts/socketContext";
import filterUsers from "../../utils/filterUsers";

let value = "";

function UsersContainer() {
  const { socket } = useContext(SocketContext);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.on("users-list", (data) => {
      if (value.length !== 0) {
        setFilteredUsers(filterUsers(data, value));
        setLoading(false);
      } else {
        setFilteredUsers(null);
        setLoading(false);
      }
    });
    return () => {
      socket.off();
    };
  }, [socket]);

  const keyHandle = (e) => {
    value = e.target.value;
    setLoading(true);
    socket.emit("get-users", socket.id);
  };

  return (
    <div className="users-container">
      <FindUsers
        onkeyup={keyHandle}
        loading={loading}
      ></FindUsers>
      <UsersBoxContainer filteredUsers={filteredUsers}></UsersBoxContainer>
    </div>
  );
}

export default UsersContainer;
