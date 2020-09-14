import axios from 'axios';
import {setAlert} from './alert';
import { GET_PROFILE,PROFILE_ERROR,ADD_EDUCATION,ADD_EXPERIENCE,
UPDATE_PROFILE,ACCOUNT_DELETED,CLEAR_PROFILE } from './types';

export const getCurrentProfile = () => async dispatch =>{
    //GET api/profile/me private
    try{
        const res = await axios.get('/api/profile/me'); // this will use the current token in localStorage
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
    }catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload:{
                'msg':err.response.statusText,
                'status':err.response.status
            }
        })
    }
}

export const createProfile = (formData,history,edit=false) => async dispatch =>{
    try{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.post('/api/profile',formData,config);
        console.log(res);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
        dispatch(setAlert(edit ? 'Profile Update' : 'Profile Created', 'success'));

        if(!edit){
            history.push('/dashboard');
        }

    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload:{
                'msg': err.response.statusText,
                'status':err.response.status
            }
        });
    }
}

export const addEducation = (formData,history) => async dispatch =>{
    try{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.put('/api/profile/education',formData,config);
        console.log(res); // will fetch the whole profile from mongoDB atlas
        dispatch({
            type:ADD_EDUCATION,
            payload:res.data
        });
        dispatch(setAlert('New Education added','success'));
        history.push('/dashboard');
    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload:{
                'msg': err.response.statusText,
                'status':err.response.status
            }
        });
    }
}


export const addExperience = (formData,history) => async dispatch =>{
    try{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience',formData,config);
        console.log(res); // will fetch the whole profile from mongoDB atlas
        dispatch({
            type:ADD_EXPERIENCE,
            payload:res.data
        });
        dispatch(setAlert('New Experience added','success'));
        history.push('/dashboard');
    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload:{
                'msg': err.response.statusText,
                'status':err.response.status
            }
        });
    }
}

export const deleteExperience = id => async dispatch =>{
    try{
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Experience Deleted','danger'));
    }catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload:{'msg':err.response.statusText,'status':err.response.status}
        })
    }
}

export const deleteEducation = id => async dispatch =>{
    try{
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Education Deleted','danger'));
    }catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload:{'msg':err.response.statusText,'status':err.response.status}
        })
    }
}

export const deleteAccount = () => async dispatch =>{
    if(window.confirm('Are You sure to delete your account?')){
        try{
            const res = axios.delete('/api/profile');
            dispatch({type:CLEAR_PROFILE});
            dispatch({type:ACCOUNT_DELETED});
            dispatch(setAlert('Account has been deleted','danger'));
        }catch(err){
            dispatch({
                type:PROFILE_ERROR,
                payload:{'msg':err.response.statusText,'status':err.response.status}
            })
        }
    }
}