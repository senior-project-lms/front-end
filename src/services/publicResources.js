import {
  Axios
} from './axios';
import Service from './common'
import StorageService from './storage'
import AuthenticationService from './authentication';

const service = new Service();
const storageService = new StorageService();
const authenticationService = new AuthenticationService();

export default class PublicResourceService {
  constructor() {}

  delete(publicKey, filePublicKey) {
    return service.delete(`/api/public-resources/${publicKey}/${filePublicKey}`);
  }
  getAllResources(publicKey) {
    return service.getAll(`/api/public-resources/${publicKey}`);
  }
  save(publicKey, params) {
    return service.post(`/api/public-resources/${publicKey}`, params);
  }
}
