import actionTypes from '../constants/constant';
import * as firebase from 'firebase';
import {bloods} from '../../components/BloodTypes'
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
        const value=snap.val();
       if(value){
        for (var key in value){
            const data=value[key]
            data.key=key
            dispatch({type:actionTypes.REGISTER_DONOR, payload:data});
            dispatch({type:actionTypes.REGISTRATION});
            dispatch({type:actionTypes.REGISTRATION_LOADER_CLOSE});
            dispatch({type:actionTypes.UPDATE_PROFILE});
            }
        }
        else{
            dispatch({type:actionTypes.REGISTER_DONOR, payload:value});
            dispatch({type:actionTypes.UNREGISTERED});
            dispatch({type:actionTypes.REGISTRATION_LOADER_CLOSE});
            dispatch({type:actionTypes.UPDATE_PROFILE });
        }

        dispatch({type:actionTypes.REGISTRATION_LOADER_CLOSE});
    });
    // ref.child(`users/${id}/donors`).on('child_added', (snap)=>{
    //     const data=snap.val();
    //     data.key=snap.key
    //     if(data){ 
    //         dispatch({type:actionTypes.REGISTER_DONOR, payload:data});
    //         dispatch({type:actionTypes.REGISTRATION_LOADER_CLOSE});
    //     }
    // });
    // ref.child(`users/${id}/donors`).on('child_changed', (snap)=>{
    //     const data=snap.val();
    //     if(data){
    //         dispatch({type:actionTypes.UPDATE_PROFILE, payload:data});
    //         dispatch({type:actionTypes.REGISTRATION_LOADER_CLOSE});
    //     }
    // });
    }
}

export function oldProfile(pro){
    return(dispatch)=>{
        dispatch({type:actionTypes.OLD_PROFILE, payload:pro})
    }
}


export function getDonors(value,uid){
    return(dispatch)=>{
        ref.child(`users`).on('value', (snap)=>{
            const data= snap.val();
            let donorsArr=[];
            if(data){
                for (var key in data){
                    const donors=data[key]
                    for(var id in donors){
                        const val=donors[id]
                        for (var user in val){
                            const donor=val[user]
                            let groupFound=false;

                            bloods.map((blood,ind)=>{
                                if(value == blood.group){
                                   blood.receive.map((group)=>{
                                       if((donor.blood == group) && (donor.avaiable==true)){
                                        groupFound = true 
                                            if(groupFound){
                                            donorsArr.push(donor)
                                            }
                                       }
                                   })
                                }
                            })
                        }
                    }
                }
                donorsArr.reverse()
                dispatch({type:actionTypes.GET_DONORS, payload:donorsArr});

                const donorsUID=donorsArr.map((val)=>val.uid);
                const requestArr=[]
                donorsUID.map((id)=>{
                    ref.child(`users/${id}/requests/${uid}`).on('value',(snap)=>{
                        const value=snap.val()
                        console.log(value)
                        if(value){
                            if(value.request){
                                requestArr.push(true)
                            }
                            else{
                                requestArr.push(false)
                            }
                        }
                        else{
                            requestArr.push(false)
                        }
                    })
                })
                console.log(requestArr)
            }
        });
    } 
}


export function request(obj,uid){
    return(dispatch)=>{
        ref.child(`users/${uid}/requests/${obj.uid}`).push(obj)
    }
}

export function cancelRequest(myId,uid){
    return(dispatch)=>{
        ref.child(`users/${uid}/requests/${myId}`).remove()
    }
}

export function getRequest(id){
    return(dispatch)=>{
        ref.child(`users/${id}/requests/`).on('value', (snap)=>{
            const value=snap.val()
            let dataArr=[];
            if(value){
                for(var key in value){
                    const data=value[key]
                    for (var id in data){
                        const request=data[id]
                        dataArr.push(request)
                        console.log(request)  
                    }
                }
              dispatch({type:actionTypes.REQUEST, payload:dataArr})  
            }
        })
    }
}

