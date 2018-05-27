// import { assetManager } from '../../singletons/AssetManager'

const actions = {
  UPDATE_ANIMATED_TILES: 'UPDATE_ANIMATED_TILES',
  INITIALIZE_ANIMATED_TILES: 'INITIALIZE_ANIMATED_TILES',

  initializaAnimatedTiles: (_timeOfInitialization) => {
    return {
      type: 'INITIALIZE_ANIMATED_TILES',
      payload: _timeOfInitialization
    };
  },

  updateAnimatedTiles: (_tiles) => {
    return {
      type: 'UPDATE_ANIMATED_TILES',
      payload: _tiles
    };
  },

}

export default actions
