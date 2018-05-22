var testReducer = function(state={
    test: null
}, action) {

    switch(action.type){

        case 'DO_SOMETHING':
        return {
            ...state,
            test: Math.random()
        }
        default:
        return state;
    }

}

//Add the the other reducer strutures
export default testReducer
