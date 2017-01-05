'use strict';

const logger = require('../Logger').logger

function LightController(action) {
  this.action = action;
  this.manufacturer = "Niko";
  this.model = "v1.0";
  this.serialNumber = ""

  this.brightness = 100;
  this.hue = 0;
  this.saturation = 0;
}

Object.defineProperty(LightController.prototype, 'id', {
  get: function() {
    return this.action.id
  }
});

Object.defineProperty(LightController.prototype, 'name', {
  get: function() {
    return this.action.name + ' - ' + this.action.location.name;
  }
});

Object.defineProperty(LightController.prototype, 'power', {
  get: function() {
    return this.action.value1 == 100 ? true : false;
  }
});

LightController.prototype.setPower = function(status) {
  this.action.execute();
}

LightController.prototype.getPower = function() {
  return this.power;
}

LightController.prototype.identify = function() {
  logger.log('debug', 'Identify: %s - %s', this.action.name, this.action.location.name);
}

module.exports = LightController;
