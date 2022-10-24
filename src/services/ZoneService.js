import axios from 'axios';

const ZONE_API_BASE_URL = "http://localhost:8085/demo/zone";

class ZoneService {

    getZones(){
        return axios.get(ZONE_API_BASE_URL+'/getAll');
    }

    createZones(Zone){
        return axios.post(ZONE_API_BASE_URL+'/save', Zone);
    }

    getZonesById(ZoneId){
        return axios.get(ZONE_API_BASE_URL + '/' + ZoneId);
    }

    updateZones(Zone, ZoneId){
        return axios.put(ZONE_API_BASE_URL + '/update/' + ZoneId, Zone);
    }

    deleteZones(ZoneId){
        return axios.delete(ZONE_API_BASE_URL + '/delete/' + ZoneId);
    }
}

export default new ZoneService()