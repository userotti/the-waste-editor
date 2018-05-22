import { combineReducers } from 'redux';

function spritesheetHasErrored(state = false, action) {
    switch (action.type) {
        case 'SPRITESHEET_HAS_ERRORED':
        return action.hasErrored;

        default:
        return state;
    }
}

function spritesheetIsLoading(state = false, action) {
    switch (action.type) {
        case 'SPRITESHEET_IS_LOADING':
        return action.isLoading;

        default:
        return state;
    }
}

function spritesheetLoaded(state = false, action) {
    switch (action.type) {
        case 'SPRITESHEET_FETCH_DATA_SUCCESS':
        return true;
        case 'SPRITESHEET_LOADED':
        return action.payload;
        default:
        return state;
    }
}

export default combineReducers({
    spritesheetHasErrored,
    spritesheetIsLoading,
    spritesheetLoaded
});
