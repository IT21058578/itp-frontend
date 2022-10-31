import React,{Component} from "react";
import CategoryCard from "../../../components/ServiceCreation/AdminCategoryCard";
import axios from 'axios';
import ServiceCreateButton from "../../../components/ServiceCreation/ServiceCreationButton";
import ServiceRequestControlButton from "../../../components/ServiceCreation/ServiceRequestControlButton";
import Loader from '../../../components/ServiceCreation/Loader';



//import '../App.css';

class AdminPanel extends Component{
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
        this.setState({categories : data});
        
      });
      
    }


    
    
    render(){
        
        
        return(
            <div className="">

                <div className="mx-20 ">
                {
                
                    this.state.categories?.length>0
                    
                    ?(
                        <div className="h-screen overflow-scroll ">
                            <div className="gride border-2 border-gray-300 rounded-lg m-2 bg-white">
                                <div className="">
                                    <p className="text-2xl p-2">Categories and Servicse control panel</p>
                                </div>
                                <div className=" flex flex-wrap justify-end">
                                    <div className="m-2">
                                        <ServiceCreateButton/>
                                    </div>
                                    <div className="m-2">
                                        <ServiceRequestControlButton/>
                                    </div>
                                </div>
                                

                            </div>
                        <div className=" h-full justify-center items-center bottom-52 border-2 border-gray-300 rounded-lg bg-white m-2">
                            

                            
                            <div className="flex justify-center items-center flex-wrap">
                            
                                {this.state.categories.map((category)=>(
                                    <CategoryCard category={category}/>
                                    
                                ))}
                                
                            </div>
                            
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
export default AdminPanel;