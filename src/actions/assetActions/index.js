import { spritesheetManager } from '../../singletons/SpritesheetManager'

export function setTilesetFileLocation(payload) {
    return {
        type: 'TILESET_FILE_LOCATION',
        payload: payload
    };
}

export function setSpritesheetFileLocation(payload) {
    return {
        type: 'SPRITESHEET_FILE_LOCATION',
        payload: payload
    };
}

export function setMapFileLocation(payload) {
    return {
        type: 'MAP_FILE_LOCATION',
        payload: payload
    };
}


export function tilesetHasErrored(bool) {
    return {
        type: 'TILESET_HAS_ERRORED',
        hasErrored: bool
    };
}

export function tilesetLoaded(bool) {
    return {
        type: 'TILESET_LOADED',
        payload: bool
    };
}


export function tilesetIsLoading(bool) {
    return {
        type: 'TILESET_IS_LOADING',
        isLoading: bool
    };
}

export function tilesetFetchDataSuccess(tileset) {
    return {
        type: 'TILESET_FETCH_DATA_SUCCESS',
        loaded: true,
        tileset

    };
}

export function tilesetFetchData(url) {

    return (dispatch) => {

        dispatch(tilesetIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(tilesetIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((tileset) => dispatch(tilesetFetchDataSuccess(tileset)))
            .catch(() => dispatch(tilesetHasErrored(true)));
    };
}

export function mapHasErrored(bool) {
    return {
        type: 'MAP_HAS_ERRORED',
        hasErrored: bool
    };
}

export function mapIsLoading(bool) {
    return {
        type: 'MAP_IS_LOADING',
        isLoading: bool
    };
}

export function mapLoaded(bool) {
    return {
        type: 'MAP_LOADED',
        payload: bool
    };
}

export function mapFetchDataSuccess(map) {
    return {
        type: 'MAP_FETCH_DATA_SUCCESS',
        loaded: true,
        map
    };
}

export function mapFetchData(url) {
    return (dispatch) => {
        dispatch(mapIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(mapIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((map) => dispatch(mapFetchDataSuccess(map)))
            .catch(() => dispatch(mapHasErrored(true)));
    };
}


export function spritesheetHasErrored(bool) {
    return {
        type: 'SPRITESHEET_HAS_ERRORED',
        hasErrored: bool
    };
}

export function spritesheetIsLoading(bool) {
    return {
        type: 'SPRITESHEET_IS_LOADING',
        isLoading: bool
    };
}

export function spritesheetFetchDataSuccess() {
    return {
        type: 'SPRITESHEET_FETCH_DATA_SUCCESS',
        loaded: true
    };
}

export function spritesheetLoaded(bool) {
    return {
        type: 'SPRITESHEET_LOADED',
        payload: bool
    };
}

export function spritesheetFetchData(url) {

    return (dispatch) => {
        dispatch(spritesheetIsLoading(true));
        spritesheetManager.loadSpritesheet(url).then(()=>{
            dispatch(spritesheetFetchDataSuccess());
        }).catch(()=>{
            dispatch(spritesheetHasErrored(true));
        });
    }
}
