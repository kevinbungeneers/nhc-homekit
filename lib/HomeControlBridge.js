const HAP = require('hap-nodejs');
const Accessory = HAP.Accessory;
const Bridge = HAP.Bridge;
const uuid = HAP.uuid;

class HomeControlBridge extends Bridge {
  constructor() {
    super('Niko Home Control', uuid.generate('Niko Home Control'));
  }

  publish (info, allowInsecureRequest) {
    info.category = Accessory.Categories.BRIDGE;
    super.publish(info, allowInsecureRequest);
  }
}

module.exports = HomeControlBridge;
