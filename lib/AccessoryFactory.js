'use strict';

const Accessory = require('hap-nodejs').Accessory;
const Service = require('hap-nodejs').Service;
const Characteristic = require('hap-nodejs').Characteristic;
const uuid = require('hap-nodejs').uuid;
const controllers = require('./controllers');
const util = require('util');

module.exports = {
  createAccessoryFromAction: function(action) {
    switch (action.type) {
      case 1: // Regular light
        return createLightAccessoryFromAction(action);
        break;
      default:
        throw new Error(util.format('Action "%s" is not supported', action.name));
        break;
    }
  }
}

function createLightAccessoryFromAction(action) {
  var lightController = new controllers.LightController(action);
  var lightUUID = uuid.generate('nhc:accessories:light' + lightController.id);
  var lightAccessory = new Accessory(lightController.name, lightUUID);

  lightAccessory
    .getService(Service.AccessoryInformation)
      .setCharacteristic(Characteristic.Manufacturer, lightController.manufacturer)
      .setCharacteristic(Characteristic.Model, lightController.model)
      .setCharacteristic(Characteristic.SerialNumber, 'A12S345KGB');

  lightAccessory.on('identify', function(paired, callback) {
    lightController.identify();
    callback();
  });

  lightAccessory
    .addService(Service.Lightbulb, lightController.name)
    .getCharacteristic(Characteristic.On)
    .on('set', function(value, callback) {
      lightController.setPower(value);
      callback();
    })
    .on('get', function(callback) {
      callback(null, lightController.getPower());
    });

    action.on('update', (value) => {
      var power = value === 100 ? true : false;
      lightAccessory
        .getService(Service.Lightbulb)
        .getCharacteristic(Characteristic.On)
        .updateValue(power);
    });

    return lightAccessory;
}
