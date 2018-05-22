import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import testReducer from './testReducer';
import sceneReducer from './sceneReducer';
import assetReducer from './assetReducer';
import socketReducer from './socketReducer';


//Add the the other reducer strutures
export default combineReducers({
    router: routerReducer,
    assetState: assetReducer,
    testState: testReducer,
    sceneState: sceneReducer,
    socketState: socketReducer
})
