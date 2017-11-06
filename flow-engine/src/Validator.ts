export abstract class Validator {
    static validateRules(obj:any){
        try{
            let objArr = obj as any[];
            var passed = true;
            for(let item of objArr){
                passed = true;
                if(!item.id || typeof item.id != "number") passed = false;
                if(!item.body) return false;
                var func = new Function('return ' + item.body)();
                 if(typeof func != "function") passed = false;

                 if(item.true_id != null){
                    if(typeof item.true_id != "number") passed = false;
                 }
                 if(item.false_id != null){
                    if(typeof item.false_id != "number") passed = false;
                 }
                if(!passed){
                    break;
                }
            }
        }catch(ex){
            passed = false;
        }finally{
           
        }
        return passed;
    }
    static validateData(obj:any){
        try{
            let objArr = obj as any[];
            var passed = true;
            for(let item of objArr){
                passed = true;
                if(!item.rule_id || typeof item.rule_id != "number") passed = false;
                if(!item.data || typeof item.data != "object") return false;
                if(!passed){
                    break;
                }
            }
        }catch(ex){
            passed = false;
        }finally{
           
        }
        return passed;
    }
    
    //     var a = [{
    //         id: 1,
    //     body: obj => { return obj.value; },
    //     true_id: 2,
    //     false_id: 2,
    // },
    // {
    //     id: 2,
    //     body: obj => { return obj.value; },
    //     true_id: 3,
    //     false_id: 4,
    // },
    // {
    //     id: 3,
    //     body: obj => { return obj.value; },
    //     true_id: null,
    //     false_id: null,
    // }];

    // static defaultData: IData[] = [
    //     {
    //         rule_id: 1,
    //         data: { value: true }
    //     },
    //     {
    //         rule_id: 2,
    //         data: { value: true }
    //     },
    //     {
    //         rule_id: 1,
    //         data: { value: true }
    //     }
    // ]
}