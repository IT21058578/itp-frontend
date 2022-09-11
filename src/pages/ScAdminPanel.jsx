import React,{Component} from "react";
import ScAdminContent from '../ScAdminContent';
import axios from 'axios';
//import PopupUpdate from "../components/PopupUpdate";
import ScAdminContentCreate from "../ScAdminContentCreate";

//import '../App.css';

class ScAdminPanel extends Component{
    constructor(props){
      super(props);
      this.state ={
        service : []
      };
      
    }
    componentDidMount(){
      axios.get("http://localhost:8080/findAllCategories")
      .then(response => response.data)
      .then((data) => {
        this.setState({service : data});
        
      });
      
    }
    
    render(){
        
        
        return(
            <div className="">

                {
                
                    this.state.service?.length>0
                    ?(
                        <div>
                            <div className=" grid justify-items-end m-14">
                                <div className="">
                                    <ScAdminContentCreate/>
                                </div>
                            </div>
                        <div className="w-full h-full justify-center items-center bottom-52 mx-22">
                            

                            
                            <div className="justify-center relative">
                            
                                {this.state.service.map((service)=>(
                                    <ScAdminContent service={service}/>
                                    
                                ))}
                                
                            </div>
                            
                        </div>
                        </div>
                    ): (
                        <div className="empty">
                            <h2>No services found</h2>
                            
                        </div>
                        
                    )
                }
               <div>
               
               </div>
            </div>
            
           
            
        )
    }
}
export default ScAdminPanel;