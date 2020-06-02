import React from "react";
import "./FindUsers.scss";

function FindUsers({ onkeyup, loading }) {
  return (
    <div className="find-users">
      <input
        type="text"
        name="all-users"
        className="get-users-status"
        placeholder="Find friends..."
        onKeyUp={(e) => onkeyup(e)}
      />
      {loading && <p className="loader"></p>}
    </div>
  );
}

export default FindUsers;
