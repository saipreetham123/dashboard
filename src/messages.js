import {  toast } from 'react-toastify';

const Notifications={

ShowErrorMessage(msg){

    toast.error(msg,{position: "top-right"});    
},

 ShowSuccessMessage(msg){
    toast.success(msg,{position: "top-right"});  
 },

 ShowWarningMessage(msg){
    toast.warning(msg,{position: "top-right"});   
 },

 ShowInformationMessage(msg){
    toast.info(msg,{position: "top-right"});
 }
};

export default Notifications;