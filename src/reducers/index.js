import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import assetReducer from './assetReducer';


//Add the the other reducer strutures
export default combineReducers({
    router: routerReducer,
    assetState: assetReducer
})
