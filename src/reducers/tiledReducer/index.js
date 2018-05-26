import { combineReducers } from 'redux';

import fileLocationReducer from './fileLocationReducer';




function tiledDataReducer(state = {
  tilesetJSON: null,
  tilemapJSON: null,

}, action) {

  console.log("action.type:", action.type);
  console.log("action.payload:", action.payload);


  switch (action.type) {
    case 'LOAD_TILESET_JSON_SUCCESS':
    return Object.assign({ ...state, tilesetJSON: action.payload});

    case 'LOAD_TILEMAP_JSON_SUCCESS':
    return Object.assign({ ...state, tilemapJSON: action.payload});

    default:
    return state
  }

};


function tilesetImageLoadedReducer(state = false, action){
  switch (action.type) {
    case 'LOAD_TILESET_SPRITESHEET_SUCCESS':
    return true;
    default:
    return state;
  }
}

function allTiledAssetsLoadedReducer(state = null, action){
  switch (action.type) {
    case 'ALL_ASSETS_LOADED':
    return action.payload;

    default:
    return state;
  }
}


export default combineReducers({
    fileLocations: fileLocationReducer,
    tilesetImageLoaded: tilesetImageLoadedReducer,
    tiledData: tiledDataReducer,
    allTiledAssetsLoaded: allTiledAssetsLoadedReducer
});
