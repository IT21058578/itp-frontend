import React, { Component } from 'react'
import ToBeAssignservice from '../services/ToBeAssignservice';
import ZoneService from '../services/ZoneService';

class CreateToBeAssigned extends Component {
    constructor(props) {
        super(props)

        this.state = {
            no: this.props.match.params.no,
            Zones:[],
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

    saveToAssign = (e) => {
        e.preventDefault();
        let AssignData = { bookingId: this.state.bookingId, date: this.state.date, time: this.state.time, zone: this.state.zone, address: this.state.address, crewId: this.state.crewId, crewMembers: this.state.crewMembers };
        console.log('AssignData => ' + JSON.stringify(AssignData));

        if (this.state.no === '_add') {
            ToBeAssignservice.createToBeAssign(AssignData).then(res => {
                alert(res.data);
                this.props.history.push('/toBeAssigns');
            });
        }
    }

    componentDidMount() {
        ZoneService.getZones().then((res) => {
            this.setState({ Zones: res.data });
        });
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
    changeZoneHandler = (e) => {
        const index = e.target.selectedIndex;
        console.log(index)
        const el = e.target.childNodes[index]
        console.log(el)
        const option = el.getAttribute('id');
        console.log(option)
        this.setState({ zone: option });
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
        this.props.history.push('/toBeAssigns');
    }


    render() {
        return (
            <div >

                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Add toBeAssigns Information</h3>
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
                                        <select name="Zone" onChange={this.changeZoneHandler} className="form-control" >
                                            <option value="Select one"> Select one </option>
                                            {

                                                this.state.Zones.map(
                                                    zone1 =>
                                                        <option id={zone1.zone} value={zone1.zone} > {zone1.zone} </option>
                                                )

                                            }
                                        </select>
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

export default CreateToBeAssigned
