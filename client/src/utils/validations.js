export const loginValidate = (name) => {
  let err = "";
  if (name.length < 3) {
    err = "Username must be atleast 3 characters long";
  } else if (name.length > 15) {
    err = "Username must be atmost 15 characters long";
  }
  return err;
};

export const messageValidate = (msg) => {
  if (msg === "" || /^\s*$/.test(msg)) {
    return false;
  }
  return true;
};
