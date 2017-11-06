import { IData, IRule } from './Interfaces';

export abstract class Defaults {
    static defaultRules: IRule[] = [
        {
          id: 1,
          body:"function(obj){return obj.value;}",
          true_id: 2,
          false_id: 2
        },
        {
          id: 2,
          true_id: 3,
          body:"function(obj){return obj.value;}",
          false_id: 4
        },
        {
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
            rule_id: 1,
            data: { value: true }
        }
    ]
}