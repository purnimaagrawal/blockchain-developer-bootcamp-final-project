const AirbnbToken = artifacts.require("AirbnbToken");

module.exports = function(deployer) {
  deployer.deploy(AirbnbToken);
};
