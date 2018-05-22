
const actions = {
  TILESET_FILE_LOCATION: 'TILESET_FILE_LOCATION',
  TILESET_SPRITESHEET_LOCATION: 'TILESET_SPRITESHEET_LOCATION',
  TILEMAP_FILE_LOCATION: 'TILEMAP_FILE_LOCATION',

  setTilesetJSONFileLocation: (location) => {
    return {
      type: 'TILESET_FILE_LOCATION',
      payload: location
    };
  },

  setTilesetSpritesheetFileLocation: (location) => {
    return {
      type: 'TILESET_SPRITESHEET_LOCATION',
      payload: location
    };
  },

  setTilemapJSONFileLocation: (location) => {
    return {
      type: 'TILEMAP_FILE_LOCATION',
      payload: location
    };
  },
}

export default actions
