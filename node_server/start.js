var exec = require('child_process').fork;
    function main () {
      console.log("--> 启动采集器");
      var nowCmd = exec('./core/index.js');
      nowCmd.on('exit', function(code) {
          nowCmd.kill();
          setTimeout(main, 1000);
      });
  }
  main();
