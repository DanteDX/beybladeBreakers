import {GET_PROFILE,PROFILE_ERROR,CLEAR_PROFILE,ADD_EDUCATION,ADD_EXPERIENCE,
UPDATE_PROFILE} from '../actions/types';

const initialState = {
    profile:null,
    profiles:[],
    repos:[],
    loading:true,
    error:{}
};

export default function(state=initialState,action){
    const {type,payload} = action;
    
    switch(type){
        case GET_PROFILE:
        case ADD_EXPERIENCE:
        case ADD_EDUCATION:
        case UPDATE_PROFILE:
            return{
                ...state,
                profile:payload,
                loading:false
            }
        case PROFILE_ERROR:
            return{
                ...state,
                error:payload,
                loading:false
            }
        case CLEAR_PROFILE:
            return{
                ...state,
                profile:null,
                repos:[],
                loading:false
            }
        default:
            return state;
    }
}