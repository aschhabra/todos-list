process.env.NODE_ENV = 'test';

var asyncDump=require('./asyncDump.js');
var chai = require('chai');
var request =  require('supertest');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = require('should-http');
var TodoList = require('../../models/todos');
var expect = chai.expect;

chai.use(chaiHttp);
describe('Model',()=>{
   beforeEach((done)=>{
     var list= new TodoList({text: 'Creating todo list', done: true});
     list.save((err,list)=>{
       done();
     });
   });
   afterEach((done)=>{
     TodoList.remove({},function(){
       done();
     });
   });
  // beforeEach(function(done){
  //   server 
  //   done();
  // });
  // afterEach(function(done){
  //   mongoose.connection.db.dropDatabase(function(){
  //     mongoose.connection.close();
  //     server.close();
  //     done();
  //   });
  //   asyncDump();
  // });
  describe('/GET TodoList',()=>{
    it('get list of all the items in the list',(done)=>{
      chai.request(server)
          .get('/api/todos')
          .end((err,res)=>{
              res.should.have.status(200);
              expect(res.body).to.be.an('array')
            done();
          });
    });
  });
  describe('/POST todo list',()=>{
    it('it should POST data',(done)=>{
      var item={text: 'Create Web App' };

      chai.request(server)
          .post('/api/todos')
          .send(item)
          .end((err,res) => {
              expect(res.body).to.be.an('object');
            done();
          });
    });
    it('it should not POST data',(done)=>{
      var item={};
      chai.request(server)
          .post('/api/todos')
          .send(item)
          .end((err,res)=>{
              res.should.have.status(200);
              expect(res.body).to.have.property('error');
              // expect(res.body.error).to.have.property('text');
              //console.log(res.body);
              expect(res.body.error).to.have.property('message').include('required');
            done();
          });
    });
  });
  describe('/GET id todo list',()=>{
    it('it should get a list from item by given id',(done)=>{
      let list= new TodoList({text:'Create an Web app using React App'});
      list.save((err,item)=>{
        chai.request(server)
          .get('/api/todos/'+item.id)
          .end((err,res)=>{
              res.should.have.status(200);
              expect(res.body).to.have.property('text');
              expect(res.body).to.have.property('_id').eql(list.id);
            done();
          });
        });
    });
  });
  describe('/POST/:id todo list',()=>{
    it('it should update a list from item by given id',(done)=>{
      let list= new TodoList({text:'Create an Web app using React App'});
      list.save((err,item)=>{
        chai.request(server)
          .put('/api/todos/'+item.id)
          .send({text: 'Creating an TDD Web app using React'})
          .end((err,res)=>{
              res.should.have.status(200);
              //expect(res.body).to.have.property('text');
              //expect(res.body).to.have.property('_id').eql(list.id);
            done();
          });
        });
    });
  });
  describe('/delete/:id todo list',()=>{
    it('it should delete a list from item by given id',function(done){
      let list= new TodoList({text:'Create an Web app using React App',done:'false'});
      console.log(list);
      list.save((err,item)=>{
        chai.request(server)
          .delete('/api/todos/'+item.id)
          .end((err,res)=>{
              res.should.have.status(200);
              //expect(res.body).to.have.property('text');
              //expect(res.body).to.have.property('_id').eql(list.id);
            done();
          });
        });
    });
  });
});
