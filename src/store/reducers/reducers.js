import actionTypes from '../constants/constant'

const initialState = {
   loginError:null,
    loader:false,

    userId:null,
    donors:null,

    registrationLoader:true,

    registered:false,
    profile:null,
    oldProfile:null,

    editing:false,

    requests:null
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




         case actionTypes.REGISTRATION:{
            return{
                ...state,
                registered:true
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
        case actionTypes.REGISTER_DONOR:{
            return{
                ...state,
                profile:action.payload,
                
            }    
         }
         case actionTypes.UNREGISTERED:{
            return{
                ...state,
                registered:false
            }
         }




        case actionTypes.EDIT_PROFILE:{
            return{
                ...state,
                editing:true,
                registered:false
            }
        }
        case actionTypes.UPDATE_PROFILE:{
           return{
               ...state,
            //    profile:action.payload,
               editing:false,
               registered:true
           }    
        }
        case actionTypes.CANCEL_UPDATION:{
            return{
                ...state,
                editing:false,
                registered:true
            }
        }
        case actionTypes.OLD_PROFILE:{
            return{
                ...state,
                oldProfile:action.payload
            }
        }



        case actionTypes.GET_DONORS:{
            return{
                ...state,
                donors:action.payload
            }
        }


        case actionTypes.REQUEST:{
            return{
                ...state,
                requests:action.payload
            }
        }

        default: return state;            
    }
}
