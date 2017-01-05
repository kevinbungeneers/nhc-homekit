'use strict';

const logger = require('../Logger').logger

function Light(action) {
  this.action = action;
  this.manufacturer = "Niko";
  this.model = "v1.0";
  this.serialNumber = ""

  this.brightness = 100;
  this.hue = 0;
  this.saturation = 0;
}

Object.defineProperty(Light.prototype, 'id', {
  get: function() {
    return this.action.id
  }
});

Object.defineProperty(Light.prototype, 'name', {
  get: function() {
    return this.action.name + ' - ' + this.action.location.name;
  }
});

Object.defineProperty(Light.prototype, 'power', {
  get: function() {
    return this.action.value1 == 100 ? true : false;
  }
});

Light.prototype.setPower = function(status) {
  this.action.execute();
}

Light.prototype.getPower = function() {
  return this.power;
}

Light.prototype.identify = function() {
  logger.log('debug', 'Identify: %s - %s', this.action.name, this.action.location.name);
}

module.exports = Light;
