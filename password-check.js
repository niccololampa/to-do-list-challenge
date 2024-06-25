function passwordLength(password) {
    if(password.length >= 8 && password.length <= 22){
        return true;
    }else{
        return false;
    }
}

function charCheck(password){    
    const chars = Array.from(password);     
    const upperCase =  chars.some((char)=>/[A-Z]/.test(char));
    const lowerCase = chars.some((char)=>/[a-z]/.test(char));
    const numeric = chars.some((char)=>!isNaN(char) && char !== ' ');
    
    return upperCase && lowerCase && numeric;
}

function repeatChecker(password) {
    
    const passwordArray = password.split("");
    
    let met = true; 
    
    for(let i= 0; i < passwordArray.length -2; i++){
       const letter =  passwordArray[i]
        
        if(letter === passwordArray[i+1] && letter === passwordArray[i+2]){           
            let met = false;
            break;  
        }    
        
    }
    return met;

}

function passwordChecker(password) {
    
    const lenghtCondition = passwordLength(password);
    const charCondition = charCheck(password);   
    const repeatCondition = repeatChecker(password); 
    
    if(lenghtCondition && charCondition && repeatCondition){        
        return "strong"
    
    }else{
        return "weak"   }    
    

}
    
console.log(passwordChecker("1234567890Abcd"), "strong");
console.log(passwordChecker("1234567890aaaa"));
console.log(passwordChecker("1234567890abcd"));
console.log(passwordChecker("aaB1234567890123Ubefged"));
console.log(passwordChecker( "aa1234567890123Ubefged"));








