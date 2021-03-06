import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import { NavLink } from "react-router-dom";

import "./index.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";
import SmurfCard from "./components/SmurfCard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3333/smurfs`)
      .then(res => {
        this.setState({
          smurfs: res.data
        });
      })
      .catch(err => console.log(err));
  }

  addNewSmurf = data => {
    axios
      .post(`http://localhost:3333/smurfs`, data)
      .then(res => {
        this.setState({
          smurfs: res.data
        });
      })
      .catch(err => console.log(err));
  };

  deleteSmurf = id => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => {
        this.setState({
          smurfs: res.data
        });
      })
      .catch(err => console.log(err));
  };

  updateSmurf = (data, id) => {
    axios
      .put(`http://localhost:3333/smurfs/${id}`, data)
      .then(res => {
        this.setState({
          smurfs: res.data
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <nav className="nav-bar">
          <h1>-</h1>
          <NavLink to="/">Home</NavLink>
          <h1>-</h1>
          <NavLink to="/add-smurf">Add New Smurf</NavLink>
          <h1>-</h1>
        </nav>

        <Route
          exact
          path="/add-smurf"
          render={props => (
            <SmurfForm
              {...props}
              addNewSmurf={this.addNewSmurf}
              smurfs={this.state.smurfs}
            />
          )}
        />

        <Route
          exact
          path="/update-smurf/:id"
          render={props => (
            <SmurfForm
              {...props}
              smurfs={this.state.smurfs}
              updateSmurf={this.updateSmurf}
              update // update===true
            />
          )}
        />

        <Route
          exact
          path="/"
          render={props => <Smurfs {...props} smurfs={this.state.smurfs} />}
        />

        <Route
          exact
          path="/smurf/:id"
          render={props => (
            <SmurfCard
              {...props}
              smurfs={this.state.smurfs}
              deleteSmurf={this.deleteSmurf}
            />
          )}
        />
      </div>
    );
  }
}

export default App;