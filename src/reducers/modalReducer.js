function modalReducer(state = false, action) {
  switch (action.type) {
    case "SHOWMODAL":
      return true;
    case "HIDEMODAL":
      return false;
    default:
      return state;
  }
}

export default modalReducer;
