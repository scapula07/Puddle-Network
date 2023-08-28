import React from 'react'
import Header from '../components/Header'
import Search from '../components/Search'
import Nodes from '../components/Nodes'
import Transactions from '../components/Transactions'

export default function ExplorerView() {
  return (
    <div className=''>
         <Header />

         <div className='flex flex-col py-8 px-10 space-y-3'>
              <h5 className='text-lg'>Network Explorer</h5>
              <Search />
         
         </div>


         <div className='flex space-x-10 w-full py-10 px-10'>
            <Nodes />
            <Transactions />

         </div>

    </div>
  )
}
