import React from 'react'
import {BsFillGridFill} from "react-icons/bs"
import {SiMediamarkt} from "react-icons/si"
import {MdStorage,MdHistory} from "react-icons/md"
import Upload from '../Upload'
import GoLive from '../GoLive'
import { Link } from 'react-router-dom'

export default function TopSection() {
  return (
    <div className='w-full flex flex-col shadow-lg px-6 py-6'>
          <div className='flex w-full justify-between'>
                <h5 className='text-2xl font-semibold'>Welcome!</h5>
                <div className='flex items-center space-x-4 '>
                     <Upload />
                     <GoLive />
                </div>
            </div>
            <div className='flex w-full py-8 justify-between space-x-4'>
                {navs.map((nav)=>{
                    return(
                        <div className='flex border py-2 px-2 rounded-lg w-1/4 space-x-2 items-center'>
                            <h5 className='bg-black rounded-full p-2 flex justify-center items-center h-10 w-10'>
                              <h5 className='text-white'>  {nav.icon}</h5>
                            
                            </h5>
                            <div className='flex flex-col'
                            >
                              <Link to={nav?.link}>
                                <h5>{nav.name}</h5>
                              </Link>
                              

                            </div>

                        </div>
                    )
                })

                }

            </div>

            <div className='flex w-full py-8  space-x-4 text-slate-600'>
               <Link to="">
                   <h5>Assets</h5>
               </Link>
               <Link to="streams">
                  <h5>Streams</h5>
               </Link>
                <Link to="nodes">
                   <h5>Nodes</h5>
                </Link>
              
               
            </div>

    </div>
  )
}



const navs=[
    {name:"Overview",
     icon:<BsFillGridFill />
    },
    {name:"Transcoders",
     icon:<SiMediamarkt/>,
     total:11,
     active:4
   },
    {name:"Storage ",
    icon:<MdStorage/>,
    total:11,
    active:4
    },
    {name:"Explorer",
    icon:<MdHistory/>,
    total:11,
    active:4,
    link:"/explorer"
  }
]