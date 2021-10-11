// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract GasCostArrayTest {
    address[] public test1;

    function addIntoTest1(address _address) external returns (bool) {
        test1.push(_address);
        return true;
    }

    function getTest1() external view returns (address[] memory) {
        return test1;
    }
}