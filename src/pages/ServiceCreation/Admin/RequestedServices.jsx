import React,{Component} from "react";
import axios from 'axios';
import ServiceRequestCard from '../../../components/ServiceCreation/ServiceRequestCard';





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
              <div className="">
                  <p className="text-3xl"></p>
                  {
                      this.state.req?.length>0
                      ?(
                          <div>
                            <div className=" ">
                                
                                    {this.state.req.map((request)=>(
                                        <ServiceRequestCard request={request}/>
                                    ))}
                                
                            </div>
                            
                          </div>
                      ): (
                          <div className="empty">
                              <p>No new service request</p>
                              
                          </div>
                          
                      )
                  }
  
                 
              </div>
              
             
              
          )
      }
  }
export default ScAdminServiceReq;
