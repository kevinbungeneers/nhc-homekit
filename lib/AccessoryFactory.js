'use strict';

const Accessory = require('hap-nodejs').Accessory;
const Service = require('hap-nodejs').Service;
const Characteristic = require('hap-nodejs').Characteristic;
const uuid = require('hap-nodejs').uuid;
const accessories = require('./accessories');
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
  var light = new accessories.Light(action);
  var lightUUID = uuid.generate('nhc:accessories:light' + light.id);
  var lightAccessory = new Accessory(light.name, lightUUID);

  lightAccessory.username = 'FA:3C:ED:5A:1A:1A';
  lightAccessory.pincode = '031-45-154';

  lightAccessory
    .getService(Service.AccessoryInformation)
      .setCharacteristic(Characteristic.Manufacturer, light.manufacturer)
      .setCharacteristic(Characteristic.Model, light.model)
      .setCharacteristic(Characteristic.SerialNumber, 'A12S345KGB');

  lightAccessory.on('identify', function(paired, callback) {
    light.identify();
    callback();
  });

  lightAccessory
    .addService(Service.Lightbulb, light.name)
    .getCharacteristic(Characteristic.On)
    .on('set', function(value, callback) {
      light.setPower(value);
      callback();
    })
    .on('get', function(callback) {
      callback(null, light.getPower());
    });

  lightAccessory
    .getService(Service.Lightbulb)
    .getCharacteristic(Characteristic.On)
    .updateValue(true);

    return lightAccessory;
}
