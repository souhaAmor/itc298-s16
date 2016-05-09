var tasks =    [
         {task:"meetup", description:"going to the js meetup"},
         {task:"homework", description:"doing the itc298 homework"}
     ];
     
     
     exports.findTask=function(search){
         return tasks.find(function(tasks){
          return tasks.task== search;
      });
      
     }
     
     exports.result= function(exist,search){
         
           var edit_btn = '<a href="/edit?task='+search+'"><button>Update</button></a><br >';
     var add_btn = '<a href="/form"><button>Add</button></a> <br >';
     var rm_btn =  '<a  href="/rm?task='+search+'" ><button>Delete</button></a> <br >';
          if (exist != undefined){
        
         var result = "You searched for "+ exist.task + "<br> Description: " + exist.description + "<br>"  +'<br><a href="/"><button>Back</button></a><br >'
         + ' '+edit_btn+" "+rm_btn;
      }else{
        
        result = "You searched for "+search + " <br > No such a task <br >" +'<br><a href="/"><button>Back</button></a><br >'
         +add_btn+'<div id="form_add"></div>';
      }
         return result;
     }
     
  
   exports.addForm = function(task)
   {
       
        if (task == undefined){
         task = "";
     }

     
      var task_field =' task:<input type="text" name="task" value="'+task+'"/><br>';
     var description_field = 'description :<input type="text" name="description" /><br>';
    var form= '<form action="/save" method="POST">'+task_field + description_field+'<button> add</button></form>';
   
       return form;
   };
     
     exports.save= function(t_task,t_description){
         
        var new_task = {task:t_task,description:t_description};
    var add_btn = '<a href="/add"><button>Add more tasks</button></a><br >';
    var go_home = '<a href="/"><button>Back</button></a>';
   var found=false;
     tasks.forEach(function(task){
          if(tasks.task == t_task){
              task=new_task;
              found=true;
              
          }
     });
     
     if (!found){
         tasks.push(new_task);     
         var msg = t_task + " has been adde to the list";
       
    
     }else{
         msg = "This task is updated";
     }
     return msg+"<br>"+add_btn+" "+go_home;
     
         
     }
     
     exports.updateTask=function(t_task,t_description){
         
         
          var new_task = {task:t_task,description:t_description};
    var add_btn = '<a href="/add"><button>Add more tasks</button></a>';
    var go_home = '<a href="/"><button>Back</button></a>';
   
    var index = tasks.findIndex(function(tasks){
        return tasks.task == t_task;
    });
    
    
         tasks.splice(index,1,new_task);     
         var msg = t_task + " has been updated to the list.";
        
    return msg+"<br>"+add_btn+" "+go_home;
    
  
     }
     
     exports.remove=function(t_task){
         
          var index = tasks.findIndex(function(tasks){
        return tasks.task == t_task;
    });
     tasks.splice(index,1);   
     var go_home = '<a href="/"><button>Back</button></a>';
    
     var msg = t_task + " has been deleted!";
     return msg+"<br>"+go_home;
     
     
        
     }
