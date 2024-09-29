const checkAuthentication = async () => {
    return new Promise((resolve,reject) =>{
        if(localStorage.getItem("userId") && localStorage.getItem("userId").length > 0 && localStorage.getItem("accessToken") && localStorage.getItem("accessToken").length > 0){
            resolve(true)
        } else{
            resolve(false)
        }
    })
};

export default checkAuthentication;