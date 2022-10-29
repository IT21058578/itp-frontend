import React,{Component} from "react";
import axios from 'axios';
import ServiceCard from "../../../components/ServiceCreation/ServiceCard";
import Loader from '../../../components/ServiceCreation/Loader';







class ResturantCleaning extends Component{
    constructor(props){
      super(props);
      this.state ={
        services : []
      };
      
    }
    componentDidMount(){
      axios.get("http://localhost:8080/findAllRestaurantC")
      .then(response => response.data)
      .then((data) => {
        this.setState({services : data}); }
      
      );
    }


    render(){
        
        return(
            <div className="">
                <p className="text-3xl"></p>
                {
                    this.state.services?.length>0
                    ?(
                        <div>
                        <div className=" flex justify-center items-center flex-wrap">
                                {this.state.services.map((service)=>(
                                    <ServiceCard service={service}/>
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
            
           
            
        )
    }
}
export default ResturantCleaning;