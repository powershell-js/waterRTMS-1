function checkNumber(v){
    return !isNaN(v);
}

function checkInt(v){
    if(v == undefined || v == ""){
        return true;
    }
    return checkNumber(v) && Number.isInteger(Number(v));
}

function checkFloat(v){
    if(v == undefined || v == ""){
        return true;
    }
    return checkNumber(v) && !Number.isInteger(Number(v));
}


export default {
    Number: (rule, value, callback) => {
        if(checkNumber(value)){
            callback();
        }
        else{
            callback(new Error(rule.message));
        }
    },
    Integer: (rule, value, callback) => {
        if(checkInt(value)){
            callback();
        }
        else{
            callback(new Error(rule.message));
        }
    },
    Float: (rule, value, callback) => {
        if(checkFloat(value)){
            callback();
        }
        else{
            callback(new Error(rule.message));
        }
    }
}
