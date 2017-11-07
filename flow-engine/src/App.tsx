import * as React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Nav, NavItem, Panel, FormGroup, FormControl, ControlLabel, Accordion } from 'react-bootstrap';
import { IState, IRule } from './Interfaces';
import { Defaults } from './Defaults';
import { Validator } from './Validator';

//const logo = require('./logo.svg');


interface IProps {
  height?: number
}
class App extends React.Component<IProps, IState> {
  defaultRules = Defaults.defaultRules;
  defaultData = Defaults.defaultData;
  defaultResults = Defaults.defaultResults;

  prettyPrintedValue: string;
  constructor(props: any) {
    super(props);
    this.state = {
      rules: this.defaultRules,
      data: this.defaultData,
      result: this.defaultResults,
      show: {
        rules: true,
        data: false,
        result: false
      },
      other: {
        height: props.height,
        activeKey: 1
      },
      rulesString: JSON.stringify(this.defaultRules, undefined, 2),
      dataString: JSON.stringify(this.defaultData, undefined, 2)
    };

    this.executeRules(this.state);

    this.rulesClicked = this.rulesClicked.bind(this);
    this.dataClicked = this.dataClicked.bind(this);
    this.fireClicked = this.fireClicked.bind(this);
    this.ruleChanged = this.ruleChanged.bind(this);
    this.dataChanged = this.dataChanged.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

  }
  /** Event handlers that execute before component is mounted*/
  componentWillMount() {
    this.setState(prevState => {
      prevState.other.height = window.innerHeight;
      return prevState;
    });
  }

  /** Event handlers that execute when user clicks on the rules button*/
  rulesClicked(e: any) {

    this.setState(prevState => {
      this.hideAll(prevState);
      prevState.show['rules'] = true;
      return prevState;
    });

  }

  /** Event handlers that execute when user clicks on the data button*/
  dataClicked(e: any) {
    this.setState(prevState => {
      this.hideAll(prevState);
      prevState.show['data'] = true;
      return prevState;
    });
  }

  /** Event handlers that execute when user clicks on the run button*/
  fireClicked(e: any) {
    this.setState(prevState => {
      this.hideAll(prevState);
      prevState.show['result'] = true;
      return prevState;
    });
  }

  /** Event triggered when a rule is changed*/
  ruleChanged(e: any) {
    let json = e.target.value;
    let parsedJson: any = {};
    let valid: boolean = false;
    try {
      parsedJson = JSON.parse(json);
      valid = Validator.validateRules(parsedJson);
      console.log('Valid', valid);
    } catch (ex) {
      console.error(ex);
    } finally {

    }
    this.setState(prevState => {
      prevState.rulesString = json;
      prevState.rules = valid ? parsedJson : [];
      prevState.result = [];
      this.executeRules(prevState);
      return prevState;
    });
  }

  /** Event triggered when a data is changed*/
  dataChanged(e: any) {
    let json = e.target.value;
    let parsedJson: any;
    let valid: boolean = false;
    try {
      parsedJson = JSON.parse(json);
      valid = Validator.validateData(parsedJson);
      console.log('Valid', valid);
    } catch (ex) {
      console.error(ex);
    } finally {

    }
    this.setState(prevState => {
      prevState.dataString = json;
      prevState.data = valid ? parsedJson : [];
      this.executeRules(prevState);
      return prevState;
    });
  }
  handleSelect(selectedKey: any) {
    this.setState(prevState => {
      prevState.other.activeKey = selectedKey;
      return prevState;
    });
  }

  /**execute rules recursively */
  executeRule(state: IState, rule: IRule): void {
    /** next true rule */
    var trueRule = state.rules.find(p => p.id == rule.true_id);

    /** next false rule */
    var falseRule = state.rules.find(p => p.id == rule.false_id);

    /** current rule value data */
    var ruleData = state.data.find(p => p.rule_id == rule.id);

    var result = null;
    try {
      var func = new Function('return ' + rule.body)();
      if (ruleData) result = func(ruleData.data);
    } catch (error) {
      console.error(error);
    }
    state.result.push({
      rule_id : rule.id,
    })
    var ruleResult = state.result.find(p => p.rule_id == rule.id);
    if (ruleResult) ruleResult.value = undefined;

    if (result) {
      if (ruleResult) ruleResult.value = true;
      if (state.rules) {
        if (trueRule) this.executeRule(state, trueRule);
      }
    } else {
      if (ruleResult) ruleResult.value = false;
      if (state.rules) {
        if (falseRule) this.executeRule(state, falseRule);
      }
    }
  }
  executeRules(state: IState) {
    state.result = [];
    if (state.rules) {
      var rule: IRule = state.rules[0];
      if (rule) this.executeRule(state, rule);
    }
  }
  hideAll(state: IState) {
    for (let key in state.show) {
      this.state.show[key] = false;
    }
  }
  setStyle() {
    return {
      height: (this.state.other.height) + 'px',
    };
  }
  prettyPrint() {
    return JSON.stringify(this.state.rules, undefined, 2);
  }
  
  renderResult() {
    var i = 0;
    var panels = [];
    for (var rule of this.state.rules) {
      var result = this.state.result.find(p => p.rule_id == rule.id) || { rule_id: rule.id, value: undefined };
      if (result.value != undefined) {

        var bsStyle = result.value ? "success" : "danger";
        var eventKey = (i++).toString();
        panels.push(<div>
          <Panel collapsible eventKey={eventKey} bsStyle={bsStyle} className={'Panel' + result.value} header={rule.title}>
            <form>
              <FormGroup controlId="formBasicText">
                <div className="col-md-12">
                  <ControlLabel>Rule Id</ControlLabel>
                  <FormControl type="text" value={rule.id} />
                </div>
                <div className="col-md-12">
                  <ControlLabel>Rule Body</ControlLabel>
                  <FormControl type="text" value={rule.body} />
                </div>
                <div className="col-md-6">
                  <ControlLabel>Next rule-id if passed</ControlLabel>
                  <FormControl type="text" value={rule.true_id ? rule.true_id : ""} />
                </div><div className="col-md-6">
                  <ControlLabel>Next rule-id if failed</ControlLabel>
                  <FormControl type="text" value={rule.false_id ? rule.false_id : ""} />
                </div>
              </FormGroup>
            </form>
          </Panel>
        </div>)
      }
    }

    if(panels.length)
    return <Accordion eventKey="1">{panels}</Accordion>;
    else
    return <h3>
      There seems to be an error with the rules. Please check if the ids are valid and make sure that the flow is not circular.
    </h3>
  }
  render() {
    return (
      <div className=''>
        <div className='col-sm-3'>
          <Nav bsStyle="pills" stacked activeKey={this.state.other.activeKey} onSelect={this.handleSelect}>
            <NavItem eventKey={1} onClick={this.rulesClicked}>Rules</NavItem>
            <NavItem eventKey={2} onClick={this.dataClicked}>Data</NavItem>
            <NavItem eventKey={3} onClick={this.fireClicked}>Run</NavItem>
          </Nav>
        </div>
        <div className='col-sm-9' style={this.setStyle()} >
          <div className={this.state.show.rules ? 'Containerdiv' : 'Display-None'}>
            <textarea className="Text-Area" onChange={this.ruleChanged} defaultValue={this.state.rulesString} />
          </div>
          <div className={this.state.show.data ? 'Containerdiv' : 'Display-None'}>
            <textarea className="Text-Area" onChange={this.dataChanged} defaultValue={this.state.dataString} />
          </div>
          <div className={this.state.show.result ? 'Containerdiv' : 'Display-None'}>
            {
              this.renderResult()
            }
          </div>
        </div>
      </div>
    );
  }
}
export default App;
