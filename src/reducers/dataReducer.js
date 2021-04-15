function dataReducer(state = [], action) {
  switch (action.type) {
    case "INCREMENT":
      return action.payload;
    case "CRUMBDECREMENT":
      return action.payload;
    case "NEWFOLDER":
      return action.payload;
    case "LOADDATA":
      return action.payload;
    case "GOFORWARD":
      return action.payload;
    case "GOBACKWARD":
      return action.payload;
    case "DELETEITEM":
      return action.payload;
    default:
      return state;
  }
}

export default dataReducer;
