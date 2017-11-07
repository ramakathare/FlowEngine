import { IData, IRule, IResult } from './Interfaces';
/**Default values for rules, data and result are provided */
export abstract class Defaults {
    static defaultRules: IRule[] = [
        {
            title:"Rule 1",
          id: 1,
          body:"function(obj){return obj.value;}",
          true_id: 2,
          false_id: 2
        },
        {
            title:"Rule 2",
          id: 2,
          true_id: 3,
          body:"function(obj){return obj.value;}",
          false_id: 4
        },
        {
            title:"Rule 3",
          id: 3,
          true_id: null,
          body:"function(obj){return obj.value;}",
          false_id: null
        }
      ];

    static defaultData: IData[] = [
        {
            rule_id: 1,
            data: { value: true }
        },
        {
            rule_id: 2,
            data: { value: true }
        },
        {
            rule_id: 3,
            data: { value: true }
        }
    ]

    static defaultResults: IResult[] = [
        {
            rule_id: 1
        },
        {
            rule_id: 2
        },
        {
            rule_id: 3
        }
    ]
}