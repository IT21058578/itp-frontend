import React from "react";
import {Link} from "react-router-dom"

const ServiceCard = ({service}) =>{


    return(
        <div className="shadow-2xl shadow-white rounded-lg mx-2 my-2">
            <Link to='/serviceDeatials' state={{
                id : service.id,
                name : service.name,
                cardDescription : service.cardDescription,
                image : service.image,
                description: service.description,
                price : service.price,
                category : service.category
            }}>
            <div className="w-56 h-80 m-6 relative overflow-hidden shadow-lg transition-all rounded-2xl hover:bg-transparent">
                <div className="absolute p-4 w-full top-0 text-gray-900 hover:opacity-100">
                    <p className="mt-1 text-black">{service.name}</p>
                </div>
                <div className="w-full h-full hover:opacity-[0.3] border-2 border-gray-300">
                    <img className="w-full h-full "
                        src={service.image !== 'N/A' ? service.image :
                        'https://via.placeholder.com/400'}
                        alt="service name"
                    />
                </div>
                <div className="z-10 bg-gray-800 absolute bottom-0 right-0 left-0 py-6 px-6 hover:opacity-[0.3] hover:bg-transparent h-36">
                    <span className="uppercase font-light text-white text-cu tracking-cu2">{service.name}</span>
                    <p className="mt-1 text-orange-200 text-xs">{service.cardDescription}
                    </p>
                </div>
                
            </div> 
            </Link>
        </div>
    );
}
export default ServiceCard;