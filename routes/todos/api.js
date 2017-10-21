var express = require('express');
var router = express.Router();
var Todo = require('../../models/todos');

router.route('/')
  .get(function(req,res,next){
    Todo.findAsync({})
    .then(function( todos){
      res.json(todos);
    })
    .catch(next)
    .error(console.error);
  })
  .post(function(req,res,next){
    var todo= new Todo();
    todo.text=req.body.text;
    todo.saveAsync()
    .then(function(todo){
      console.log("sucess");
      res.json({'status':'sucsess', 'todo': todo});  
    })
    .catch(function(e){
      console.log("fail");
      res.json({'status':'error','error':e});
    })
    .error(console.error);
  });

module.exports=router;
