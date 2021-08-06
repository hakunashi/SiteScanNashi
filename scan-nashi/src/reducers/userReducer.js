import {CONNECT_USER, LOGOUT_USER} from '../actions/user/actions-types';

const initialState = {
    isLogged: false,
    infos: null
}

export default function UserReducer(state = initialState, action) {
    switch(action.type){
        case CONNECT_USER:
            return {isLogged: true, infos: action.payload}
        break
        
        case LOGOUT_USER:
            return initialState;
        break
    }
    
    return state;
}