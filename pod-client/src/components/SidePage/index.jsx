import React, { Children ,useState} from 'react'
import {MdOutlineKeyboardArrowLeft} from "react-icons/md"
import {BsThreeDots} from "react-icons/bs"
import audio from "../../test.mp3"
import {FaUserEdit} from "react-icons/fa"
import { AccountState } from '../../Recoil/state'
import { useRecoilValue } from 'recoil'
import Modal from '../Modal'
import EnsWidget from '../EnsWidget'
import {AiOutlineClose } from "react-icons/ai"
export default function SidePage() {
    const account=useRecoilValue(AccountState)
    const [trigger,setTrigger]=useState(false)
  return (
    <>
    <div className='flex flex-col py-8 w-full px-4 '>
        <div className='flex items-center w-full justify-between'>
            <MdOutlineKeyboardArrowLeft
            className='text-2xl'
             />
             {account?.length>0&&
             <div
              onClick={()=>setTrigger(true)}
             >
             
              <FaUserEdit
                    className='text-black text-2xl '
                />
               </div>

             }
              

        </div>
         <div className='flex flex-col py-10 space-y-2 '>
            <h5 className='text-slate-600 text-sm '>Now Playing</h5>
            <h5 className='font-light text-lg'>Lorem ipsum dolor ipsum autium </h5>
            <div className='flex border flex-col space-y-4 py-4 px-4 rounded-lg'>
                <img 
                  className='h-44 w-full'
                 />
                <audio src="https://file-examples.com/storage/fe8ec1a8f464ac695986bbb/2017/11/file_example_MP3_5MG.mp3" controls />
            </div>

        </div>
        <div className='flex flex-col py-10 space-y-2 w-full '>
            <h5 className='font-semibold text-sm '>Upcoming</h5>
            <div className='flex  overflow-x-scroll py-6' style={{width:"200%"}}>
                {[1,2,3,4,5,7,8].map(()=>{
                    return(
                        <div className='flex flex-col w-full'>
                            <img 
                             src='h-20'
                            />
                            <h5 className='font-semibold text-xs'>Lorem ipsum dolor</h5>
                        </div>
                    )
                })

                }
            </div>

        </div>

    </div>


        <Modal  trigger={trigger}  cname="w-1/4 py-2   px-4 rounded-lg ">
               <div className='w-full flex justify-end px-6 py-2'>
                        <AiOutlineClose 
                        onClick={()=>setTrigger(false)}
                    />

                </div>
                <EnsWidget />
              

                

          </Modal>

    </>
  )
}


