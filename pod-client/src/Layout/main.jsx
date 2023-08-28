import React ,{useState} from 'react'
import Header from '../components/Header'
import SideNavs from '../components/SideNavs'
import SidePage from '../components/SidePage'
import { Toaster } from 'react-hot-toast';

export default function Layout({children}) {
   const [hover,setHover]=useState(false)
  return (
      <div className="w-screen overflow-x-hidden h-screen overflow-y-hidden">
       
            <div className='flex w-full'>
                <div className='w-1/5'>
                   <SideNavs />

                </div>
                <div className='w-full relative'>
                   <div className='absolute w-full py-6 px-10 z-20 ' >
                      <Header
                       hover={hover}
                       setHover={setHover}
                       />
                     </div> 
                     <div className='w-full py-20 overflow-y-scroll' 
                       onMouseOut={()=>setHover(false)}
                      >
                        {children}
                      </div>

                </div>
                 <div className='h-screen bg-white shadow-xl w-2/5 overflow-y-scroll'>
                      <SidePage />
                        
                     
                </div>

            </div>
            <Toaster />

       </div>
    )
}
