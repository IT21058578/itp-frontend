import axios from 'axios';

const CREW_API_BASE_URL = "http://localhost:8085/demo/crews";

class CrewService {

    getCrews(){
        return axios.get(CREW_API_BASE_URL+'/getAll');
    }

    createCrews(Crew){
        return axios.post(CREW_API_BASE_URL+'/save', Crew);
    }

    getCrewsById(CrewId){
        return axios.get(CREW_API_BASE_URL + '/' + CrewId);
    }

    updateCrews(Crew, CrewId){
        return axios.put(CREW_API_BASE_URL + '/update/' + CrewId, Crew);
    }

    deleteCrews(CrewId){
        return axios.delete(CREW_API_BASE_URL + '/delete/' + CrewId);
    }
}

export default new CrewService()