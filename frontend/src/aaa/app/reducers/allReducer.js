import { combineReducers } from "redux";
import appState from "./appReducer"
import {handleQuestion} from "./respostaReducer"

const  allReducers = combineReducers({
    appState,
    handleQuestion
})

export default allReducers 