


export   function isAuthenticated() { 
    const accessTokenExpirationTime = localStorage.getItem('x-access-token-expiration');
    const accessToken = localStorage.getItem('x-access-token');
    if(!accessToken){
        return false;
    }
    if((accessToken) && (accessTokenExpirationTime > Date.now())){
        return true;
    }
    return false;
   
}