import React, { Component } from 'react'
import CrewService from '../services/CrewService';
import CustomerFooter from './CustomerFooter';
import Header from './Header';
class ListCrewsComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            Crews: []
        }
        this.addCrew = this.addCrew.bind(this);
        this.deleteCrews = this.deleteCrews.bind(this);
    }

    deleteCrews(id) {
        CrewService.deleteCrews(id).then(res => {
            this.setState({ Crews: this.state.Crews.filter(crews => crews.id !== id) });
        });
    }


    addCrew() {
        this.props.history.push('/add-crew/_add');
    }
    componentDidMount() {
        CrewService.getCrews().then((res) => {
            this.setState({ Crews: res.data });
        });
    }


    render() {
        return (
            <div>
                <Header />
                

                <h2 className="text-center">Crews</h2>

                <br></br>
                <div style={{  minWidth: '50%' }} >
                    <table className="table table-striped table-bordered text-center">

                        <thead >
                            <tr>
                                <th> crew Id</th>
                                <th> employee Id</th>
                                <th> employee Name</th>
                                <th> zone</th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.Crews.map(
                                    Crew =>
                                        <tr key={Crew.id}>
                                            <td> {Crew.crewId} </td>
                                            <td> {Crew.employeeId}</td>
                                            <td> {Crew.employeeName} </td>
                                            <td> {Crew.zone}</td>
                                            <td>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteCrews(Crew.id)} className="btn btn-danger">Delete </button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div class="col text-center ">
                        <button onClick={this.addCrew} className="btn btn-primary ">Add New</button>

                    </div>
                </div>
                <div>
                 
                </div>
            </div>
        )
    }
}


export default ListCrewsComponent