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
        ref.child(`users/${obj.uid}/donor`).push(obj)
        ref.child(`users/${obj.uid}/donor/`).once('value', (snap)=>{
            const value=snap.val();
            if(value){
                for (var key in value){
                    const data=value[key]
                    data.key=key  
                    dispatch({type:actionTypes.REGISTER_DONOR, payload:data});
                    dispatch({type:actionTypes.REGISTRATION});
                    dispatch({type:actionTypes.REGISTRATION_LOADER_CLOSE});
                }
            }
        });

    }
}

export function editProfile(){
    return(dispatch)=>{
        dispatch({type:actionTypes.EDIT_PROFILE})
        dispatch({type:actionTypes.UNREGISTERED});
    }
}

export function updateProfile(obj){
    return(dispatch)=>{
        dispatch({type:actionTypes.UPDATE_LOADER_OPEN}) 
        ref.child(`users/${obj.uid}/donor/${obj.key}`).update(obj)
        ref.child(`users/${obj.uid}/donor/`).once('value', (snap)=>{
                const value=snap.val();
                if(value){
                    console.log(value)
                    for (var key in value){
                        const data=value[key]
                        data.key=key    
                        dispatch({type:actionTypes.UPDATE_PROFILE, payload:data});
                        dispatch({type:actionTypes.REGISTRATION});
                        dispatch({type:actionTypes.UPDATE_LOADER_CLOSE});
                    }
                }
            });
        
    }
}

export function cancelUpdation(){
    return(dispatch)=>{
        dispatch({type:actionTypes.CANCEL_UPDATION})
    }
}

export function getProfile(id){
    return (dispatch)=>{
        ref.child(`users/${id}/donor`).once('value', (snap)=>{
        const value=snap.val();
       if(value){
        for (var key in value){
            const data=value[key]
            data.key=key
            dispatch({type:actionTypes.GET_PROFILE, payload:data});
            dispatch({type:actionTypes.REGISTRATION});
            dispatch({type:actionTypes.PROFILE_LOADER_CLOSE});
            }
        }
        else{
            dispatch({type:actionTypes.GET_PROFILE, payload:null});
            dispatch({type:actionTypes.UNREGISTERED});
            dispatch({type:actionTypes.PROFILE_LOADER_CLOSE});
        }

    });
    
    }
}



export function getDonors(value,myId,ind){
    return (dispatch)=>{
        if(ind==null){dispatch({type:actionTypes.REMOVE_DONORS})}
        ref.child(`users`).once('value', (snap)=>{
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

                            bloods.map((blood)=>{
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
                if(ind != null){
                    console.log(ind)
                }
                if (ind==null){dispatch({type:actionTypes.REQUEST_LOADERS_EMPTY})}

                const donorsUID=donorsArr.map((val)=>val.uid);

               

                donorsUID.map((id,index)=>{
                    ref.child(`users/${id}/requests/${myId}`).on('value',(snap)=>{
                        const value=snap.val()
                        if(value){
                            for(var key in value){
                                const data=value[key]
                                if(data.request){
                                    dispatch({type:actionTypes.CHECK_REQUESTS, value:true, ind:index})
                                }
                                else{
                                    dispatch({type:actionTypes.CHECK_REQUESTS, value:false, ind:index})
                                }
                            }
                        }
                        else{
                            dispatch({type:actionTypes.CHECK_REQUESTS, value:false, ind:index})
                        }

                            if(ind != null){
            
                                dispatch({type:actionTypes.REQUEST_LOADER_CLOSE, value:false ,index:ind})    
                            }   
                        
                    })
                   
                   
                    
                })
               
            }
        });
    } 
}

export function request(obj,uid,blood,ind){
    
    return(dispatch)=>{
        ref.child(`users/${uid}/requests/${obj.uid}`).push(obj)
        getDonors(blood,obj.uid,ind)(dispatch);
        dispatch({type:actionTypes.REQUEST_LOADER_OPEN, value:true , index:ind})
    }
}

export function cancelRequest(myId,uid,blood,ind){
    return(dispatch)=>{
        ref.child(`users/${uid}/requests/${myId}`).remove()
        getDonors(blood,myId,ind)(dispatch);
        dispatch({type:actionTypes.REQUEST_LOADER_OPEN, value:true, index:ind})
    }
}

export function getRequest(myId,uid){
    return(dispatch)=>{
        ref.child(`users/${myId}/requests/`).once('value', (snap)=>{
            let value =snap.val()
            console.log(value)
            let dataArr=[];
            if(value){
                for(var key in value){
                    const data=value[key]
                    for (var id in data){
                        const request=data[id]
                        dataArr.push(request)
                    }
                }
                dataArr.reverse()
                dispatch({type:actionTypes.GET_REQUESTS, payload:dataArr})
              
            }
            else{
                dispatch({type:actionTypes.GET_REQUESTS, payload:dataArr})
            }
            if(uid != null){
                dispatch({type:actionTypes.ACCEPT_LOADER_CLOSE})
            }
            
        })
       
            
    }
    
}

export function acceptRequest(myId,uid,obj){
    return(dispatch)=>{
        dispatch({type:actionTypes.ACCEPT_LOADER_OPEN})
        ref.child(`users/${myId}/requests/${uid}`).remove()
        ref.child(`users/${uid}/notifications/${myId}`).push(obj)
        getRequest(myId,uid)(dispatch)
         
    }
}
export function ignoreRequest(myId,uid){
    return(dispatch)=>{
        dispatch({type:actionTypes.ACCEPT_LOADER_OPEN})
        ref.child(`users/${myId}/requests/${uid}`).remove()
        getRequest(myId,uid)(dispatch)    
    }
}

export function getNotifications(myId){
    return(dispatch)=>{
        ref.child(`users/${myId}/notifications`).on('value', (snap)=>{
            const value=snap.val()
            let dataArr=[];
            if(value){
                for(var key in value){
                    const data=value[key]
                    for (var id in data){
                        const notification=data[id]
                        dataArr.push(notification)
                        console.log(notification)  
                    }
                }
                dataArr.reverse()
              dispatch({type:actionTypes.GET_NOTIFICATIONS, payload:dataArr})  
            }
            else{
                dispatch({type:actionTypes.GET_NOTIFICATIONS, payload:dataArr})
            }
        })
    }
}


