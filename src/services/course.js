

import Service from "./common"

var service = new Service();


export default class CourseService{

    constructor(){

    }

    save(params){
        return service.save('/api/admin/course', params);
    }

    saveAll(params){
        return service.save('/api/admin/courses', params)
    }

    getAllActive(){
        return service.getAll('/api/courses/active');
    }


}