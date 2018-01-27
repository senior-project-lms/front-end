import {Axios} from './axios.js'

export default class ExampleService{


    constructor(){
        this.catchedResponse = {
            status: false,
            message: "Networking error!",
            data: null
        }
        this.testVal = 0;
    }


    ___then(response){
        
        const responseData = response.data;

        var returnedResponse = {
            status: false,
            message: null,
            data: null
        }
        
        if(response.status === 200){
            if (responseData != undefined && responseData != null){
                returnedResponse.status = true;
                returnedResponse.data = responseData
            }
        }
        else {
            returnedResponse.message = responseData.message;

        }
        return returnedResponse;

    }


    static staticMethod(){
        // static method
    }
    get test(){
        return this.testVal;
    }


    method(){
        // normal method
    }



    fetchExampleObject(parameters){
        const accessToken = ""; // call function to get access token
        return Axios.post(`/path/subpath?access_token=${accessToken}`, parameters)
        .then((response) => {
            this.___then(response);
        })
        .catch(error => {
            return this.catchedResponse;
        });
    }

}