//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@unioncredit/v1-sdk/contracts/UnionVoucher.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @notice A UnionMember that vouches for holders of frankfrank
 */
 contract VouchForFrankFrank is UnionVoucher {
  uint256 public vouchAmount;

  
  constructor(uint _vouchAmount)
  BaseUnionMember(
      0xF440eC63091A5cdaff6f8dE19CFcD2b25DE01232,
      0x23B0483E07196c425d771240E81A9c2f1E113D3A,
      0xDF1742fE5b0bFc12331D8EAec6b478DfDbD31464
     ) {
    vouchAmount = _vouchAmount;

  }
  
  function stake(address dai) external {
    uint balance = IERC20(dai).balanceOf(address(this));
    _stake(balance);
  }
  
  function vouchForFrankFrank(address holder) external {
  
    _updateTrust(holder, vouchAmount);
  }
  
  function cancelPaperHands(address holder,address staker) external {
    _cancelVouch(staker,holder);
  }
}