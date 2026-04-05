const input= document.getElementById("input-field");
const button= document.getElementById("add-task-button");
const tasklist= document.getElementById("task-list");
let tasks=JSON.parse(localStorage.getItem("tasks")) || []; //this is the task array 
const taskcount=document.getElementById("task-counter");
const clearBtn=document.getElementById("clear-button");

function saveTasks(){ // this method is for setting the tasks
    
    localStorage.setItem("tasks",JSON.stringify(tasks));// in local storage the data is always stroed in form of string thats why we convert it
}

function updateCounter(){ // this is used to give the count of the task that are left
    const remainingtask=tasks.filter(function(work){
        return work.completed == false;
    })

    taskcount.innerText = remainingtask.length +" task left";
}

clearBtn.addEventListener("click",function(){
    tasks= [];
    saveTasks();
    tasklist.innerHTML=""; // this will remove everthing inside tasklist 
    updateCounter();

})


tasks.forEach(function(task,index){   // this function is used to add task in the dom and give index to each element

    const li=document.createElement("li");
    const span = document.createElement("span");
    span.innerText=task.text;
    const edit=document.createElement("button");
    edit.innerText="Edit";
    
    if(task.completed){
        span.classList.add("completed");  // inside if statement if task.completed is true then it will add class name completed in html 
    }
    
    span.addEventListener("click",function(){
        span.classList.toggle("completed");  // this line will add and remove class name completed in html  
        task.completed = !task.completed; //this will change true to false vice versa, as we can see all task are marked as false
        saveTasks();
        updateCounter();
    });

    const deleteBtn=document.createElement("button");
    deleteBtn.innerText="delete";
    deleteBtn.addEventListener("click",function(){
        tasks.splice(index,1);   // this will delete the tasks which you click on the ui
        saveTasks();             // and this will update localstorage after deletion 
        li.remove();             // this is just to remove the task from ui
        updateCounter();
    });

    edit.addEventListener("click",()=>{
        const newTask= prompt("edit your task",task.text);
        if(newTask== null || newTask.trim()==""){ // this if statement check wether the new task entered is null or empty spaces only like ("----")
            return;
        }
        task.text=newTask;
        span.innerText=newTask;
        saveTasks();
    })

    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(edit);
    tasklist.appendChild(li);
});



function loadTasks(){ // this method is used to retrieve task that is stored locally

    const storedTasks=localStorage.getItem("tasks");
    
    if(storedTasks){
        tasks=JSON.parse(storedTasks);  //this will convert string into array
    }
}



function addtask(){
    const taketask= input.value;
    if(taketask==""){
        return;
    }

    const exist= tasks.some((task)=>{  // this function checks wether the input task already exists in the list or not
        return task.text.toLowerCase() == taketask.toLowerCase(); 
    })

    if(exist){ //if the input task is already in the list it will give the alert written inside the function
        alert("task already added");
        return;
    }
    
    const task={ // task object
        text:taketask,
        completed:false
    };
    tasks.push(task);
    saveTasks();
    updateCounter();
    
    const li=document.createElement("li");
    const span= document.createElement("span");
    const edit =document.createElement("button");
    edit.innerHTML="Edit task";
    span.innerText=taketask;
    tasklist.appendChild(li);
    const deletebtn=document.createElement('button');
    deletebtn.innerText="Delete";
    deletebtn.addEventListener("click",function(){
        const index= tasks.indexOf(task);
        tasks.splice(index,1);
        saveTasks();
        li.remove();
        updateCounter();
    })
    edit.addEventListener("click",function(){
        const newTask= prompt("edit your task",task.text);  
        if(newTask==null || newTask.trim() == ""){
            return;
        }
        task.text=newTask;
        span.innerText=newTask;
        saveTasks();
    })
    li.appendChild(span);
    li.appendChild(deletebtn);
    li.appendChild(edit);
    span.addEventListener("click",function(){
        span.classList.toggle("completed");
        task.completed =!task.completed;
        saveTasks();
        updateCounter();
    })
}

input.addEventListener("keypress",function(event){ // this funtion will add task when we press the enter button from the keyboard
    if(event.key=="Enter"){
        addtask();
    }
})

button.addEventListener("click",addtask);

loadTasks(); 
updateCounter();