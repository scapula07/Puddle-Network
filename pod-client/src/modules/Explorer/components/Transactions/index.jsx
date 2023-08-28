import React from 'react'
import { LatestTransactions } from "@sort/react-components";


export default function Transactions() {
  return (
    <div className='w-1/2 h-96 px-4 py-2 border rounded-lg'>
        <h5>Transactions</h5>

        <div>
            <LatestTransactions
              contract_address="0x99C6947AA6b504020c91926896cE5068240A9E7C"
              api_key="c7b56a6a-3a6c-4100-95d4-c84286ca8d1c"
              blockchain="goerli"
              theme="light"
              height='200px'
            
            />
        </div>

    </div>
  )
}
