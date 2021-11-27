// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Airbnb DAT token Contract
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator,inherits openzepplin ERC20 smart contract .
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `ERC20` functions.
 */
contract AirbnbToken is ERC20 {
    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor(string memory name, string memory symbol, uint256 initialSupply ) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
    }
}