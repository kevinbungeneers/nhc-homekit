const HomeControlClient = require('nhc-client').HomeControlClient;
const HomeControlBridge = require('./HomeControlBridge');
const AccessoryFactory = require('./AccessoryFactory');
const logger = require('./Logger').logger;

'use strict';

function Server() {
  this.bridge = new HomeControlBridge();
  this.client = new HomeControlClient();
}

Server.prototype.run = function() {
  this.client.on('connect', () => {
    this.client.listActions((actions) => {
      actions.forEach((action) => {
        try {
          this.bridge.addBridgedAccessory(
            AccessoryFactory.createAccessoryFromAction(action)
          );
        } catch (error) {
          logger.log('info', error.message);
        }
      });

      this.bridge.publish({
          username: "CC:22:3D:E3:CE:30",
          port: 51826,
          pincode: '031-45-154'
      });
    });
  });

  this.client.connect();
}

module.exports = Server;
