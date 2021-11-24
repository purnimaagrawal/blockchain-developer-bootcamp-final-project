## Inter-Contract Execution
ERC20 token approve and transfer function was called from the main contract(Airbnb.sol) .

## Inheritance and Interfaces
AirbnbToken contract import and inherits from `openzepplin` ERC20 token contract . Constructor calls the mint function of the openzepplin contract to mint tokens with initialsuuply.