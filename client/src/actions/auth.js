import axios from 'axios';
import {REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,
        AUTH_ERROR,
        LOGIN_SUCCESS,
        LOGIN_FAIL,
        LOGOUT,
        CLEAR_PROFILE} from './types';

import {setAlert} from './alert';
import setAuthToken from '../utils/setAuthToken';


//load user
export const loadUser = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token); // will set to the headers as x-auth-token
    }

    try{
        const res = await axios.get('api/auth');
        dispatch({
            type:USER_LOADED,
            payload:res.data
        });
    }catch(err){
        dispatch({
            type:AUTH_ERROR
        });
    }
}
//load user ends


// register user
export const register = ({name,email,password}) => async dispatch =>{
    
    try{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        };
        const body = JSON.stringify({name,email,password});
        const res = await axios.post('/api/users',body,config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data 
        });
        dispatch(loadUser());
    }catch(err){
        console.log(err);
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger'))); 
        }
        dispatch({
            type: REGISTER_FAIL
        })
    } 
}
//register ends

//login user
export const login = (email,password) => async dispatch =>{
    
    try{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        };
        const body = JSON.stringify({email,password});
        const res = await axios.post('/api/auth',body,config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data 
        });
        dispatch(loadUser());
    }catch(err){
        console.log(err);
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger'))); 
        }
        dispatch({
            type: LOGIN_FAIL
        })
    } 
}
//login ends

//logout starts
export const logout = () => dispatch => {
    dispatch({
        type:LOGOUT
    })
    dispatch({
        type:CLEAR_PROFILE
    })
}