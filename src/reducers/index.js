import counterReducer from "./counterReducer";
import viewReducer from "./viewReducer";
import dataReducer from "./dataReducer";
import activeReducer from "./activeReducer";
import breadcrumbReducer from "./breadcrumbReducer";
import modalReducer from "./modalReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  counter: counterReducer,
  view: viewReducer,
  data: dataReducer,
  active: activeReducer,
  crumb: breadcrumbReducer,
  modalState: modalReducer,
});
export default allReducers;
