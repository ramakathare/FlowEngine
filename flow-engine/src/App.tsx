import * as React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'react-bootstrap';
import { IState } from './Interfaces';
import { Defaults } from './Defaults';
import { Validator } from './Validator';

//const logo = require('./logo.svg');


interface IProps {
  height?: number
}
class App extends React.Component<IProps, IState> {
  defaultRules = Defaults.defaultRules;
  defaultData = Defaults.defaultData;

  prettyPrintedValue : string;
  constructor(props: any) {
    super(props);
    this.state = {
      rules: this.defaultRules,
      data: this.defaultData,
      show: {
        rules: true,
        data: false,
        result: false
      },
      other: {
        height: props.height
      },
      rulesString :JSON.stringify(this.defaultRules,undefined,2),
      dataString : JSON.stringify(this.defaultData,undefined,2)
    };

    this.rulesClicked = this.rulesClicked.bind(this);
    this.dataClicked = this.dataClicked.bind(this);
    this.fireClicked = this.fireClicked.bind(this);
    this.ruleChanged = this.ruleChanged.bind(this);
    this.dataChanged = this.dataChanged.bind(this);
    
  }
  componentWillMount() {
    this.setState(prevState => {
      prevState.other.height = window.innerHeight;
      return prevState;
    });
  }
  rulesClicked(e:any) {
    this.setState(prevState => {
      this.hideAll(prevState);
      prevState.show["rules"] = true;
      return prevState;
    });
    
  }
  dataClicked(e:any) {
    this.setState(prevState => {
      this.hideAll(prevState);
      prevState.show["data"] = true;
      return prevState;
    });
  }
  fireClicked(e:any) {
    this.setState(prevState => {
      this.hideAll(prevState);
      prevState.show["result"] = true;
      return prevState;
    });
  }
  hideAll(state:IState) {
    for (let key in state.show) {
      this.state.show[key] = false;
    }
  }
  setStyle() {
    return {
      height: (this.state.other.height - 60 - 10) + "px",
      width: "99%",
      "font-family": "Courier New",
      "font-weight": "bold",
      "font-size": "20px"
    };
  }
  prettyPrint(){
    return JSON.stringify(this.state.rules,undefined,2);
  }
  ruleChanged(e:any){
    let json = e.target.value;
    let parsedJson:any;
    let valid:boolean = false;
    try{
      parsedJson = JSON.parse(json);
      valid = Validator.validateRules(parsedJson);
      console.log("Valid",valid);
    }catch(ex){
      console.log(ex);
    }finally{
      
    }
    
    this.setState(prevState => {
      prevState.rulesString = json;
      prevState.rules = parsedJson;
      return prevState;
    });
  }

  dataChanged(e:any){
    let json = e.target.value;
    let parsedJson:any;
    let valid:boolean = false;
    try{
      parsedJson = JSON.parse(json);
      valid = Validator.validateData(parsedJson);
      console.log("Valid",valid);
    }catch(ex){
      console.log(ex);
    }finally{
      
    }
    this.setState(prevState => {
      prevState.dataString = json;
      prevState.data = parsedJson;
      return prevState;
    });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="col-md-4">
            <Button bsSize="large" bsStyle="primary" className="col-md-12" onClick={this.rulesClicked}>Rules</Button>
          </div>
          <div className="col-md-4">
            <Button bsSize="large" bsStyle="success" className="col-md-12" onClick={this.dataClicked}>Data</Button>
          </div>
          <div className="col-md-4">
            <Button bsSize="large" bsStyle="warning" className="col-md-12" onClick={this.fireClicked}>Run</Button>
          </div>
        </div>
        <div className="App-footer">
          <div className={this.state.show.rules ? '' : 'Display-None'}>
            <textarea onChange={this.ruleChanged} defaultValue={this.state.rulesString} style={this.setStyle()} />
          </div>
          <div className={this.state.show.data ? '' : 'Display-None'}>
          <textarea onChange={this.dataChanged} defaultValue={this.state.dataString} style={this.setStyle()} />
          </div>
          <div className={this.state.show.result ? '' : 'Display-None'}>
            result
          </div>
        </div>
      </div>
    );
  }
}

export default App;
