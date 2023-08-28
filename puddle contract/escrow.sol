//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

    interface IERC20MintableBurnable is IERC20 {
        function mint(address, uint256) external;

        function burnFrom(address, uint256) external;
     }


    contract Escrow {

         struct Job{
            address transcoder;
            uint amount;
            uint jobId;
            STATE state;

          }

        mapping(uint =>Job) public jobs;
         
         enum STATE {
            OPEN,
            PENDING,
            COMPLETE
          }
         event NewJob(
            address broadcaster,
            uint amount,
            uint jobId
        
          );

             address[] public jobList;

        IERC20MintableBurnable public token;
     
        constructor (address _token) {
           token = IERC20MintableBurnable(_token);
            }


        function deposit(uint _id,address _transcoder)   external payable{
           require(msg.value > 0,'Amount should not enough');
         
         //   Job(msg.sender,msg.value,_id,STATE.OPEN);
           jobs[_id] =  Job(_transcoder,msg.value,_id,STATE.OPEN);
           token.mint(msg.sender,10**18);
            jobList.push(_transcoder);

         }

         function withdraw(uint _id,address _broadcaster)   external payable{
              Job memory myjob=jobs[_id];
             require(myjob.transcoder==msg.sender,'Not transcoder');
           
             require(token.balanceOf(msg.sender) ==10**18,"Not enough token");
             require(myjob.state==STATE.COMPLETE,"Incomplete state");
         
             token.burnFrom(msg.sender,10**18);
            payable(msg.sender).transfer(myjob.amount);

         }

          function updateState(uint _id) external {
              jobs[_id].state = STATE.COMPLETE;

          }

          function cancelJob(uint _id) external {

          }

           function findJobByTranscoder(address _transcoderToFind) public view returns (Job memory) {
            for (uint i = 1; i <= jobList.length; i++) {
                Job memory currentJob = jobs[i];
                if (currentJob.transcoder == _transcoderToFind) {
                    return currentJob;
                }
            }

            // Return a default Job if not found
            // return Job(address(0), 0, 0, STATE.Pending);
    }
     

     }