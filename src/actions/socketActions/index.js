export function createNewGame(payload) {
    return {
        type: 'server/CREATE_NEW_GAME',
        payload: payload
    }
}

export function newUserLanded() {
    return {
        type: 'server/NEW_CLIENT_LANDED',
    }
}

export function initUser(payload) {
    return {
        type: 'server/INIT_USER',
    }
}
