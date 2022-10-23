import React, { Component } from 'react'
import CrewService from '../services/CrewService';
import ZoneService from '../services/ZoneService';

class CreateCrewsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            no: this.props.match.params.no,
            Zones: [],
            id: '',
            crewId: '',
            employeeId: '',
            employeeName: '',
            zone: ''
        }
        this.changeIdHandler = this.changeIdHandler.bind(this);
        this.changeCrewIdHandler = this.changeCrewIdHandler.bind(this);
        this.changeEmployeeIdHandler = this.changeEmployeeIdHandler.bind(this);
        this.changeEmployeeNameHandler = this.changeEmployeeNameHandler.bind(this);
        this.changeZoneHandler = this.changeZoneHandler.bind(this);
        this.saveCrew = this.saveCrew.bind(this);
    }

    saveCrew = (e) => {
        e.preventDefault();
        let CrewData = { id: this.state.id, crewId: this.state.crewId, employeeId: this.state.employeeId, employeeName: this.state.employeeName, zone: this.state.zone };
        console.log('CrewData => ' + JSON.stringify(CrewData));

        if (this.state.no === '_add') {
            CrewService.createCrews(CrewData).then(res => {
                alert(res.data);
                this.props.history.push('/crews');
            });
        }
    }

    componentDidMount() {
        ZoneService.getZones().then((res) => {
            this.setState({ Zones: res.data });
        });
    }
    changeIdHandler = (event) => {
        this.setState({ id: event.target.value });
    }

    changeCrewIdHandler = (event) => {
        this.setState({ crewId: event.target.value });
    }

    changeEmployeeIdHandler = (event) => {
        this.setState({ employeeId: event.target.value });
    }
    changeEmployeeNameHandler = (event) => {
        this.setState({ employeeName: event.target.value });
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

    cancel() {
        this.props.history.push('/zones');
    }


    render() {
        return (
            <div >

                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Add Zone Information</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Id: </label>
                                        <input placeholder="id" name="Id" className="form-control"
                                            value={this.state.id} onChange={this.changeIdHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Crew Id: </label>
                                        <input placeholder="crew Id" name="crewId" className="form-control"
                                            value={this.state.crewId} onChange={this.changeCrewIdHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Employee Id: </label>
                                        <input placeholder="employee Id" name="employeeId" className="form-control"
                                            value={this.state.employeeId} onChange={this.changeEmployeeIdHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Employee Name: </label>
                                        <input placeholder="employee Name" name="employeeName" className="form-control"
                                            value={this.state.employeeName} onChange={this.changeEmployeeNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Zone: </label>
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
                                    <div style={{ minHeight: "10px" }}>

                                    </div>
                                    <button className="btn btn-success" onClick={this.saveCrew}>Save</button>
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

export default CreateCrewsComponent
