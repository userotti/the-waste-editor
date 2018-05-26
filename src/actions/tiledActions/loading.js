import { assetManager } from '../../singletons/AssetManager'

const actions = {
  LOAD_TILESET_JSON_SUCCESS: 'LOAD_TILESET_JSON_SUCCESS',
  LOAD_TILESET_SPRITESHEET_SUCCESS: 'LOAD_TILESET_SPRITESHEET_SUCCESS',
  LOAD_TILEMAP_JSON_SUCCESS: 'LOAD_TILEMAP_JSON_SUCCESS',
  ALL_ASSETS_LOADED: 'ALL_ASSETS_LOADED',

  allTiledAssetsLoaded: () => {
    return {
      type: 'ALL_ASSETS_LOADED',
      payload: true
    };
  },

  loadTilesetJSONSuccess: (tileset) => {
    return {
      type: 'LOAD_TILESET_JSON_SUCCESS',
      payload: tileset
    };
  },

  loadTilemapJSONSuccess: (map) => {
    return {
      type: 'LOAD_TILEMAP_JSON_SUCCESS',
      payload: map
    };
  },

  loadTilesetSpritesheetSuccess: () => {
    return {
      type: 'LOAD_TILESET_SPRITESHEET_SUCCESS',
      payload: true
    };
  },

  loadTilesetJSON: (url) => {
    return (dispatch) => {
      fetch(url)
      .then((response) => {

        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then((response) => response.json())
      .then((tileset) => dispatch(actions.loadTilesetJSONSuccess(tileset)))

    };
  },

  loadTilemapJSON: (url) => {
    return (dispatch) => {
      fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        console.log("loadTilemapJSON response: ", response);

        return response;
      })
      .then((response) => response.json())
      .then((tilemap) => dispatch(actions.loadTilemapJSONSuccess(tilemap)))
    };
  },

  loadTilesetSpritesheet: (url) => {
    return (dispatch) => {
      return Promise.all([
        assetManager.loadTilesetSpritesheetImage(url),
        assetManager.loadThreeJSTilesetTexture(url)
      ]).then(()=>{
        dispatch(actions.loadTilesetSpritesheetSuccess());
      })
    }
  }
}

export default actions
