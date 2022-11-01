import React,{Component} from "react";
import axios from 'axios';
import ServiceRequestCard from '../../../components/ServiceCreation/ServiceRequestCard';
import Loader from "../../../components/ServiceCreation/Loader";





class ScAdminServiceReq extends Component {
    constructor(props){
        super(props);
        this.state ={
          req : []
        };
        
      }
      componentDidMount(){
        axios.get("http://localhost:8080/findAllRequestedServices")
        .then(response => response.data)
        .then((data) => {
          this.setState({req : data}); }
        
        );
        //axios.put("http://localhost:8080/update/10",
        //  {
        //      name: "update",
        //      description: "update"
        //  }
        //)
        //.then((res) => console.log(res))
        //.catch((err) => console.log(err));
      }
  
  
      render(){
        
          
          return(
              <div className=" m-5 ">
                  <p className="text-3xl"></p>
                  {
                      this.state.req?.length>0
                      ?(
                          <div>
                            <div className="h-screen overflow-scroll border-2 border-gray-300 shadow-lg bg-white">
                                
                                    {this.state.req.map((request)=>(
                                        <ServiceRequestCard request={request}/>
                                    ))}
                                
                            </div>
                            
                          </div>
                      ): (
                          <div className="empty">
                              <Loader/>
                              
                          </div>
                          
                      )
                  }
  
                 
              </div>
              
             
              
          )
      }
  }
export default ScAdminServiceReq;
