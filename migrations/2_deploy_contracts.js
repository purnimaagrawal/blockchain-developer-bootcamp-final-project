const AirbnbToken = artifacts.require("AirbnbToken");
const Airbnb = artifacts.require('Airbnb');
module.exports = async function(deployer) {
 let erc20 = await deployer.deploy(AirbnbToken,"DAirbnb","DAT","500000000000000000000000"); 
  await deployer.deploy(Airbnb,AirbnbToken.address);
};
