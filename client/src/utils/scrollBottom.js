const scrollToBottom = (elem) => {
  if (elem) {
    elem.scrollTop = elem.scrollHeight;
  }
};

export default scrollToBottom;