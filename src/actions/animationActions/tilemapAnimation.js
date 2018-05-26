// import { assetManager } from '../../singletons/AssetManager'

const actions = {
  UPDATE_ANIMATED_TILES: 'UPDATE_ANIMATED_TILES',
  INITIALIZE_ANIMATED_TILES: 'INITIALIZE_ANIMATED_TILES',

  updateAnimatedTiles: () => {
    return {
      type: 'UPDATE_ANIMATED_TILES',
      payload: 'stuff'
    };
  },

  initializaAnimatedTiles: () => {
    return {
      type: 'INITIALIZE_ANIMATED_TILES',
      payload: null
    };
  },

}

export default actions
