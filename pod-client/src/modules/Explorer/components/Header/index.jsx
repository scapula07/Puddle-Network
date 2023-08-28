import React from 'react'
import { useRecoilValue } from 'recoil'
import {MdNotifications,MdMessage} from "react-icons/md"
import Connect from '../../../../components/connectAccount'



export default function Header() {

  return (
       <div className='border-b '>
               <div className=' h-full w-full flex py-4 px-10 flex items-center justify-between'>
                  <h5 className='text-xl font-semibold'>Puddle Explorer</h5>

                  <div className='flex items-center  font-semibold space-x-4'>
                     <h5>Home</h5>
                     <h5>Dashboard</h5>
                     <h5>Account</h5>

                  </div>

                 <Connect />

                  

               </div>
       </div>

   )
}
