export const usersListReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      const foundId = state.find((user) => user.id === action.payload.id);
      const foundName = state.findIndex(
        (user) => user.userName === action.payload.userName
      );
      if (!foundId) {
        if (foundName > -1) {
          const newState = [...state];
          newState.splice(foundName, 1);
          return [...newState, action.payload];
        } else {
          return [...state, action.payload];
        }
      } else return state;

    case "ADD_NOTIFICATION":
      return state.map((user) =>
        user.id === action.payload.id
          ? { ...user, unread: (user.unread += 1) }
          : user
      );

    case "REMOVE_NOTIFICATION":
      return state.map((user) =>
        user.id === action.payload.id ? { ...user, unread: 0 } : user
      );

    case "LAST_MESSAGE":
      return state.map((user) =>
        user.id === action.payload.id
          ? { ...user, lastMessage: action.payload.msg }
          : user
      );

    case "SET_USER_OFFLINE":
      return state.map((user) =>
        user.id === action.payload ? { ...user, online: false } : user
      );

    default:
      return state;
  }
};
