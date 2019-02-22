var exec = require('child_process').fork;

function main() {
    console.log("--> 启用自动采集派奖");
    var nowCmd = exec('./core/index.js');
    nowCmd.on('exit', function(code) {
        nowCmd.kill();
        setTimeout(main, 1000);
    });
}
main();