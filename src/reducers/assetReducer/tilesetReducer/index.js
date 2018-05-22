import { combineReducers } from 'redux';

function tilesetHasErrored(state = false, action) {
    switch (action.type) {
        case 'TILESET_HAS_ERRORED':
        return action.hasErrored;

        default:
        return state;
    }
}

function tilesetIsLoading(state = false, action) {
    switch (action.type) {
        case 'TILESET_IS_LOADING':
        return action.isLoading;

        default:
        return state;
    }
}

function tileset(state = null, action) {
    switch (action.type) {
        case 'TILESET_FETCH_DATA_SUCCESS':
        return action.tileset;

        default:
        return state;
    }
}

function tilesetLoaded(state = false, action) {
    switch (action.type) {
        case 'TILESET_FETCH_DATA_SUCCESS':
        return true;
        case 'TILESET_LOADED':
        return action.payload;

        default:
        return state;
    }
}

export default combineReducers({
    tilesetHasErrored,
    tilesetIsLoading,
    tileset,
    tilesetLoaded
});
