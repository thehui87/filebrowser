function breadcrumbReducer(state = [], action) {
  switch (action.type) {
    case "ADDCRUMB":
      return state;
    case "REMOVECRUMB":
      return state;
    default:
      return state;
  }
}

export default breadcrumbReducer;
