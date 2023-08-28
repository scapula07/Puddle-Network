//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;


    contract Controller {
        

        mapping(address=>Transcoder ) public ActiveTranscoders;
        mapping(address=>Storage ) public ActiveStorage;
        mapping(address=>Transcoder ) public  Transcoders;
        mapping(address=>Storage ) public Storages;
        mapping(address=>Staker ) public Stakers;

        address[] public transcoderAddresses; // Maintain an array of transcoder addresses
        address[] public activetranscoderAddresses; // Maintain an array of transcoder addresses

         
         struct Transcoder {
                address owner;
                uint  minfee;
                string ipAddress;
                bool status;
                uint feeCut;
                uint cumulativeFeeCut;
                // mapping(address=>uint ) stakers;


            }
          struct Storage {
                address owner;
                uint  minfee;
                string ipAddress;
                bool status;
                uint feeCut;
                uint cumulativeFeeCut;
                // mapping(address=>uint ) stakers;

            }
        
          struct Staker {
                address staker;
                uint  amount;
                address addressOfNode;
                uint reward;
       

            }




        function addTranscoder(uint256 _minFee,string memory _ipAddress, uint256 _feeCut) external {
               Transcoders[msg.sender] =  Transcoder({
                        owner: msg.sender,
                        minfee: _minFee,
                        ipAddress: _ipAddress,
                        status: false,
                        feeCut: _feeCut,
                        cumulativeFeeCut: 0
                        
                    });
                 transcoderAddresses.push(msg.sender);


             }

        function addStorage(uint256 _minFee,string memory _ipAddress, uint256 _feeCut) external {
               Storages[msg.sender] = Storage({
                        owner: msg.sender,
                        minfee: _minFee,
                        ipAddress: _ipAddress,
                        status: false,
                        feeCut: _feeCut,
                        cumulativeFeeCut: 0
                        
                    });

            }

        function updateTranscoderStatus(bool _status) external {
               Transcoder memory _transcoder= Transcoders[msg.sender];
               _transcoder.status=_status;
               ActiveTranscoders[msg.sender]=_transcoder;
               activetranscoderAddresses.push(msg.sender);


          }
           
        function updateStorageStatus(bool _status) external {
             Storage memory _storage= Storages[msg.sender];
               _storage.status=_status;
               ActiveStorage[msg.sender]=_storage;


            }

         function stakeWithNode(uint256 _amount,address _addressOfNode) external {
               Stakers[msg.sender] = Staker(
                           msg.sender,
                           _amount,
                           _addressOfNode,
                            0
                        
                      );

           }
        
 

        function withDrawstake(uint256 _minCut, uint256 _feeCut) external {

         }
     function getTranscoderAddressAtIndex(uint256 index) public view returns (address) {
        require(index < transcoderAddresses.length, "Index out of range");
        return transcoderAddresses[index];
      }
    function getActiveTranscoderAddressAtIndex(uint256 index) public view returns (address) {
        require(index < activetranscoderAddresses.length, "Index out of range");
        return activetranscoderAddresses[index];
     }
    
      function getAllTranscoders() external view returns (Transcoder[] memory) {
        uint256 numberOfTranscoders = transcoderAddresses.length; 
        Transcoder[] memory allTranscoders = new Transcoder[](numberOfTranscoders);

        for (uint256 i = 0; i < numberOfTranscoders; i++) {
            address transcoderAddress = getTranscoderAddressAtIndex(i); // Implement this function
            allTranscoders[i] = Transcoders[transcoderAddress];
        }

        return allTranscoders;
       }

    function getAllActiveTranscoders() external view returns (Transcoder[] memory) {
        uint256 numberOfTranscoders = activetranscoderAddresses.length; 
        Transcoder[] memory allTranscoders = new Transcoder[](numberOfTranscoders);

        for (uint256 i = 0; i < numberOfTranscoders; i++) {
            address transcoderAddress = getActiveTranscoderAddressAtIndex(i); // Implement this function
            allTranscoders[i] = ActiveTranscoders[transcoderAddress];
        }

        return allTranscoders;
       }
         



        
      }