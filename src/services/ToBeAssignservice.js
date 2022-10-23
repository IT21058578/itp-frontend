import axios from 'axios';

const TO_BE_ASSIGN_API_BASE_URL = "http://localhost:8085/demo/toBeAssigned";

class ToBeAssignService {

    getToBeAssign(){
        return axios.get(TO_BE_ASSIGN_API_BASE_URL+'/getAll');
    }

    createToBeAssign(ToBeAssign){
        return axios.post(TO_BE_ASSIGN_API_BASE_URL+'/save', ToBeAssign);
    }

    getToBeAssignById(ToBeAssignId){
        return axios.get(TO_BE_ASSIGN_API_BASE_URL + '/' + ToBeAssignId);
    }

    updateToBeAssign(ToBeAssign, ToBeAssignId){
        return axios.put(TO_BE_ASSIGN_API_BASE_URL + '/update/' + ToBeAssignId, ToBeAssign);
    }

    deleteToBeAssign(ToBeAssignId){
        return axios.delete(TO_BE_ASSIGN_API_BASE_URL + '/delete/' + ToBeAssignId);
    }
}

export default new ToBeAssignService()