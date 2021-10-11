// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;
import '@openzeppelin/contracts/utils/structs/EnumerableSet.sol';

contract GasCostEnumerableSet {
    using EnumerableSet for EnumerableSet.AddressSet;

    EnumerableSet.AddressSet private test2;

    function add(address value) public returns (bool) {
        return test2.add(value);
    }

    function remove(address value) public returns (bool) {
        return test2.remove(value);
    }

    function length() public view returns (uint256) {
        return test2.length();
    }
}