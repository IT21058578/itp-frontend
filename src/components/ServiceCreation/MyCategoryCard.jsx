import { Button } from 'flowbite-react';
import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';


const CategoryCard = ({ category, mycard }) => {
    console.log(mycard, "mycard")
    const deletedata = (cart) => {
        console.log(cart.id, "mycard")
        axios.delete(`http://localhost:8080/api/cart?id=${cart.id}`)
            .then((res) => alert("This cart sccessfully deleted!"))
            .catch((err) => alert("something went wrong!"));
        window.location.href = "/mycart"
            ;


    }

    return (
        <div>
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
                    <p className="mt-1 text-orange-200 text-xs">{category.description}
                    </p>
                    {
                        mycard && <p className="mt-1 text-orange-200 text-xs">{category.price}
                        </p>
                    }
                    <br />
                    <Button color="failure" onClick={() => deletedata(category)} >
                        DELETE
                    </Button>
                </div>

            </div>
        </div>
    );
}

export default CategoryCard
