import { combineReducers } from 'redux';

import fileLocationReducer from './fileLocationReducer';
// import tilesetReducer from './tilesetReducer';
// import spritesheetReducer from './spritesheetReducer';
// import mapReducer from './mapReducer';

function tilesetJSONReducer(state = null, action){
  switch (action.type) {
      case 'LOAD_TILESET_JSON_SUCCESS':
      return action.payload;

      default:
      return state;
  }
}

function tilesetImageLoadedReducer(state = false, action){
  switch (action.type) {
      case 'LOAD_TILESET_SPRITESHEET_SUCCESS':
      return true;
      default:
      return state;
  }
}

function tilemapJSONReducer(state = null, action){
  switch (action.type) {
      case 'LOAD_TILEMAP_JSON_SUCCESS':
      return action.payload;

      default:
      return state;
  }
}

function allAssetsLoadedReducer(state = false, action){
  switch (action.type) {
      case 'ALL_ASSETS_LOADED':
      return action.payload;

      default:
      return state;
  }
}

export default combineReducers({
    fileLocations: fileLocationReducer,
    tilesetJSON: tilesetJSONReducer,
    tilesetImageLoaded: tilesetImageLoadedReducer,
    tilemapJSON: tilemapJSONReducer,
    allAssetsLoaded: allAssetsLoadedReducer
});
