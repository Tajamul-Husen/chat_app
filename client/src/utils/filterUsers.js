const filterUsers = (arr, val) => {
  return arr.filter((item) =>
    item.userName.toLowerCase().includes(val.toLowerCase())
  );
};

export default filterUsers;
