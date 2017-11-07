/** Validator to validate the object */
export abstract class Validator {

    /**To validate the rules object */
    static validateRules(obj:any){
        try{
            let objArr = obj as any[];
            var passed = true;
            var usedIds:{
                [key:string]:boolean
            } = {};
            for(let item of objArr){
                passed = true;

                /** The true id or false id can not be equal to the current rule id */
                if(item.id == item.true_id || item.id == item.false_id){
                    passed = false;
                    break;
                }

                /** If the true id or false id or not null but are equal to an rule d that has will execute before this rules fires */
                if((item.true_id != null && usedIds[item.true_id]) || 
                    (item.false_id != null && usedIds[item.false_id])) {
                    passed=false;
                    break;
                }

                /**store the previously used ids to check for circularity */
                if(usedIds) usedIds[item.id] = true;

                /** General validations for the properties */
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
    /**To validate the data object */
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
}