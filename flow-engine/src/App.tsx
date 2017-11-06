import * as React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'react-bootstrap';

//const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <Button bsSize="large" bsStyle="primary" className="col-md-12">Rules</Button>
              </div>
              <div className="col-md-4">
                <Button bsSize="large" bsStyle="success" className="col-md-12">Data</Button>
              </div>
              <div className="col-md-4">
                <Button bsSize="large" bsStyle="warning" className="col-md-12">Fire</Button>
              </div>
            </div>
          </div>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
