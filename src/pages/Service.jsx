import React,{Component} from "react";
import ServiceCard from '../components/ServiceCard';
import axios from 'axios';
import { useState , useEffect} from 'react';
//import '../App.css';




class Service extends Component{
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
        this.setState({service : data}); }
      
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
                <p className="text-3xl">Services</p>
                {
                    this.state.service?.length>0
                    ?(
                        <div className=" flex justify-center items-center flex-wrap">
                            
                                {this.state.service.map((service)=>(
                                    <ServiceCard service={service}/>
                                ))}
                            
                        </div>
                    ): (
                        <div className="empty">
                            <h2>No services found</h2>
                            
                        </div>
                        
                    )
                }
               
            </div>
            
           
            
        )
    }
}
export default Service;