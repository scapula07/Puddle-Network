import React from 'react'
import { useRecoilValue } from 'recoil'
import SearchBar from '../SearchBar'
import {MdNotifications,MdMessage} from "react-icons/md"
import Connect from '../connectAccount'
import SignIn from '../SignInWIthETH'

export default function Header( {hover,setHover}) {

  return (
      <div className=' h-full w-full'>
          <div className='flex items-center'>
              <div className='w-1/2'>
                 <SearchBar />

              </div>
               <div className='w-1/2'>
                    <div className='flex items-center justify-end space-x-4'>
                       <MdNotifications 
                         className='text-black font-semibold text-xl'
                        />
                      
                      <Connect 
                         hover={hover}
                         setHover={setHover}
                      />


                    </div>

               </div>

          </div>

       </div>
   )
}
