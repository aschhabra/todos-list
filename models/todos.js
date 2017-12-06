var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');
Promise.promisifyAll(mongoose);
mongoose.Promise=global.Promise;
var TodoSchema = new Schema({
  text: {type: 'String',required: true},
  done: {type: 'Boolean'}
});

TodoSchema.pre('save',next=>{
  
  next();
});
var Todo = mongoose.model('Todo',TodoSchema);

module.exports = Todo;
