
class Task { 
    // fill this class out
        constructor(title){        
            this.title = title;
            this.completed = false;     
        }
        
        markAsCompleted(){
            this.completed = true; 
        }
    }
    class TodoListManager {
        constructor() {         
            this.tasks = [];      
        }
        
        addTask(task){
            this.tasks.push(task);    
        }
        
        getIncompleteTasks(){        
            return this.tasks.filter((task)=> task.completed ===false)    
        }
        
        getCompletedTasks(){
            return this.tasks.filter((task)=> task.completed ===true)    
        }
        
    }
    
    
    const todoList = new TodoListManager();
    
    const buyGroceries = new Task("Buy groceries");
    const writeCode = new Task("Write code");
    const exercise = new Task("Exercise");
    
    console.log(buyGroceries);
    
    todoList.addTask(buyGroceries);
    todoList.addTask(writeCode);
    todoList.addTask(exercise);
    
    console.log(todoList);
    
    // To be defined. 
    writeCode.markAsCompleted();
    console.log(todoList);
    
    console.log(todoList.getIncompleteTasks());
    // Expected output: [Task { title: 'Buy groceries', completed: false }, Task { title: 'Exercise', completed: false }]
    
    console.log(todoList.getCompletedTasks());
    // Expected output: [Task { title: 'Write code', completed: true }]