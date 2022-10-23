import React, { Component } from 'react'
import ZoneService from '../services/ZoneService';


class CreateZoneComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            no: this.props.match.params.no,
            // Zones: [],
            id: '',
            area: '',
            zone: ''
        }
        this.changeIdHandler = this.changeIdHandler.bind(this);
        this.changeAreaHandler = this.changeAreaHandler.bind(this);
        this.changeZoneHandler = this.changeZoneHandler.bind(this);
        this.saveZone = this.saveZone.bind(this);
    }

    saveZone = (e) => {
        e.preventDefault();
        let ZoneInformation = { id: this.state.id, area: this.state.area, zone: this.state.zone };
        console.log('ZoneInformation => ' + JSON.stringify(ZoneInformation));

        if (this.state.no === '_add') {
            ZoneService.createZones(ZoneInformation).then(res => {
                alert(res.data);
                this.props.history.push('/zones');
            });
        }
    }

    // componentDidMount() {
    //     ZoneService.getZones().then((res) => {
    //         this.setState({ Zones: res.data });
    //     });
    // }
    changeIdHandler = (event) => {
        this.setState({ id: event.target.value });
    }

    changeAreaHandler = (e) => {
        const index = e.target.selectedIndex;
        console.log(index)
        const el = e.target.childNodes[index]
        console.log(el)
        const option = el.getAttribute('id');
        console.log(option)
        this.setState({ area: option });
    }

    changeZoneHandler = (event) => {
        this.setState({ zone: event.target.value });
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
                                        <input placeholder="Id" name="Id" className="form-control"
                                            value={this.state.id} onChange={this.changeIdHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Area: </label>
                                        <select name="area" onChange={this.changeAreaHandler} className="form-control" >

                                            <option id="Ampara" value="Ampara" > Ampara </option>
                                            <option id="Anuradhapura" value="Anuradhapura" > Anuradhapura </option>
                                            <option id="Badulla" value="Badulla" > Badulla </option>
                                            <option id="Batticaloa" value="Batticaloa" > Batticaloa </option>
                                            <option id="Colombo" value="Colombo" > Colombo </option>
                                            <option id="Galle" value="Galle" > Galle </option>
                                            <option id="Gampaha" value="Gampaha" > Gampaha </option>
                                            <option id="Hambantota" value="Hambantota" > Hambantota </option>
                                            <option id="Jaffna" value="Jaffna" > Jaffna </option>
                                            <option id="Kalutara" value="Kalutara" > Kalutara </option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label> Zone: </label>


                                        {/* <select name="Zone" id="Zone" className="form-control">
                                            {
                                                this.state.Zones.map(
                                                    zone =>
                                                       
                                                            <option value={zone.id}> {zone.area} </option>
                                                        
                                                )
                                            }
                                        </select> */}
                                        <input placeholder="Zone" name="Zone" className="form-control"
                                            value={this.state.zone} onChange={this.changeZoneHandler} />
                                    </div>
                                    <div style={{ minHeight: "10px" }}>

                                    </div>
                                    <button className="btn btn-success" onClick={this.saveZone}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div >
            </div >
        )
    }
}

export default CreateZoneComponent
