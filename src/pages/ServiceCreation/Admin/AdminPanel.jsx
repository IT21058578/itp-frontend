import React,{Component} from "react";
import CategoryCard from "../../../components/ServiceCreation/AdminCategoryCard";
import axios from 'axios';
import ServiceCreateButton from "../../../components/ServiceCreation/ServiceCreationButton";
import ServiceRequestControlButton from "../../../components/ServiceCreation/ServiceRequestControlButton";
import Loader from '../../../components/ServiceCreation/Loader';
import NoService from "../NoServices";


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

                <div className="mx-40">
                {
                
                    this.state.categories?.length>0
                    
                    ?(
                        <div>
                            <div className="gride justify-items-end">
                                <div className="m-2">
                                    <ServiceCreateButton/>
                                </div>
                                <div className="m-2">
                                    <ServiceRequestControlButton/>
                                </div>
                            </div>
                        <div className="w-full h-full justify-center items-center bottom-52">
                            

                            
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