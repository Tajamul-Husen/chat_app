export const chatListReducer = (state, action) => {
  switch (action.type) {
    case "INIT_CHAT":
      if (state[action.payload.chatId]) return state;
      return {
        ...state,
        [action.payload.chatId]: [],
      };
    case "ADD_MESSAGE":
      if (state[action.payload.chatId])
        return {
          ...state,
          [action.payload.chatId]: [
            ...state[action.payload.chatId],
            action.payload.message,
          ],
        };
      else
        return {
          ...state,
          [action.payload.chatId]: [action.payload.message],
        };
    default:
      return state;
  }
};


