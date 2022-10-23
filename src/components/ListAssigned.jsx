import React, { Component } from 'react'
import AssignedService from '../services/AssignedService';
import CustomerFooter from './CustomerFooter';
import Header from './Header';
class ListAssigned extends Component {

    constructor(props) {
        super(props)

        this.state = {
            Assigneds: []
        }
        this.addAssigned = this.addAssigned.bind(this);
        this.editAssigned = this.editAssigned.bind(this);
        this.deleteAssign = this.deleteAssign.bind(this);
        
    }

    deleteAssign(id) {
        AssignedService.deleteAssign(id).then(res => {
            this.setState({ Assigneds: this.state.Assigneds.filter(assigned => assigned.bookingId !== id) });
        });
    }
    addAssigned() {
        this.props.history.push('/add-assigned/_add');
    }
    editAssigned(id) {
        this.props.history.push(`/add-assigned/${id}`);
    }
    componentDidMount() {
        AssignedService.getAssign().then((res) => {
            this.setState({ Assigneds: res.data });
        });
    }


    render() {
        return (
            <div>
                <Header/>
 
                <h2 className="text-center">Assigneds</h2>

                <br></br>
                <div style={{ float: 'left',marginLeft:'20%', minWidth: '50%' }} >
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
                                this.state.Assigneds.map(
                                    assigned =>
                                        <tr key={assigned.bookingId}>
                                            <td> {assigned.bookingId} </td>
                                            <td> {assigned.date} </td>
                                            <td> {assigned.time}</td>
                                            <td> {assigned.zone} </td>
                                            <td> {assigned.address} </td>
                                            <td> {assigned.crewId}</td>
                                            <td> {assigned.crewMembers}</td>
                                            <td>
                                                <button onClick={() => this.editAssigned(assigned.bookingId)} className="btn btn-info">Update </button>
                                            </td>
                                            <td>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteAssign(assigned.bookingId)} className="btn btn-danger">Delete </button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div class="col text-center ">
                        <button onClick={this.addAssigned} className="btn btn-primary ">Add New</button>

                    </div>
                </div>
                
            </div>
        )
    }
}


export default ListAssigned