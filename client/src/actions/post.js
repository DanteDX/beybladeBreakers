import axios from 'axios';
import {DELETE_POST, GET_POSTS,POST_ERROR,UPDATE_LIKES,ADD_POST,GET_POST,
ADD_COMMENT,REMOVE_COMMENT} from './types';
import {setAlert} from './alert';

//get posts action
export const getPosts = () => async dispatch => {
    try{
        const res = await axios.get('/api/posts');
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload:{
                'msg': err.response.statusText,
                'status':err.response.status
            }
        })
    }
}
export const getPost = postId => async dispatch => {
    try{
        const res = await axios.get(`/api/posts/${postId}`);
        dispatch({
            type:GET_POST,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload:{
                'msg': err.response.statusText,
                'status':err.response.status
            }
        })
    }
}

export const addLike = postId => async dispatch => {
    try{
        const res = await axios.put(`/api/posts/like/${postId}`);
        dispatch({
            type:UPDATE_LIKES,
            payload:{
                postId,
                likes:res.data
            }
        })
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload:{
                'msg': err.response.statusText,
                'status':err.response.status
            }
        })
    }
}

export const removeLike = postId => async dispatch => {
    try{
        const res = await axios.put(`/api/posts/unlike/${postId}`);
        dispatch({
            type:UPDATE_LIKES,
            payload:{
                postId,
                likes:res.data
            }
        })
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload:{
                'msg': err.response.statusText,
                'status':err.response.status
            }
        })
    }
}

export const deletePost = postId => async dispatch => {
    try{
        await axios.delete(`/api/posts/${postId}`);
        dispatch({
            type:DELETE_POST,
            payload:postId
        })
        dispatch(setAlert('Post has been removed','danger'));
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload:{
                'msg': err.response.statusText,
                'status':err.response.status
            }
        })
    }
}

export const addPost = formData => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

    try{
        const res = await axios.post('/api/posts/',formData,config);
        dispatch({
            type:ADD_POST,
            payload:res.data
        })
        dispatch(setAlert('New Post Added','success'));
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload:{
                'msg': err.response.statusText,
                'status':err.response.status
            }
        })
    }
}

export const addComment = (postId,formData) => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

    try{
        const res = await axios.put(`/api/posts/comment/${postId}`,formData,config);
        dispatch({
            type:ADD_COMMENT,
            payload:res.data //comments array
        })
        dispatch(setAlert('New Comment added','success'));
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload:{
                'msg': err.response.statusText,
                'status':err.response.status
            }
        })
    }
}

export const deleteComment = (postId,commentId) => async dispatch => {
    try{
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({
            type:REMOVE_COMMENT,
            payload:commentId
        })
        dispatch(setAlert('Comment removed','danger'));
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload:{
                'msg': err.response.statusText,
                'status':err.response.status
            }
        })
    }
}