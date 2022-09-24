import React,{Component} from "react";
import axios from 'axios';
import { useState , useEffect} from 'react';
import ScHcBookingComp from '../components/ScHcBookingComp';
//import '../App.css';




class ScHcBooking extends Component{
    constructor(props){
      super(props);
      this.state ={
        prices : []
      };
      
    }
    componentDidMount(){
      axios.get("http://localhost:8080/getHcBasicPrices")
      .then(response => response.data)
      .then((data) => {
        this.setState({prices : data}); }
      
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
                
                {
                    
                        <div className=" flex justify-center items-center flex-wrap">
                            
                            <div>
                                {this.state.prices.map((price) => (
                                  <ScHcBookingComp price={price} />
                                ))}
                            </div>
                            
                        </div>
                    
                }
               
            </div>
            
           
            
        )
    }
}
export default ScHcBooking;
