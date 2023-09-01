# Puddle-Network

Puddle is a decentralized layer of peer to peer nodes for broadcasting live podcast.it is a micro economy built on podcast.

## Tech stack
1. ENS/ENS widget - for usernames
1. SpruceId - for wallet authentication and storahe with kepler
1. Sort - get contracts transactions
1. Arbitrum - deployment blockchain for contracts
1. Union - voucher and lending contracts

### ENS Implementation 
 Source code 
   [Connect wallet file]([https://github.com/scapula07/everychain-nvb/blob/master/src/components/ConnectWallet/index.js](https://github.com/scapula07/Puddle-Network/blob/master/pod-client/src/components/connectAccount/index.jsx))
````
       const connectWallet=async()=>{
                
                try{
           
                    const provider = new ethers.providers.Web3Provider(window.ethereum)
                  
          
                    await provider.send("eth_requestAccounts", []);
                    
                     const newsigner = provider.getSigner()
                    
                   
                   const account= await newsigner .getAddress()
                   console.log(account)

                   if(chainId ===0x5){
                      const resolvedENSname= await provider?.lookupAddress(account)
                      const resolvedENSAvater= await provider?.getAvatar(resolvedENSname )
                       
                    }
                   else{

                      
             
                   }

                   }catch(){}


````


   [ENS Widget file](https://github.com/scapula07/Puddle-Network/blob/master/pod-client/src/components/EnsWidget/index.jsx)
```
   ENS Widget

     import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
      import { RegistrationWidget } from 'ens-widgets'
      import { useState } from 'react'
      
      export default function EnsWidget() {
          const { openConnectModal } = useConnectModal()
          const [status, setStatus] = useState('idle')
        
          const handleStatusUpdate = (newStatus) => {
            setStatus(newStatus)
          }
        return (
          <div className=''>
            <RegistrationWidget
              connectAction={openConnectModal}
              onStatusUpdate={handleStatusUpdate}
              trackingCode="demo.eth"
            />
      
          </div>
        )
      }




```

## Network participant

1. Broadcaster - podcaster
2. Transcoder node- background workers for pushing and transcoding streams
3. Stakers - delegates token to Nodes and earn fee cut from nodes


## Contracts

1. Controller - adds and manages the nodes
1. Escrow - process payment for transcoding jobs
1. Erc20 contract - payment and job receipt
1. Voucher on Union

### Architecture

1. Frontend
2. Controller server - spruceId auth,interacting with nodes
3. Docker image - containerized and ran as nodes
4. Rtmp server - for broadcasting stream

