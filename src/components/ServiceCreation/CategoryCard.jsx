import React from 'react';
import {Link} from "react-router-dom";


const CategoryCard= ({category}) => {
  return (
    <div>
        <Link to='/CatogrizedServices' state={{
                id : category.id,
                image : category.image,
                name : category.name
            }}>
            <div className="w-56 h-80 m-6 relative overflow-hidden shadow-lg transition-all rounded-2xl hover:bg-transparent">
                <div className="absolute p-4 w-full top-0 text-gray-900 hover:opacity-100">
                    <p className="mt-1 text-black">{category.name}</p>
                </div>
                <div className="w-full h-full hover:opacity-[0.3]">
                    <img className="w-full h-full "
                        src={category.image !== 'N/A' ? category.image :
                        'https://via.placeholder.com/400'}
                        alt="category name"
                    />
                </div>
                <div className="z-10 bg-gray-800 absolute bottom-0 right-0 left-0 py-6 px-6 hover:opacity-[0.3] hover:bg-transparent">
                    <span className="uppercase font-light text-white text-cu tracking-cu2">{category.name}</span>
                    <p className="mt-1 text-orange-200">{category.description}
                    </p>
                </div>
                
            </div> 
        </Link>
    </div>
  );
}

export default CategoryCard
