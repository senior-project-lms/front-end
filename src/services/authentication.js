import {Axios} from './axios'

export default class AuthenticationService{

    constructor(){

    }
    
    /*
    function: __auth
    @param (params) params contains 2 different object for differen functions, a object contains data for login, another functiom contains data for refresh the tokens
    @return (none)
    request with post method to /oauth/token endpoint, endpoint returns tokes for authentication
    */
    __auth(params){
        return Axios.post("/oauth/token", params)
        .then(response => {
            if(response.status === 200){
                let responseData = response.data;
                if(responseData != null && responseData.access_token != null && responseData.refresh_token != null){
                    
                    const tokens = {
                        access_token: responseData.access_token,
                        refresh_token: responseData.refresh_token,
                    }
                    this.setTokenExpiresTime(responseData.expires_in);

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
    function: isAccessTokenActive
    @param (token) access or refresh token
    @return (boolean) returns boolean result according to token is active or not 
    request with get method to /oauth/check_token endpoint, endpoint returns token status
    */
    isAccessTokenActive(token){
        const accessToken = this.getAccessToken();

        return Axios.get(`/oauth/check_token?token=${accessToken}`)
        .then(response => {
            if(response.status === 200){
                const responseData = response.data;
                if(responseData != null && responseData != undefined && responseData.active != undefined){
                    return responseData.active;
                }
                return false;

            }
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
        function: isTokenExpired
        @param (none)
        @return (boolean) returns the acess token expired or not
    */
    isTokenExpired(){
        let currentTimeStamp = new Date().getTime();
        let expiredAt = this.getTokenExpiresTime();
        let result = expiredAt - currentTimeStamp;
        return result < 15 * 1000; // 15 sec
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
        return accessToken == null || accessToken == "" ? null : accessToken;
    }



    /*
        function: ​getRefreshToken
        @param 
        @return (accessToken: String)
        returns refresh token that is stored in local storage
    */
    getRefreshToken(){
        var refreshToken = localStorage.getItem("refresh_token");
        return refreshToken == null || refreshToken == "" ? null : refreshToken;
    }
    


    /*
        function: ​setTokenExpiredTime
        @param (expiredIn) comes from server, that show when the access_token will die
        @return (none)
        calculates the die timestamp of access_token, and stores it in session storage
    */
    setTokenExpiresTime(expiresIn){
        const currentTimeStamp = new Date().getTime();
        var expiresAt = currentTimeStamp + expiresIn * 1000;
        sessionStorage.setItem("expires_at", expiresAt);
    }

    /*
        function: ​getTokenExpiredTime
        @param (none)
        @return (expiredAt: timestap) returns the  expires_at which stored in sessionStorage 
    */
    getTokenExpiresTime(){
        var expiresAt = sessionStorage.getItem("expires_at");
        return expiresAt == null ? 0 : expiresAt;
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
        function: isSignedIn
        @param 
        @return (boolean)
        checks is signed in or not
    */
    isSignedIn(){
        let accessToken = this.getAccessToken();
        if(accessToken != null && accessToken != "" && accessToken != undefined){
            return this.isAccessTokenActive()
            .then(result => {
                return result;
            })
        }
        else{
            return Promise.resolve(false);
        }
    }


}