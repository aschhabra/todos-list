var test= function(){
  var command = 'casperjs test test/casperTest.js'
  var myTest=require('child_process').exec(command);

  myTest.stdout.on('data',function(data){
    if(data.length>1) console.log(data);
  });
  myTest.on('close',function(code){
    console.log('process exit code'+ code);
    myTest.kill();
  });
};

module.export=test();
