import React , { useState, useEffect }from "react";
import {Link} from "react-router-dom"
import axios from 'axios';

const AdminServiceCard = ({service}) =>{


    //useEffect=()=>{
    //    axios.delete(`http://localhost:8080/deleteCate/${sid}`)
    //    .then((res) => console.log(res))
    //    .catch((err) => console.log(err));
    //}

        

    function DeleteAlert(){
            axios.delete(`http://localhost:8080/${service.delete}/${service.id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        
        alert("The service sccessfully deleted!");
        window.location.reload(false);
    }


    return(
        <div className="inline-flex transition-all">      
                
            <div className="w-56 h-80 m-2 relative overflow-hidden shadow-lg transition-all rounded-2xl hover:bg-transparent">
                <div className="absolute p-4 w-full top-0 text-gray-900 hover:opacity-100">
                    <p className="mt-1 text-black">{service.name}</p>
                </div>
                <div className="w-full h-full hover:opacity-[0.3]">
                    <img className="w-full h-full "
                        src={service.image !== 'N/A' ? service.image :
                        'https://via.placeholder.com/400'}
                        alt="service name"
                    />
                </div>
                <div className="z-10 bg-gray-800 absolute bottom-0 right-0 left-0 py-6 px-6 hover:opacity-[0.3] hover:bg-transparent">
                    <span className="uppercase font-light text-white text-cu tracking-cu2">{service.name}</span>
                    <p className="mt-1 text-orange-200 text-xs">{service.cardDescription}
                    </p>
                </div>
            </div>
            <div className=" relative overflow-hidden transition-all top-36">
                <button class="m-2 inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md" onClick={()=>{DeleteAlert()}}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg> 
                Delete
                </button>
                <Link to="/admin/serviceUpdate" state={{
                    id: service.id,
                    name: service.name,
                    image: service.image,
                    cardDescription: service.cardDescription,
                    description: service.description,
                    category : service.category,
                    update: service.update
                    }}>
                    <button className="m-2 inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md" >
                        
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                        Update
                    </button> 
                </Link>
               {
                
               }
                
            </div>
                    
                
        </div>
    );
}
export default AdminServiceCard;