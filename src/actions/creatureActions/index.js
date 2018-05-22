export function createCreature(id, payload) {
    return {
        type: 'CREATE_CREATURE',
        id: id,
        payload: payload
    }
}

export function updateCreature(id, payload) {
    return {
        type: 'UPDATE_CREATURE',
        id: id,
        payload: payload
    }
}

export function deleteCreature(id) {
    return {
        type: 'DELETE_CREATURE',
        id: id
    }
}
