import { combineReducers } from 'redux';

function tilesetJSONLocation(state = '/static/assets/custom/exports/base_tile_set.json', action) {
    switch (action.type) {
        case 'TILESET_JSON_LOCATION':
            return action.payload;

        default:
            return state;
    }
}

function tilesetSpritesheetLocation(state = '/static/assets/custom/exports/base_tile_sheet.png', action) {
    switch (action.type) {
        case 'TILESET_SPRITESHEET_LOCATION':
            return action.payload;
        default:
            return state;
    }
}

function tilemapJSONLocation(state = '/static/assets/custom/exports/base_tile_map.json', action) {
    switch (action.type) {
        case 'TILEMAP_FILE_LOCATION':
            return action.payload;

        default:
            return state;
    }
}

export default combineReducers({
    tilesetJSONLocation,
    tilesetSpritesheetLocation,
    tilemapJSONLocation,
});
