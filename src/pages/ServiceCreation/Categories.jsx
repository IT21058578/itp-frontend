import React,{Component} from "react";
import axios from 'axios';
import CategoryCard from "../../components/ServiceCreation/CategoryCard";
import Loader from '../../components/ServiceCreation/Loader';





class Categories extends Component{
    constructor(props){
      super(props);
      this.state ={
        categories : []
      };
      
    }
    componentDidMount(){
      axios.get("http://localhost:8080/findAllCategoriesNew")
      .then(response => response.data)
      .then((data) => {
        this.setState({categories : data}); }
      
      );
    }


    render(){
        
        return(
            
            <div className=" ">
                <div className="">
                
                
                {
                    this.state.categories?.length>0
                    ?(
                        <div>
                            <div className="border-2 border-gray-300 rounded-lg m-2 bg-gray-100">
                                <p className="text-2xl p-2 m-2">Service categories</p>
                                <hr className="bg-gray-400 m-2"/>
                            </div>
                        <div className=" flex justify-center items-center flex-wrap border-2 border-gray-300 bg-gray-100 rounded-lg m-2">
                                
                                    {this.state.categories.map((category)=>(
                                        <CategoryCard category={category}/>
                                    ))}
                                
                            </div>
                            
                            </div>
                          
                        ) : (
                            <div>
                                <Loader/>
                            </div>
                        )
                    }
                </div>

            </div>
            
           
            
        )
    }
}
export default Categories;