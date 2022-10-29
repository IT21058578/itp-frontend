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
            
            <div className="min-h-screen flex flex-col ">

                <div className="">
                    <p className="text-3xl"></p>
                    {
                        this.state.categories?.length>0
                        ?(
                            <div>
                            <div className=" flex justify-center items-center flex-wrap">
                                
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