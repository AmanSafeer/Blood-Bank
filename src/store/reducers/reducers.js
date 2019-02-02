import actionTypes from '../constants/constant'

const initialState = {
   loginError:null,
    loader:false,
    
    userId:null,

    donors:null,
    
    registered:false,
    registrationLoader:false,

    profile:null,
    profileLoader:true,


    editing:false,
    updateLoader:false,

    requests:null,
    requestLoaders:[],
    checkRequests:[],

    acceptLoader:false,
    notifications:null,

    
};

export default (state = initialState , action)=>{
    switch(action.type){
        case actionTypes.LOGIN_ERROR_CLOSE:{
            return{
                ...state,
                loginError:null
            }
        }
         case actionTypes.LOGIN_ERROR:{
             return{
                 ...state,
                 loginError:action.payload
             }
         }     
            

         case actionTypes.LOADER_OPEN:{
             return{
                 ...state,
                 loader:true
             }
         }
         case actionTypes.LOADER_CLOSE:{
             return{
                 ...state,
                 loader:false
             }
         }

         



         case actionTypes.SAVE_UID:{
            return{
                ...state,
                userId:action.payload
            }
        }






        case actionTypes.REGISTER_DONOR:{
            return{
                ...state,
                profile:action.payload,
                
            }    
         }
         case actionTypes.REGISTRATION_LOADER_OPEN:{
             return{
                 ...state,
                 registrationLoader:true
             }
         }case actionTypes.REGISTRATION_LOADER_CLOSE:{
            return{
                ...state,
                registrationLoader:false
            }
        }
        
         case actionTypes.REGISTRATION:{
            return{
                ...state,
                registered:true
            }
         }
         case actionTypes.UNREGISTERED:{
            return{
                ...state,
                registered:false
            }
         }





         case actionTypes.GET_PROFILE:{
            return{
                ...state,
                profile:action.payload,
            }
        }
        case actionTypes.PROFILE_LOADER_OPEN:{
            return{
                ...state,
                profileLoader:true,
            }
        }
        case actionTypes.PROFILE_LOADER_CLOSE:{
            return{
                ...state,
                profileLoader:false,
            }
        }





        case actionTypes.EDIT_PROFILE:{
            return{
                ...state,
                editing:true,
            }
        }






        case actionTypes.UPDATE_PROFILE:{
           return{
               ...state,
               profile:action.payload,
               editing:false,
           }    
        }
        case actionTypes.UPDATE_LOADER_OPEN:{
            return{   
                ...state,
                updateLoader:true
            }

        }
        case actionTypes.UPDATE_LOADER_CLOSE:{
            return{   
                ...state,
                updateLoader:false
            }

        }

        case actionTypes.CANCEL_UPDATION:{
            return{
                ...state,
                editing:false,
                registered:true
            }
        }
        




        
        case actionTypes.CHECK_REQUESTS:{
            const newRequests=[...state.checkRequests];
            newRequests[action.ind]=action.value;
            return{
                ...state,
                checkRequests:newRequests
            }
        }
        case actionTypes.REQUEST_LOADER_OPEN:{
               const newLoaders= [...state.requestLoaders];
               newLoaders[action.index]=action.value;
               console.log(newLoaders)
            return{
                ...state,
                requestLoaders:newLoaders
            }
        }
        case actionTypes.REQUEST_LOADER_CLOSE:{
            const newLoaders= [...state.requestLoaders];
            newLoaders[action.index]=action.value;
            console.log(newLoaders)
            return{
                ...state,
                requestLoaders:newLoaders
            }
        }
        case actionTypes.REQUEST_LOADERS_EMPTY:{
            return{
                ...state,
                requestLoaders:[]
            }
        }




        case actionTypes.ACCEPT_LOADER_OPEN:{
            return{
                ...state,
                acceptLoader:true
            }
        }
        case actionTypes.ACCEPT_LOADER_CLOSE:{
            return{
                ...state,
                acceptLoader:false
            }
        }



        case actionTypes.GET_DONORS:{
            return{
                ...state,
                donors:action.payload
            }
        }
        case actionTypes.REMOVE_DONORS:{

            return{
                ...state,
                donors:null
            }
        }



        case actionTypes.GET_REQUESTS:{
            return{
                ...state,
                requests:action.payload
            }
        }


        case actionTypes.GET_NOTIFICATIONS:{
            return{
                ...state,
                notifications:action.payload
            }
        }




        default: return state;            
    }
}
