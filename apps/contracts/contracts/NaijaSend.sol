// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NaijaSend {
    IERC20 public immutable cngn;
    
    mapping(string => address) public phoneToWallet;
    mapping(address => string) public walletToPhone;
    
    event PhoneLinked(address indexed wallet, string phone);
    event Sent(address indexed from, address indexed to, uint256 amount, string purpose);
    event AirtimePurchase(address indexed buyer, uint256 amount, string provider);

    constructor(address _cngn) {
        cngn = IERC20(_cngn);
    }

    function linkPhone(string memory phone) external {
        require(bytes(phone).length > 0, "Invalid phone");
        phoneToWallet[phone] = msg.sender;
        walletToPhone[msg.sender] = phone;
        emit PhoneLinked(msg.sender, phone);
    }

    function sendToPhone(string memory toPhone, uint256 amount, string memory purpose) external {
        address to = phoneToWallet[toPhone];
        require(to != address(0), "Phone not registered");
        require(cngn.transferFrom(msg.sender, to, amount), "Transfer failed");
        emit Sent(msg.sender, to, amount, purpose);
    }

    function sendToWallet(address to, uint256 amount, string memory purpose) external {
        require(cngn.transferFrom(msg.sender, to, amount), "Transfer failed");
        emit Sent(msg.sender, to, amount, purpose);
    }

    function buyAirtime(uint256 amount, string memory provider) external {
        require(cngn.transferFrom(msg.sender, address(this), amount), "Payment failed");
        emit AirtimePurchase(msg.sender, amount, provider);
    }
}