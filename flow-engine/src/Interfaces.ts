export interface IRule {
	title:string;
    id: number;
    body: string;
    true_id: number | null;
    false_id: number | null;
  }
  
  export interface IData {
    rule_id: number;
    data: any
  }
  
  export interface IState {
    rules: IRule[] | undefined;
    data: IData[] | undefined;
    show: any;
    other: any;
    rulesString:string;
    dataString:string;
  }