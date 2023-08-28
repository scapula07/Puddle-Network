import React from 'react'
import {BiSearch} from "react-icons/bi"

export default function SearchBar() {
  return (
    <div className='flex items-center space-x-4 px-4 py-1 border border-black rounded-lg w-3/4'>
       
         <input 
            placeholder='Search here...'
            className=' outline-none w-full border-0 '
            
         
          />
          <h5 className='bg-black p-2 rounded-lg flex items-center justify-center '>
            <BiSearch
              className='text-white text-xl font-semibold'
            />
         </h5>

    </div>
  )
}
