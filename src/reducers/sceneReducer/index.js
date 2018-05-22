import { combineReducers } from 'redux';
import creatureReducer from './creatureReducer';

//Add the the other reducer strutures
export default combineReducers({
    creatures: creatureReducer
})
