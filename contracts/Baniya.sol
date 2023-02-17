pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Baniya is ERC20 {
    string private _icon;

    constructor(string memory iconData) ERC20("BANIYA", "BAN") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
        _icon = iconData;
    }

    function icon() public view returns (bytes32) {
        return keccak256(bytes(_icon));
    }
    
  function balanceOf(address account) public view override returns (uint256) {
    return super.balanceOf(account);
}


}
