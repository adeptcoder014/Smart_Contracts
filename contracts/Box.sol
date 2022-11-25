// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "../contracts/Auth.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Box is Ownable {
    uint256 private _value;//contract storage
    Auth private _auth;
    //==========================  Emitted when the stored value changes ===========================

    event ValueChanged(uint256 value);

    //----------------------------------------------------------------------
    constructor() {
        _auth = new Auth(msg
        .sender);
    }

    //========================== Stores a new value in the contract ===========================

    function store(uint256 value) public {
        require(_auth.isAdministrator(msg.sender), "Unauthorized"); // Require that the caller is registered as an administrator in Auth

        _value = value;
        emit ValueChanged(value);
    }

    // =========================  Reads the last stored value ======================

    function retrieve() public view returns (uint256) {
        return _value;
    }

    

}
// 0x5FbDB2315678afecb367f032d93F642f64180aa3