/* Question #1 Name List Formatter
    
    Problem Statement:
    You are given an array of names as input. Your task is to write a JavaScript function that formats this list of names into different output formats based on the number of names in the input array. The output should be as follows:
    
    1. If there is only one name in the list, the output should be the name in title case. For example:
        - Input: ["james"]
        - Output: "James"
    2. If there are two names in the list, the output should be the names separated by " and " in title case. For example:
        - Input: ["james", "jeff"]
        - Output: "James and Jeff"
    3. If there are three or more names in the list, the output should include the first two names separated by " and " in title case, followed by a comma and the count of remaining names. For example:
        - Input: ["james", "jeff", "michael"]
        - Output: "James, Jeff and Michael"
    4. If there are more than three names in the list, the output should include the first two names separated by " and " in title case, followed by a comma and the count of remaining names. For example:
        - Input: ["james", "jeff", "michael", "susan", "david"]
        - Output: "James, Jeff and 3 others"
  */

        function capitalizeName (name){    
            return name.charAt(0).toUpperCase()  + name.slice(1);
        }
        
        function formatNameList(names) {
             const numberPeople = names.length;
             if(numberPeople ===1){
                 return capitalizeName(names[0]);
             }
            else if(numberPeople ===2){
                return `${capitalizeName(names[0])} and ${capitalizeName(names[1])}`; 
            }else if(numberPeople ===3){
                return `${capitalizeName(names[0])}, ${capitalizeName(names[1])} and ${capitalizeName(names[2])}`; 
            }else if( numberPeople >3) {        
                const remaining = numberPeople -2;               
                return `${capitalizeName(names[0])}, ${capitalizeName(names[1])} and ${remaining} others`; 
            }
                
            
        }
        
        console.log(formatNameList(["james"])); // "James"
        console.log(formatNameList(["james", "jeff"])); // "James and Jeff"
        console.log(formatNameList(["james", "jeff", "michael"])); // "James, Jeff and Michael"
        console.log(formatNameList(["james", "jeff", "michael", "susan", "david"])); // "James, Jeff and 3 others"
        
        
        
        
        