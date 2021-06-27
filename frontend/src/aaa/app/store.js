
import allReducers from "./reducers/allReducer";
import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    allReducers,
    composeWithDevTools(
      )
   
)

export default store