import { combineReducers } from 'redux';

function tilesetJSONLocation(state = '/static/assets/playplay/overworld/exports/tileset.json', action) {
    switch (action.type) {
        case 'TILESET_JSON_LOCATION':
            return action.payload;

        default:
            return state;
    }
}

function tilesetSpritesheetLocation(state = '/static/assets/playplay/overworld/exports/spritesheet.png', action) {
    switch (action.type) {
        case 'TILESET_SPRITESHEET_LOCATION':
            return action.payload;
        default:
            return state;
    }
}

function tilemapJSONLocation(state = '/static/assets/playplay/overworld/exports/map.json', action) {
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
