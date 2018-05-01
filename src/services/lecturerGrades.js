import {Axios} from './axios.js'
import Service from './common';

const service = new Service();
const storageService = new StorageService();

export default class LecturerGradesService{

    

    constructor(){
        this.catchedResponse = {
            status: false,
            message: "Networking error!",
            data: null
        }
        this.testVal = 0;

        
    }

    getAll(page){

        grades: [{
            gradePublicId: '3019283012830912378192739123',
            studentGradePublicId: '04530750j3274587c359634j5692387',
            text: 'Quiz 1',
            score: 78,
            maxScore: 100,
            average: 54,
            affect: 3,
        },
        {
            gradePublicId: 'mc928492134826346128734c812634',
            studentGradePublicId: 'm72603461283648c12b63462b754b`125348',
            text: 'Assignment 1',
            score: 90,
            maxScore: 100,                        
            average: 70,
            affect: 4,
        },
        {
            gradePublicId: 'm02364cb2893946895v219378469m23y4s2cb',
            studentGradePublicId: ',082398xy12tbt4x2g3413yug4nx23h41uhanhx',
            text: 'Quiz 2',
            maxScore: 100,                        
            score: 90,
            average: 70,
            affect: 3,
        },
        {
            gradePublicId: 'x,o2u1mz3248u8n1y8794yuecgufgi1273t4',
            studentGradePublicId: 'co5m467yn2txuz3btr1b61r523bzd3ty2f',
            text: 'Midterm',
            maxScore: 100,                        
            score: 56,
            average: 34,
            affect: 30,
        }]
        //const accessToken = authenticationService.getAccessToken();
        return grades;//service.getAll(`/api/system-announcements/${page}`)
        /*.then(response => {
            if(response.status){
                var announcement = response.data;
                announcement.map(announcement => {
                    announcement.resources.map((resource) => {
                        resource.url = `${Axios.defaults.baseURL}${resource.url}?access_token=${accessToken}`;
                    });
                })
                response.data = announcement;
            }
            
            return response;
        })
        .catch(error => {
            return service.___then(error.response);
        });*/
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