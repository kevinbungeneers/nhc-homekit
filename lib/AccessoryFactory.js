'use strict';

var Accessory = require('hap-nodejs').Accessory;
var Service = require('hap-nodejs').Service;
var Characteristic = require('hap-nodejs').Characteristic;
var uuid = require('hap-nodejs').uuid;

function AccessoryFactory() {}

AccessoryFactory.prototype.createLightAccessory = function(light) {
  // Generate a consistent UUID for our light Accessory that will remain the same even when
  // restarting our server. We use the `uuid.generate` helper function to create a deterministic
  // UUID based on an arbitrary "namespace" and the word "light".
  var lightUUID = uuid.generate('nhc:accessories:light' + light.id);

  // This is the Accessory that we'll return to HAP-NodeJS that represents our light.
  var lightAccessory = new Accessory(light.name, lightUUID);

  // Add properties for publishing (in case we're using Core.js and not BridgedCore.js)
  lightAccessory.username = 'FA:3C:ED:5A:1A:1A';
  lightAccessory.pincode = '031-45-154';

  // set some basic properties (these values are arbitrary and setting them is optional)
  lightAccessory
    .getService(Service.AccessoryInformation)
      .setCharacteristic(Characteristic.Manufacturer, light.manufacturer)
      .setCharacteristic(Characteristic.Model, light.model)
      .setCharacteristic(Characteristic.SerialNumber, 'A12S345KGB');

  // listen for the "identify" event for this Accessory
  lightAccessory.on('identify', function(paired, callback) {
    light.identify();
    callback();
  });

  // Add the actual Lightbulb Service and listen for change events from iOS.
  // We can see the complete list of Services and Characteristics in `lib/gen/HomeKitTypes.js`
  lightAccessory
    .addService(Service.Lightbulb, light.name) // services exposed to the user should have "names" like "Light" for this case
    .getCharacteristic(Characteristic.On)
    .on('set', function(value, callback) {
      light.setPower(value);

      // Our light is synchronous - this value has been successfully set
      // Invoke the callback when you finished processing the request
      // If it's going to take more than 1s to finish the request, try to invoke the callback
      // after getting the request instead of after finishing it. This avoids blocking other
      // requests from HomeKit.
      callback();
    })
    // We want to intercept requests for our current power state so we can query the hardware itself instead of
    // allowing HAP-NodeJS to return the cached Characteristic.value.
    .on('get', function(callback) {
      callback(null, light.getPower());
    });

  // To inform HomeKit about changes occurred outside of HomeKit (like user physically turn on the light)
  // Please use Characteristic.updateValue
  lightAccessory
    .getService(Service.Lightbulb)
    .getCharacteristic(Characteristic.On)
    .updateValue(true);

    return lightAccessory;
}

module.exports = new AccessoryFactory();
