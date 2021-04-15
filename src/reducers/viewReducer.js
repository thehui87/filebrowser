function viewReducer(state = "list", action) {
  switch (action.type) {
    case "GRIDVIEW":
      return "grid";
    case "LISTVIEW":
      return "list";
    default:
      return state;
  }
}

export default viewReducer;
