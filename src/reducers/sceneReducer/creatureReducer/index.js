var creatureReducer = function(state={
    byId: [],
    byHash: {}
}, action) {

    switch(action.type){

        case 'CREATE_CREATURE': {
            return {
                byId: [ ...state.byId, action.id],
                byHash: {
                    ...state.byHash,
                    [action.id]: action.payload
                }
            }
        }

        case 'UPDATE_CREATURE': {
            state.byHash[action.id] = {
                ...state.byHash[action.id],
                ...action.payload
            }
            return {
                ...state
            }
        }

        case 'DELETE_CREATURE': {
            const prunedIds = state.byId.filter(item => {
                return item !== action.id // return all the items not matching the action.id
            })
            delete state.byHash[action.id] // delete the hash associated with the action.id

            return {
                byId: prunedIds,
                byHash: state.byHash
            }
        }

        default:
        return state;
    }

}

//Add the the other reducer strutures
export default creatureReducer
