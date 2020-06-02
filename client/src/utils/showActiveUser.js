const activeUser = (elem, activeClass) => {
  let child = elem.parentElement.children;
  for (let i = 0; i < child.length; i++) {
    child[i].classList.remove(activeClass);
  }
  elem.classList.add(activeClass);
};

export default activeUser;
