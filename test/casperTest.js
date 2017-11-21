var require= patchRequire(require);
var utils= require('utils');
//var casper = require("casper").create();
casper.test.begin('start testing',function suite(test){
  var x=require('casper').selectXPath;
  casper.start('http://localhost:3000/todos',function(){
    this.echo(this.getTitle());
    this.test.assertExists('input[id="add-todo-text"]','form add todo text exists');
    this.test.assertExists('button[id="add-button"]','form add button exists');
    this.test.assertExists('form[name="add-form"]','form add exists');
    
  });

  casper.then(function(){
    this.fillSelectors('form[name="add-form"]',{ 'input[id="add-todo-text"]': "Testing with CasperJS"}); 
    this.echo('Filling text box');
  });
  casper.wait(9000,function(){
    this.echo('waiting 9 seconds');
  });
  casper.waitForSelector('button[id="add-button"][value="add"]',function(){
    this.test.assertExists('button[id="add-button"][value="add"]','form add button exists');
    //this.click('input[id="add-button"]');
    //this.click(x('//*[@class="btn-default" and input[id="add-button"]'));
    this.click('button[id="add-button"][value="add"]');
    this.echo('clicking add button');
  });
  casper.wait(9000,function(){
    this.echo('waiting another 9 seconds');
  });
  casper.then(function(){
    this.capture('todo.png',{
      top:100,
      left: 100,
      width: 500,
      height: 400
    
    });
  });

  casper.run(function(){
    test.done();
  });
});
