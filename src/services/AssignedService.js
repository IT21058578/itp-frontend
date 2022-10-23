import axios from 'axios';

const ASSIGNED_API_BASE_URL = "http://localhost:8085/demo/assigned";

class AssignedService {

    getAssign(){
        return axios.get(ASSIGNED_API_BASE_URL+'/getAll');
    }

    createAssign(Assign){
        return axios.post(ASSIGNED_API_BASE_URL+'/save', Assign);
    }

    getAssignById(AssignId){
        return axios.get(ASSIGNED_API_BASE_URL + '/getOne/' + AssignId);
    }

    updateAssign(Assign, AssignId){
        return axios.put(ASSIGNED_API_BASE_URL + '/update/' + AssignId, Assign);
    }

    deleteAssign(AssignId){
        return axios.delete(ASSIGNED_API_BASE_URL + '/delete/' + AssignId);
    }
}

export default new AssignedService()