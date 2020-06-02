import React, { createContext, useState } from "react";

export const UserProfileContext = createContext();

export const UserProfileContextProvider = (props) => {
  const [userProfile, setUserProfile] = useState({});

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {props.children}
    </UserProfileContext.Provider>
  );
};

