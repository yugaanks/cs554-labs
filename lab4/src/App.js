import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Pokemon from "./Pokemon";
import Berries from "./Berries";
import Machines from "./Machines";

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <h1 className="App-title"><Link to="/">Pokedex</Link></h1>
          </div>
          <div className="App-body">
            <div>
              <h2> 
                <Link to="/pokemon/page/0">Pokemon</Link> 
              </h2>
              <p>Abilities provide passive effects for Pokémon in battle or in the overworld. Pokémon have multiple possible abilities but can have only one ability at a time</p>
            </div>
            <div>
              <h2> 
                <Link to="/berries/page/0">Berry</Link> 
              </h2>
              <p>Berries are small fruits that can provide HP and status condition restoration, stat enhancement, and even damage negation when eaten by Pokémon</p>
            </div>
            <div>
              <h2> 
                <Link to="/machines/page/0">Machine</Link> 
              </h2>
              <p>Machines are the representation of items that teach moves to Pokémon. They vary from version to version, so it is not certain that one specific TM or HM corresponds to a single Machine</p>
            </div>
          </div>
          <div>
              <Switch>

                <Route path="/pokemon/page/:page" component={Pokemon} />
                <Route path="/pokemon/:id" component={Pokemon} />
                <Route path="/berries/page/:page" component={Berries} />
                <Route path="/berries/:id" component={Berries} />
                <Route path="/machines/page/:page" component={Machines} />
                <Route path="/machines/:id" component={Machines} />
                
              </Switch>
            </div>
        </div>
      </Router>  
    );
  }
}

export default App;
