import React, { Component } from 'react'
import ToBeAssignservice from '../services/ToBeAssignservice';
import Header from './Header';
import CustomerFooter from './CustomerFooter';

class ListToBeAssigned extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ToBeAssigns: []
        }
        this.addToBeAssign = this.addToBeAssign.bind(this);
        this.deleteToBeAssign = this.deleteToBeAssign.bind(this);
    }

    deleteToBeAssign(id) {
        ToBeAssignservice.deleteToBeAssign(id).then(res => {
            this.setState({ ToBeAssigns: this.state.ToBeAssigns.filter(toBeAssigns => toBeAssigns.bookingId !== id) });
        });
    }
    addToBeAssign() {
        this.props.history.push('/add-toBeAssign/_add');
    }
    componentDidMount() {
        ToBeAssignservice.getToBeAssign().then((res) => {
            this.setState({ ToBeAssigns: res.data });
        });
    }


    render() {
        return (
            
            <div>
                <Header/>
    
                <h2 className="text-center">ToBeAssigns</h2>

                <br></br>
                <div style={{ float: 'left', marginLeft: '20%', minWidth: '50%' }} >
                    <table className="table table-striped table-bordered text-center">

                        <thead >
                            <tr>
                                <th> Booking Id</th>
                                <th> Date</th>
                                <th> Time </th>
                                <th> Zone</th>
                                <th> Address</th>
                                <th> CrewId </th>
                                <th> CrewMembers</th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.ToBeAssigns.map(
                                    toBeAssign =>
                                        <tr key={toBeAssign.bookingId}>
                                            <td> {toBeAssign.bookingId} </td>
                                            <td> {toBeAssign.date} </td>
                                            <td> {toBeAssign.time}</td>
                                            <td> {toBeAssign.zone} </td>
                                            <td> {toBeAssign.address} </td>
                                            <td> {toBeAssign.crewId}</td>
                                            <td> {toBeAssign.crewMembers}</td>
                                            <td>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteToBeAssign(toBeAssign.bookingId)} className="btn btn-danger">Delete </button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div class="col text-center ">
                        <button onClick={this.addToBeAssign} className="btn btn-primary ">Add New</button>

                    </div>
                </div>
              
            </div>
        )
    }
}


export default ListToBeAssigned