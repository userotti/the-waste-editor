var socketReducer = function(state={}, action) {

    switch(action.type){


        case 'message':
        return Object.assign({}, {message:action.data});

        case 'client/NEW_CLIENT_CONNECTED':
        return {
            ...state,
            socketID: action.data.socketID
        };

        case 'server/INIT_USER':
        return {
            ...state,
            initialised: true
        };



        default:
        return state;
    }

}

//Add the the other reducer strutures
export default socketReducer
