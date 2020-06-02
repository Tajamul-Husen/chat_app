import React, { useState, useContext, useEffect } from "react";
import "./LogIn.scss";

import { ReactComponent as Icon } from "../../assets/icon/chatAppIcon.svg";

import io from "socket.io-client";
import { useHistory } from "react-router-dom";

import { SocketContext } from "../../contexts/socketContext";
import { ClientProfileContext } from "../../contexts/clientProfileContext";
import useConnection from "../../hooks/useConnection";
import { loginValidate } from "../../utils/validations";

const endPoint = "https://connect-cord.herokuapp.com/";
// const endPoint = "localhost:5000";
const socket = io(endPoint);

function LogIn() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { setSocket } = useContext(SocketContext);
  const { setClientProfile } = useContext(ClientProfileContext);
  const history = useHistory();
  const { connection } = useConnection(socket);

  useEffect(() => {
    let timeOut;

    socket.on("user-connected", (data) => {
      setClientProfile(data);
      timeOut = setTimeout(() => {
        setUserName("");
        setLoading(false);
        history.push("/chat");
      }, 2000);
    });

    return () => {
      clearTimeout(timeOut);
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("user-exists", (name) => {
      setLoading(false);
      setErr(`username ${name} already taken...`);
    });

    return () => {
      socket.off();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validate = loginValidate(userName);
    if (validate) {
      setErr(validate);
      return;
    }

    setErr("");
    setLoading(true);
    setSocket(socket);
    socket.emit("new-user", userName);
  };

  return connection ? (
    <div className="connection-lost">Connection lost to the server...</div>
  ) : (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-container-header">
          <Icon className="chat-logo-icon"></Icon>
          <h2 className="login-container-header-title">ConnectCord</h2>
          <p className="login-container-header-content">
            chat with your friends
          </p>
        </div>
        <div className="login-container-form">
          <form
            onSubmit={handleSubmit}
            className="login-container-form-control"
          >
            <input
              type="text"
              className="login-container-form-control-input input"
              name="name"
              placeholder="Enter Username"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              required
              disabled={loading && true}
            />
            {err && <p className="login-container-form-control-err">{err}</p>}
            <button
              type="submit"
              className="login-container-form-control-btn btn"
              disabled={loading && true}
            >
              Join
            </button>
          </form>
          {loading ? <p className="loader"></p> : null}
        </div>
      </div>
    </div>
  );
}

export default LogIn;
