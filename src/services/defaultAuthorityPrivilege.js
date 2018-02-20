import Service from './common'

const service = new Service();

export default class DefaultAuthorityPrivilegeService{

    constructor(){

    }

    getAll(){
        return service.getAll('/api/authority-privileges');
    }

}