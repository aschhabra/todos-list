
process.env.NODE_ENV = 'test';

var asyncDump=require('./asyncDump.js');
var chai = require('chai');
var request =  require('supertest');
var chaiHttp = require('chai-http');
var should = require('should-http');
var TodoList = require('../../models/todos');
var expect = chai.expect;
var mongoose=require('mongoose');
var http=require('http');

chai.use(chaiHttp);
describe('/GET TodoList',()=>{
  var app = require('../../app.js');
  var server;
  before(function(done){
    //delete require.cache[require.resolve('../../app.js')];
    server = http.createServer(app);
    server.listen(3000,done);
  });
  after(function(done){
    server.close(done);
    //asyncDump();
  });
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
