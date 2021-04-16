function modalReducer(state = { state: false, name: "", counter: "" }, action) {
  switch (action.type) {
    case "SHOWMODAL":
      return { ...action.payload, state: true };
    case "HIDEMODAL":
      return { state: false, name: "", counter: "" };
    default:
      return state;
  }
}

export default modalReducer;
