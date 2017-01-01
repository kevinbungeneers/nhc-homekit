'use strict';

const HomeControlClient = require('nhc-client').HomeControlClient;
const Accessory = require('hap-nodejs').Accessory;
const init = require('hap-nodejs').init;
var HomeControlBridge = require('./lib/HomeControlBridge');
var Light = require('./lib/accessories/Light');
var AccessoryFactory = require('./lib/AccessoryFactory');

init();

var bridge = new HomeControlBridge();
var client = new HomeControlClient();
client.connect('192.168.0.226');

client.on('connect', function() {
  client.listActions(function(actions) {
    // var light = new Light(actions[1]);
    // bridge.addBridgedAccessory(
    //   AccessoryFactory.createLightAccessory(light)
    // );
    actions.forEach(function(action) {
      var light = new Light(action);
      bridge.addBridgedAccessory(
        AccessoryFactory.createLightAccessory(light)
      );
    });
    bridge.publish({
        username: "CC:22:3D:E3:CE:30",
        port: 51826,
        pincode: '031-45-154'
    });
  });
});
