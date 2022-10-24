import React, { Component } from 'react'
import ZoneService from '../services/ZoneService';
import map from '../img/Map.jpg'
import CustomerFooter from './CustomerFooter';
import Header from './Header';

class ListZoneComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            Zones: []
        }
        this.addZone = this.addZone.bind(this);
        this.deleteZone = this.deleteZone.bind(this);
    }

    deleteZone(id) {
        ZoneService.deleteZones(id).then(res => {
            this.setState({ Zones: this.state.Zones.filter(zone => zone.id !== id) });
        });
    }

    addZone() {
        this.props.history.push('/add-zone/_add');
    }
    componentDidMount() {
        ZoneService.getZones().then((res) => {
            this.setState({ Zones: res.data });
        });
    }


    render() {
        return (
            <div>
                <Header/>
               
                <h2 className="text-center">Zones</h2>

                <br></br>
                <div style={{ float: 'left', marginLeft: '40px', minWidth: '50%' }} >
                    <table className="table table-striped table-bordered text-center">

                        <thead >
                            <tr>
                                <th> Area</th>
                                <th> Zone</th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.Zones.map(
                                    zone =>
                                        <tr key={zone.id}>
                                            <td> {zone.area} </td>
                                            <td> {zone.zone}</td>
                                            <td>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteZone(zone.id)} className="btn btn-danger">Delete </button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div class="col text-center ">
                        <button onClick={this.addZone} className="btn btn-primary ">Add Zone </button>

                    </div>
                </div>
                <div class="col text-center ">
                    <img class="border border-secondary" src={map} alt="map" />

                </div>


                <CustomerFooter/>
            </div>
        )
    }
}


export default ListZoneComponent