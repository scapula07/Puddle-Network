import React ,{useState,useRef} from 'react'
import Modal from '../../../../components/Modal'
import {AiOutlineClose ,AiOutlineUpload} from "react-icons/ai"
import { keplerStorage } from '../../../../KeplerStorage'
import { storageApi } from '../../../../_api/storeFile'


export default function Upload() {
    const [trigger,setTrigger]=useState(false)
    const [file,setFile]=useState()
    const [thumbnail,setThumbnail]=useState({
                                          src:""

                                             })
    const [podDetails,setDetails]=useState({})

    const hiddenFileInput = useRef()

    const handleClick = event => {
        hiddenFileInput.current.click()
    }

    const handleChange = async(e)=> {
        const dir = e.target.files[0]
        console.log(dir,"dir")
        if (dir) {
            setThumbnail({
                src: URL.createObjectURL(dir)
              })
          }
       setFile(dir)
  
    }

    const store=async()=>{
        console.log("storing")
         try{
            // await keplerStorage.hostOorbit()
              const response=await keplerStorage.handlePostContent("first","test")
              console.log(response,"store")
            // const thumbnailUrl=await storageApi.storeFile()

            }catch(e){
                console.log(e)
            }
     }


  return (
    <>
     <button className='bg-black text-white py-2 px-4 rounded-md text-sm font-semibold' 
       onClick={()=>setTrigger(true)}
     >
        Upload
     </button>
 

       <Modal  trigger={trigger}  cname="w-1/2 py-2   px-4 rounded-lg ">
            <div className='w-full flex justify-end px-6 py-2'>
                    <AiOutlineClose 
                    onClick={()=>setTrigger(false)}
                 />

              </div>

              <div className='flex  py-6 w-full'>

                        <div className='flex flex-col space-y-6 border-r px-4 w-1/2'>
                                <div className='flex items-center space-x-4 '>
                                    <h5 className='text-sm'>File Name:</h5>
                                    <input
                                        className='border-b outline-none text-sm'
                                        placeholder='Podcast title'
                                        />
                                </div>
                                <div className='flex items-center space-x-4'>
                                    <h5 className='text-sm'>Description:</h5>
                                    <textarea
                                        className='border-b outline-none text-sm'
                                        placeholder='Podcast Description'
                                    />
                                </div>
                               {thumbnail?.src?.length ==0&&
                                  <div className='flex items-center space-x-4'>
                                    <h5 className='text-sm'>Upload Thumbnail:</h5>
                                    <button className='bg-black rounded-md py-1.5 px-8 text-white text-sm' onClick={handleClick}>Upload</button>
                                    <input 
                                        type={"file"}
                                        style={{display:"none"}}
                                        ref={hiddenFileInput}
                                        onChange={handleChange}
                                        />
                                  </div>

                               }
                                  { thumbnail?.src?.length > 0&&
                                     <div className='relative'>
                                         
                                         <img 
                                           src={thumbnail?.src}
                                         />
                                         <div className='absolute top-0 w-full z-10 px-4 ' >
                                            <h5 className='bg-slate-500 rounded-full opacity-70 h-8 w-8 flex items-center justify-center'>
                                             <AiOutlineClose 
                                                    onClick={()=>setThumbnail({src:""})}
                                                    className="text-sm font-semibold"
                                                />
                                            </h5>
                                        </div>
                                        
                                     </div>

                                   }

                               
                            

                        </div>
                        <AudioSelect />

                        

                        

               </div>
               <div className='flex justify-center w-full py-8 '>
                           <button className='text-black border-black border rounded-md py-1.5 px-8  text-sm' onClick={store}>Proceed</button>
               </div>

       </Modal>
    </>
  )
}


const AudioSelect=()=>{
    const [file,setFile]=useState()
    const [audio,setAudi0]=useState({src:""})
    const hiddenFileInput = useRef()

    const handleClick = event => {
        hiddenFileInput.current.click()
     }

    const handleChange = async(e)=> {
        const dir = e.target.files[0]
        console.log(dir,"dir")
        if (dir) {
            setAudi0({
              src: URL.createObjectURL(dir)
            })
        }
       setFile(dir)
  
    }

    return(
        <div className='flex flex-col px-6 w-full'>
              {audio?.src?.length ==0&&
                <div className='flex flex-col items-center space-y-2 w-full'>
                    <AiOutlineUpload 
                        className='text-3xl font-semibold'
                    />
                    <h5 className='hover:underline text-sm' onClick={handleClick}>Click to select audio file</h5>
                    <input 
                        type={"file"}
                        style={{display:"none"}}
                        ref={hiddenFileInput}
                        onChange={handleChange}
                    />

                </div>
                }
                {audio?.src?.length > 0&&
                     <audio src={audio?.src} controls />

                }

          </div>
     )
}