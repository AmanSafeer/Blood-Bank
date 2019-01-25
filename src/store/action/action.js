import actionTypes from '../constants/constant'
import * as firebase from 'firebase'
import '../../firebaseConfig'

const ref=firebase.database().ref('/')


export function loginErrorClose(){
    return(dispatch)=>{
        dispatch({type:actionTypes.LOGIN_ERROR_CLOSE})
    }
}
export function loginError(err){
    return(dispatch)=>{
        dispatch({type:actionTypes.LOGIN_ERROR, payload:err})
    }
}

export function loaderOpen(){
    return(dispatch)=>{
        dispatch({type:actionTypes.LOADER_OPEN})
    }
}
export function loaderClose(){
    return(dispatch)=>{
        dispatch({type:actionTypes.LOADER_CLOSE})
    }
}
export function saveUserId(id){
    return(dispatch)=>{
        dispatch({type:actionTypes.SAVE_UID, payload:id})
    }
}
export function registerDonor(obj){
    return (dispatch) =>{
        dispatch({type:actionTypes.REGISTRATION_LOADER_OPEN})
        ref.child(`users/${obj.uid}/donors`).push(obj)
    }
}

export function editProfile(){
    return(dispatch)=>{
        dispatch({type:actionTypes.EDIT_PROFILE})
    }
}

export function updateProfile(obj){
    return(dispatch)=>{
        // dispatch({type:actionTypes.REGISTRATION_LOADER_OPEN}) //problem if data did not change by user
        ref.child(`users/${obj.uid}/donors/${obj.key}`).update(obj)
    }
}

export function cancelUpdation(){
    return(dispatch)=>{
        dispatch({type:actionTypes.CANCEL_UPDATION})
    }
}

export function getProfile(id){
    return (dispatch)=>{
    ref.child(`users/${id}/donors`).on('value', (snap)=>{
        dispatch({type:actionTypes.REGISTRATION_LOADER_CLOSE});
    });
    ref.child(`users/${id}/donors`).on('child_added', (snap)=>{
        const data=snap.val();
        data.key=snap.key
        if(data){ 
            dispatch({type:actionTypes.REGISTER_DONOR, payload:data});
            dispatch({type:actionTypes.REGISTRATION_LOADER_CLOSE});
        }
    });
    ref.child(`users/${id}/donors`).on('child_changed', (snap)=>{
        const data=snap.val();
        if(data){
            dispatch({type:actionTypes.UPDATE_PROFILE, payload:data});
            dispatch({type:actionTypes.REGISTRATION_LOADER_CLOSE});
        }
    });
    }
}