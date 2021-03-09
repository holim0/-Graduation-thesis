// SPDX-License-Identifier: MIT"
pragma solidity >=0.4.19;

contract Faucet {

    address owner;

    //생성자.
    constructor(){
        owner = msg.sender;
    }


    function withdraw(uint256 amount) public {
        require(amount <= 0.1 ether);

        msg.sender.transfer(amount);
    }

     fallback() external payable {}

    receive() external payable {}
}




