/**This is the interface that rules should implement */
export interface IRule {
	title:string;
    id: number;
    body: string;
    true_id: number | null;
    false_id: number | null;
  }
  
  /**This is the interface that result should implement */
export interface IResult{
  rule_id: number;
  value?: boolean;
}

/**This is the interface that the data should implement */
  export interface IData {
    rule_id: number;
    data: any
  }
  
  /**This is the interface that the component state should implement */
  export interface IState {
    rules: IRule[];
    data: IData[];
    show: any;
    other: any;
    rulesString:string;
    dataString:string;
    result:IResult[];
  }