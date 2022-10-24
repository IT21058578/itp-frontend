import React, { Component } from 'react'
import AssignedService from '../services/AssignedService';
import ZoneService from '../services/ZoneService';

class CreateAssigned extends Component {
    constructor(props) {
        super(props)

        this.state = {
            no: this.props.match.params.no,
            bookingId: '',
            date: '',
            time: '',
            zone: '',
            address: '',
            crewId: '',
            crewMembers: ''
        }
        this.changeBookingIdHandler = this.changeBookingIdHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.changeTimeHandler = this.changeTimeHandler.bind(this);
        this.changeZoneHandler = this.changeZoneHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeCrewIdHandler = this.changeCrewIdHandler.bind(this);
        this.changeCrewMembersHandler = this.changeCrewMembersHandler.bind(this);
        this.saveToAssign = this.saveToAssign.bind(this);
    }
    componentDidMount() {

        if (this.state.no === '_add') {
            return
        } else {
            AssignedService.getAssignById(this.state.no).then((res) => {
                let assign = res.data;
                this.setState({
                    bookingId: assign.bookingId,
                    date: assign.date,
                    time: assign.time,
                    zone: assign.zone,
                    address: assign.address,
                    crewId:assign.crewId,
                    crewMembers: assign.crewMembers
                });
            });
        }
    }

    saveToAssign = (e) => {
        e.preventDefault();
        let AssignData = { bookingId: this.state.bookingId, date: this.state.date, time: this.state.time, zone: this.state.zone, address: this.state.address, crewId: this.state.crewId, crewMembers: this.state.crewMembers };
        console.log('AssignData => ' + JSON.stringify(AssignData));

        if (this.state.no === '_add') {
            AssignedService.createAssign(AssignData).then(res => {
                alert(res.data);
                this.props.history.push('/assigned');
            });
        }  else {
            AssignedService.updateAssign(AssignData, this.state.bookingId).then(res => {
                alert(res.data);
                this.props.history.push('/assigned');
            });
        }
    }
   
    changeBookingIdHandler = (event) => {
        this.setState({ bookingId: event.target.value });
    }

    changeDateHandler = (event) => {
        this.setState({ date: event.target.value });
    }

    changeTimeHandler = (event) => {
        this.setState({ time: event.target.value });
    }
    changeZoneHandler = (event) => {
        this.setState({ zone: event.target.value });
    }

    changeAddressHandler = (event) => {
        this.setState({ address: event.target.value });
    }

    changeCrewIdHandler = (event) => {
        this.setState({ crewId: event.target.value });
    }
    changeCrewMembersHandler = (event) => {
        this.setState({ crewMembers: event.target.value });
    }

    cancel() {
        this.props.history.push('/assigned');
    }
    getTitle() {
        if (this.state.no === '_add') {
            return <h3 className="text-center">Add Assigned Information</h3>
        } else {
            return <h3 className="text-center">Update Assigned Information</h3>
        }
    }

    render() {
        return (
            <div >

                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                
                                    <div className="form-group">
                                        <label> BookingId: </label>
                                        <input placeholder="Booking Id" name="bookingId" className="form-control"
                                            value={this.state.bookingId} onChange={this.changeBookingIdHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Date: </label>
                                        <input placeholder="Date" name="date" type="date" className="form-control"
                                            value={this.state.date} onChange={this.changeDateHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>  time: </label>
                                        <input placeholder="Time " name="time" type="time" className="form-control"
                                            value={this.state.time} onChange={this.changeTimeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>  Zone: </label>
                                        <input placeholder="Zone" name="zone" className="form-control"
                                            value={this.state.zone} onChange={this.changeZoneHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Address: </label>
                                        <input placeholder=" Address" name="address" className="form-control"
                                            value={this.state.address} onChange={this.changeAddressHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>  Crew Id: </label>
                                        <input placeholder="Crew Id" name="crewId" className="form-control"
                                            value={this.state.crewId} onChange={this.changeCrewIdHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Crew Members: </label>
                                        <input placeholder="Crew Members" name="crewMembers" className="form-control"
                                            value={this.state.crewMembers} onChange={this.changeCrewMembersHandler} />
                                    </div>
                                    <div style={{ minHeight: "10px" }}>

                                    </div>
                                    <button className="btn btn-success" onClick={this.saveToAssign}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateAssigned
