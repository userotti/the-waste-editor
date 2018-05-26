import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import tiledReducer from './tiledReducer';


//Add the the other reducer strutures
export default combineReducers({
    router: routerReducer,
    tiledState: tiledReducer

})
