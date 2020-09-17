import {GET_PROFILE,GET_PROFILES,PROFILE_ERROR,CLEAR_PROFILE,ADD_EDUCATION,ADD_EXPERIENCE,
UPDATE_PROFILE,GET_REPOS, REPOS_ERROR} from '../actions/types';

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
        case GET_PROFILES:
            return{
                ...state,
                profiles:payload,
                loading:false
            }
        
        case GET_REPOS:
            return{
                ...state,
                repos:payload,
                loading:false
            }
        
        case PROFILE_ERROR:
        case REPOS_ERROR:
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