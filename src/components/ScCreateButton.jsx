import React, {Component} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Link} from "react-router-dom"

class ScCreateButton extends Component{
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
      
    })
    .then(() => console.log("length of array :",this.state.service.length));
    
    
  }
  createIdArray({service}){
      var idArray=[];
      var i;
      for(i=0; i<this.state.service.length; i++){
        idArray[i]=service.id;
        console.log("id array: ");
      };
  };
  
  
  render(){
      

    return (
      <div>
        <Link to ="/create" state={{

        }}>
          <button 
          className=" hover:bg-green-600 items-center bg-green-500 text-white font-medium rounded-md px-5 py-3 text-2xl" 
          onClick={2} >
            + Create
          </button>
        </Link>
      </div>
    )
  }
}

export default ScCreateButton;
