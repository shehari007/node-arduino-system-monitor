
# Arduino Live System Monitor Using Node.js

A hobby project Tested on Arduino R3 UNO for live stats displayed on I2C Module written in pure javascript using Jhonny-five for serial communication.



## Features

- CPU Usage in %
- Memory Usage in %
- Download Speed in MB/s
- Upload Speed in MB/s
- Automatically detects the current live network adapter for internet speeds


## Screenshots

![App Screenshot](https://github.com/shehari007/node-arduino-system-monitor/blob/main/screenshots/ss1.jpg?raw=true)


## Requirements

- Node >=18 (LTS Preferred)
- Arduino UNO R3 With Standard Firmata Flashed - [install Standard Firmata?](https://www.instructables.com/Arduino-Installing-Standard-Firmata/) - Controller (PCF8574T) <-- _You can change your Controller in index.js according to your Arduino_
- I2C LCD Module
    
## Running Locally

To run this project locally connect arduino to PC and run:

```bash
  npm install && node index.js
```


## Important Note!

Don't try to update the serialport in package.json keep it to 9.0.3 specially on Windows Machines because latest versions will not work as serial communication between arduino and node


## License

[MIT](https://choosealicense.com/licenses/mit/)

