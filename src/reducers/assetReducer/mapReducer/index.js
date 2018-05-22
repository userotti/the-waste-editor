import { combineReducers } from 'redux';

function mapHasErrored(state = false, action) {
    switch (action.type) {
        case 'MAP_HAS_ERRORED':
        return action.hasErrored;

        default:
        return state;
    }
}

function mapIsLoading(state = false, action) {
    switch (action.type) {
        case 'MAP_IS_LOADING':
        return action.isLoading;

        default:
        return state;
    }
}

function map(state = [], action) {
    switch (action.type) {
        case 'MAP_FETCH_DATA_SUCCESS':
        return action.map;

        default:
        return state;
    }
}

function mapLoaded(state = false, action) {
    switch (action.type) {
        case 'MAP_FETCH_DATA_SUCCESS':
        return true;
        case 'MAP_LOADED':
        return action.payload;


        default:
        return state;
    }
}

export default combineReducers({
    mapHasErrored,
    mapIsLoading,
    map,
    mapLoaded
});
