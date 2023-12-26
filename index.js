var five = require("johnny-five")
var si = require('systeminformation')
var board = new five.Board()

board.on("ready", function () {
  var iface = "";
  var lcd = new five.LCD({
    controller: "PCF8574T"
  });
  var led = new five.Led(13);
  
  lcd.backlight(50);

  setInterval(() => {
    si.currentLoad()
      .then(data => {
        // console.log('Current CPU Load:', data);
        // console.log('Current CPU Load (in percentage):', data.currentLoad);
        lcd.cursor(0, 0).print('CPU:');
        lcd.cursor(0, 4).print(parseInt(data.currentLoad)+'%');
        parseInt(data.currentLoad)>85?led.blink(500): led.stop().off();
      })
      .catch(error => {
        lcd.cursor(0, 0).print('CPU: ERR');
      });
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
  }, 1500)
});
