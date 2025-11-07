// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract cNGN is ERC20, Ownable {
    constructor() ERC20("Celo Naira", "cNGN") Ownable(msg.sender) {
        _mint(msg.sender, 10_000_000 * 10**18); // 10M cNGN
    }

    /// @notice Mint 10M cNGN to the faucet
    function faucet(uint256 amount) external {
        _mint(msg.sender, amount);
    }

    /// @notice Mint 10M cNGN to the caller
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}