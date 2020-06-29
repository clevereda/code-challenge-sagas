import React, { Component } from 'react';
import AnimalList from '../AnimalList/AnimalList';
import AnimalForm from '../AnimalForm/AnimalForm';
import './App.css';
import {connect} from 'react-redux';
import { HashRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  // Renders the entire app on the DOM
  componentDidMount () {
      this.props.dispatch({type: 'GET_ZOO_ANIMALS'});
  }


  render() {
    return (
      <div className="App">
        <Router>
          <header>
            <h1>Zoo Animals</h1>
            <h3>List of Species and Class</h3>
          </header>
          <br />
          <br />
          <Route exact path="/" component={AnimalList} />
          <Route exact path="/form" component={AnimalForm} />
        </Router>
      </div>
    );
  }
}

export default connect() (App);
