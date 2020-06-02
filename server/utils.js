function filterUser(arr, id) {
  return arr.filter((item) => item.id !== id);
}

function getReceiverInfo(arr, id) {
  return arr.find((item) => item.id === id);
}

function existingUser(name, users) {
  return users.find((user) => user.userName === name);
}

module.exports = {
  filterUser,
  getReceiverInfo,
  existingUser,
};
