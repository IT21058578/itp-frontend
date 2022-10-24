import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ListZoneComponent from './components/ListZoneComponent';
import CreateZoneComponent from './components/CreateZoneComponent';
import ListCrewsComponent from './components/ListCrewsComponent';
import CreateCrewsComponent from './components/CreateCrewsComponent';
import ListToBeAssigned from './components/ListToBeAssigned';
import CreateToBeAssigned from './components/CreateToBeAssigned';
import ListAssigned from './components/ListAssigned';
import CreateAssigned from './components/CreateAssigned';
function App() {
  return (
    <div>
      <Router>

        <div className="container">
          <Switch>

            <Route exact path="/" component={ListZoneComponent} />
            <Route exact path="/add-zone/:no" component={CreateZoneComponent} />
            <Route path="/zones" component={ListZoneComponent}></Route>
            <Route path="/crews" component={ListCrewsComponent}></Route>
            <Route exact path="/add-crew/:no" component={CreateCrewsComponent} />
            <Route path="/toBeAssigns" component={ListToBeAssigned}></Route>
            <Route path="/add-toBeAssign/:no" component={CreateToBeAssigned}></Route>
            <Route path="/assigned" component={ListAssigned}></Route>
            <Route path="/add-assigned/:no" component={CreateAssigned}></Route>

          </Switch>
        </div>

      </Router>
    </div>
  );
}

export default App;
