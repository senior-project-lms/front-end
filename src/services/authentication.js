import {Axios} from './axios'

export default class Authentication{

    constructor(){

    }
    
    /*
    function: __auth
    @param (params) params contains 2 different object for differen functions, a object contains data for login, another functiom contains data for refresh the tokens
    @return (none)
    request with post method to /oauth/token endpoint, endpoint returns tokes for authentication
    */
    __auth(params){
        return Axios.post('/oauth/token', params)
        .then(response => {
            if(response.status === 200){
                let responseData = response.data;
                if(responseData != null && responseData.access_token != null && responseData.refresh_token != null){
                    
                    const tokens = {access_token​: responseData.access_token, refresh_token​: responseData.refresh_token}
                    
                    this.setTokenExpiredTime(responseData.expired_in);

                    this.setTokens(tokens);
                    
                    return true;
                }
                
            }
            return false;
        })
        .catch(() => {
            return false;
        })
    }

    
    /*
    function: login
    @param (user) object contains username, password data for login
    @return (boolean)
    calls __auth function, adds parameters to URLSearchParams, with grant_type 'password', post params to __auth function, for get authentication tokens, and validation
    */
    login(user){
        user['grant_type'] = 'password';

        let params = new URLSearchParams();
        
        for(var key in user){
            params.append(key, user[key]);
        }
        return this.__auth(params);
    }


    /*
    function: refreshTokens
    @param (none)
    @return (boolean)
    calls __auth function, adds parameters to URLSearchParams, with grant_type 'refresh_token', post params to __auth function, for refresh authentication tokens
    */
    refreshTokens(){
        let params = new URLSearchParams();
        params.append("grant_type", "refresh_token");
        params.append("refresh_token", this.getRefreshToken());
        return this.__auth(params);
    }


    /*
        function: ​setTokenExpiredTime
        @param (expiredIn) comes from server, that show when the access_token will die
        @return (none)
        calculates the die timestamp of access_token, and stores it in session storage
    */
    ​setTokenExpiredTime(expiredIn){
        let currentTimeStamp = new Date().getTime();
        let expiredAt = currentTimeStamp + expiredIn;
        sessionStorage.setItem("expired_at", expiredAt);
    }

    /*
        function: ​getTokenExpiredTime
        @param (none)
        @return (expiredAt: timestap) returns the  expired_at which stored in sessionStorage 
    */
    ​getTokenExpiredTime(){
        let expiredAt = sessionStorage.getItem("expired_at");
        return expiredAt == null ? 0 : expiredAt;
    }


    /*
        function: isTokenExpired
        @param (none)
        @return (boolean) returns the acess token expired or not
    */
    isTokenExpired(){
        let currentTimeStamp = new Date().getTime();
        let expiredAt = this.getTokenExpiredTime();
        let result = expiredAt - currentTimeStamp;
        return result > (15 * 1000); // 15 * 1000 = 15 sec
    }

    /*
        function: setTokens
        @param (tokens: object) object contains access_token, and refresh_token
        @return (none)
        access_token stored in session storage
        refresh_token stored in local storage, because refresh token can be used again 
    */
    setTokens(tokens){
        if(tokens != null){
            sessionStorage.setItem("access_token", tokens.access_token);
            localStorage.setItem("refresh_token", tokens.refresh_token);
        }
    }

    /*
        function: getAccessToken
        @param 
        @return (accessToken: String)
        returns access token that is stored in session storage
    */
    getAccessToken(){
        let accessToken = sessionStorage.getItem("access_token");
        return accessToken == null || accessToken == '' ? null : accessToken;
    }



    /*
        function: ​getRefreshToken
        @param 
        @return (accessToken: String)
        returns refresh token that is stored in local storage
    */
    ​getRefreshToken(){
        let refreshToken = localStorage.getItem("refresh_token");
        return refreshToken == null || refreshToken == '' ? null : refreshToken;
    }

    /*
        function: destroyStorage
        @param 
        @return (void)
        clear storages
    */
    clearStorage(){
        localStorage.removeItem("access_token");
        sessionStorage.clear();
    }



    /*
        function: destroyStorage
        @param 
        @return (void)
        clear storages
    */
    isLoggedIn(){
        let accessToken = this.getAccessToken();
        if(accessToken != null || accessToken != ''){
            // check 
            // ouah/token_check param token
        }
    }

}