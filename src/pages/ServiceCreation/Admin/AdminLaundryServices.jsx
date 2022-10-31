import React,{Component} from "react";
import axios from 'axios';
import ServiceCard from "../../../components/ServiceCreation/AdminServiceCard";
import Loader from '../../../components/ServiceCreation/Loader';







class LaundryService extends Component{
    constructor(props){
      super(props);
      this.state ={
        services : []
      };
      
    }
    componentDidMount(){
      axios.get("http://localhost:8080/findAllLaundryC")
      .then(response => response.data)
      .then((data) => {
        this.setState({services : data}); }
      
      );
    }


    render(){
        
        return(
            <div className=" h-screen">
                <div className="h-full overflow-scroll">
                <div className="border-2 border-gray-300 bg-white rounded-lg m-2">
                <p className="text-2xl p-2 m-2">Laundry Services</p>
                <hr className="bg-gray-400 m-2"/>
                </div>
                
                {
                    this.state.services?.length>0
                    ?(
                        <div>
                        <div className=" flex justify-center items-center flex-wrap border-2 border-gray-300 bg-white rounded-lg m-2">
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
            </div>
            
           
            
        )
    }
}
export default LaundryService;