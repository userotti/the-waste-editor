import { combineReducers } from 'redux';

import fileLocationReducer from './fileLocationReducer';


function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

function tiledDataReducer(state = {
  tilesetJSON: null,
  tilemapJSON: null,
  animationData: {
    timeOfInitialization: null,
    animatedTilesInTileset: null
  }
}, action) {

  switch (action.type) {
    case 'LOAD_TILESET_JSON_SUCCESS':
    return Object.assign({ ...state, tilesetJSON: action.payload});

    case 'LOAD_TILEMAP_JSON_SUCCESS':
    return Object.assign({
      ...state,
      tilemapJSON: action.payload,
      tilemapTileLayersJSON: cleanArray(action.payload.layers.map((layer)=>{
        if (layer.data){
          return {
            name: layer.name
          }
        }
        return null
      }))
    });

    case 'INITIALIZE_ANIMATED_TILES':

    const animationData = {
      timeOfInitialization: action.payload,
      animatedTilesInTileset: []
    }

    animationData.animatedTilesInTileset = Object.assign({}, state.tilesetJSON.tiles);

    for (var tileId in animationData.animatedTilesInTileset) {
        if (animationData.animatedTilesInTileset.hasOwnProperty(tileId)) {


            let tile = Object.assign({}, animationData.animatedTilesInTileset[tileId]);
            tile.mapId = parseInt(tileId) + 1;
            tile.animation = tile.animation.map((frame)=>{
              return Object.assign({
                mapId: frame.tileid + 1
              }, frame)
            })

            tile.mapLayers = {};

            for (let layer of state.tilemapJSON.layers){
              if (layer.data && layer.data.indexOf(tile.mapId) > 0){
                tile.mapLayers[layer.name] = getAllIndexes(layer.data, tile.mapId)
              }
            }
            // tile.mapLayers = cleanArray(state.tilemapJSON.layers.map((layer)=>{
            //
            //   if (layer.data && layer.data.indexOf(tile.mapId) > 0){
            //     return {
            //       layerName: layer.name,
            //       positionsInLayerData: getAllIndexes(layer.data, tile.mapId)
            //     };
            //   }
            //   return null;
            // }))
            tile.currentFrameIndex = 0;
            tile.lastTimeUpdated = action.payload;

            animationData.animatedTilesInTileset[tileId] = tile;

        }
    }

    console.log("animationData: ",  animationData);
    return Object.assign({ ...state, animationData: animationData});

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
