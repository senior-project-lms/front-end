import {Axios} from './axios.js'

export default class ExampleService{

    constructor(){
        this.testVal = 0;
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
            // when request successfull, the data in the response

            if(response.status === 200){
                var data = response.data; // here is the data returned from api
                return data;

            }
            return {}; // status not successful, then return empy object
        })
        .catch(error => {
            // error handiling
            return {}; // there is an error, therefore return empty object
        });
    }

}