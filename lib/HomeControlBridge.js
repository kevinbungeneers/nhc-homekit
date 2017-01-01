const HAP = require('hap-nodejs');
const Accessory = HAP.Accessory;
const Bridge = HAP.Bridge;
const uuid = HAP.uuid;

function HomeControlBridge() {
  Bridge.call(this, 'Niko Home Control', uuid.generate('Niko Home Control'));
}

HomeControlBridge.prototype = Object.create(Bridge.prototype);
HomeControlBridge.prototype.constructor = HomeControlBridge;

HomeControlBridge.prototype.publish = function(info, allowInsecureRequest) {
  info.category = Accessory.Categories.BRIDGE;
  Bridge.prototype.publish.call(this, info, allowInsecureRequest);
}


module.exports = HomeControlBridge;
