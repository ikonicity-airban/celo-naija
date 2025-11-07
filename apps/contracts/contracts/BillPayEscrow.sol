// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BillPayEscrow {
    IERC20 public immutable cngn;
    
    struct Bill {
        address payer;
        string billType;
        string accountNumber;
        uint256 amount;
        bool completed;
        uint256 timestamp;
    }
    
    Bill[] public bills;
    
    event BillCreated(uint256 indexed billId, address indexed payer, string billType, uint256 amount);
    event BillCompleted(uint256 indexed billId);

    constructor(address _cngn) {
        cngn = IERC20(_cngn);
    }

    function payBill(string memory billType, string memory accountNumber, uint256 amount) external returns (uint256) {
        require(cngn.transferFrom(msg.sender, address(this), amount), "Payment failed");
        
        bills.push(Bill({
            payer: msg.sender,
            billType: billType,
            accountNumber: accountNumber,
            amount: amount,
            completed: false,
            timestamp: block.timestamp
        }));
        
        uint256 billId = bills.length - 1;
        emit BillCreated(billId, msg.sender, billType, amount);
        return billId;
    }

    function completeBill(uint256 billId) external {
        require(billId < bills.length, "Invalid bill");
        Bill storage bill = bills[billId];
        require(!bill.completed, "Already completed");
        
        bill.completed = true;
        require(cngn.transfer(bill.payer, bill.amount), "Refund failed"); // Mock: refund for demo
        
        emit BillCompleted(billId);
    }

    function getBill(uint256 billId) external view returns (Bill memory) {
        require(billId < bills.length, "Invalid bill");
        return bills[billId];
    }

    function getBillCount() external view returns (uint256) {
        return bills.length;
    }
}