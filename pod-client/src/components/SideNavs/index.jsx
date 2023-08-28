import React,{useState} from 'react'
import { navs } from './navs'
import { Link } from 'react-router-dom'
import {FaMicrophoneAlt} from "react-icons/fa"
const Nav=({nav,activeNav,setActive})=>{
   
    return(
      <div 
          className={`${activeNav==nav.navName?'flex items-center space-x-3 rounded-lg px-6 py-2  bg-black':'flex items-center space-x-3 rounded-lg px-6 py-2 hover:bg-slate-300'}`}
          onClick={()=>setActive(nav.navName)}
        >
          <h5 className={`${activeNav==nav.navName?'text-xl font-semibold text-white':'text-lg font-semibold text-slate-600'}`}>{nav.icon}</h5>

          <h5 className={`${activeNav==nav.navName?'  text-slate-200':'text-sm font-semibold text-slate-600'}`}>{nav.navName}</h5>

      </div>
    )
}
export default function SideNavs() {
    const [activeNav,setActive]=useState("Home")
  return (
    <div className='w-full flex flex-col items-center h-screen bg-white  py-8 space-y-20 shadow-xl'>
         <div className=''>
            <FaMicrophoneAlt 
            className='text-4xl font-semibold text-black'
            />
         </div>
         
          <div className='h-full flex flex-col space-y-4'>
            {navs.map((nav)=>{
                return(
                    <Link to={nav?.link}>
                    <Nav 
                        nav={nav} 
                        activeNav={activeNav} 
                        setActive={setActive}
                        />
                    </Link>
                )
            })}

          </div>

     </div>
    )
}



