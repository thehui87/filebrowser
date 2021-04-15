const initialState = {
  name: "",
  children: [],
};

function activeReducer(state = initialState, action) {
  switch (action.type) {
    case "ACTIVENAME":
      return { ...state, name: action.payload };
    case "ACTIVECHILDREN":
      return { ...state, children: action.payload };
    default:
      return state;
  }
}

export default activeReducer;
