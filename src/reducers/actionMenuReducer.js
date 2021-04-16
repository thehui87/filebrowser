function actionMenuReducer(state = true, action) {
  switch (action.type) {
    case "EDITMODE":
      return false;
    case "VIEWMODE":
      return true;
    default:
      return state;
  }
}

export default actionMenuReducer;
