var five = require("johnny-five")
var cpuStat = require('cpu-stat')
var si = require('systeminformation')
const windowsCPU = require('windows-cpu');
const os = require('os');
var board = new five.Board()

board.on("ready", function () {
  var iface = "";
  var lcd = new five.LCD({
    controller: "PCF8574T"
  });

  setInterval(() => {

    windowsCPU.totalLoad()
    .then(load => {
      const currentCPULoad = load; // multiplying by 100 for percentage value
      // console.log('CPU Load:', currentCPULoad + '%');
      // Display the current CPU load value on your LCD or perform other actions
      lcd.cursor(0, 0).print('CPU:');
      lcd.cursor(0, 4).print(parseInt(currentCPULoad) + '%');
    })
    .catch(error => {
      //console.error('Error fetching CPU load:', error);
      lcd.cursor(0, 0).print('CPU: ERR');
    });
    // si.currentLoad()
    //   .then(data => {
    //     // console.log('Current CPU Load:', data);
    //     // console.log('Current CPU Load (in percentage):', data.currentLoad);
    //     lcd.cursor(0, 0).print('CPU:');
    //     lcd.cursor(0, 4).print(parseInt(data.currentLoad)+'%');

    //   })
    //   .catch(error => {
    //     lcd.cursor(0, 0).print('CPU: ERR');
    //   });
    si.mem(function (data) {
      lcd.cursor(0, 9).print('MEM:' + parseInt(((1 - (data.available / data.total)) * 100)) + '%');
    })
    si.networkInterfaceDefault(function (data) {
      iface = data
    })
    si.networkStats(iface, function (data) {

      lcd.cursor(1, 0).print('UP:' + (data[0].tx_sec / 1048576).toFixed(1))
      lcd.cursor(1, 10).print('DW:' + (data[0].rx_sec / 1048576).toFixed(1))
    })
    lcd.cursor(0, 4)
    lcd.print('     ')
  }, 1000)
});
