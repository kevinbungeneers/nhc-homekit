var HAP = require('hap-nodejs');
var Accessory = HAP.Accessory;
var HomeControlBridge = require('./lib/HomeControlBridge');

HAP.init();

var bridge = new HomeControlBridge();

bridge.on('identify', function (paired, callback) {
    console.log('NHC bridge identify');
    callback();
});

bridge.publish({
    username: "CC:22:3D:E3:CE:30",
    port: 51826,
    pincode: '031-45-154'
});
