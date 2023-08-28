import React,{useState} from 'react'
import Modal from '../../../../components/Modal'
import {AiOutlineClose ,AiOutlineUpload} from "react-icons/ai"
import Web3 from "web3";
import { AccountState } from '../../../../Recoil/state';
import { useRecoilValue } from 'recoil';
import controllerAbi from "../../../../contractAbi/controller.json"
import ClipLoader from "react-spinners/ClipLoader";


const contractAddress="0x51246c9F480Cc6A46397b2A35684BC3231Acf41F"

export default function RegisterNode() {
    const account=useRecoilValue(AccountState)
    const [trigger,setTrigger]=useState(false)
    const [next,setNext]=useState(false)
    const [params,setParams]=useState({})
    const [isLoading,setLoader]=useState(false)

    const web3 = new Web3(window.ethereum)
    const controller= new web3.eth.Contract(
        controllerAbi,
        contractAddress
    )
    
    const addTranscoder=async()=>{
        console.log("trrran")
        
        const _fee=web3.utils.toWei(params?.fee?.toString(),'wei')
        const _cut=web3.utils.toWei(params?.cut?.toString(),'wei')
        console.log(_fee,_cut,params?.ip,"paramsss")
       
        try{
            setLoader(true)
            console.log("hhhhh")
            const tx = await controller.methods.addTranscoder(_fee,params?.ip,_cut).send({from:account})
            console.log(tx,"txx")
 
            
            setLoader(false)
            setTrigger(false)
         }catch(e){
            console.log(e)
            setLoader(false)
         }
    }
  return (

    <>
       <button className='bg-black text-white py-2 px-4 w-1/4 rounded-md text-sm font-semibold' 
          onClick={()=>setTrigger(true)}
        >
           Run a Node
        </button>
        <Modal  trigger={trigger}  cname="w-1/2 py-2   px-4 rounded-lg ">
             <div className='w-full flex justify-end px-6 py-2'>
                    <AiOutlineClose 
                    onClick={()=>setTrigger(false)}
                 />

              </div>
              {next?
                <div className=''>
                             <div className='flex flex-col space-y-6 px-4'>
                                <div className='flex items-center space-x-4 '>
                                    <h5 className='text-sm'>Minimum fee:</h5>
                                    <input
                                        className='border-b outline-none text-sm'
                                        placeholder='Your fee for each job(ETH)'
                                        name="Fee"
                                        value={params?.fee}
                                        onChange={(e)=>setParams({...params,fee:e.target.value})}
                                        />
                                </div>
                                <div className='flex items-center space-x-4'>
                                    <h5 className='text-sm'>Fee cut to Stakers:</h5>
                                    <input
                                        className='border-b outline-none text-sm'
                                        placeholder='in ETH'
                                        name="cut"
                                        value={params?.cut}
                                        onChange={(e)=>setParams({...params,cut:e.target.value})}
                                        />
                                </div>
                                <div className='flex items-center space-x-4'>
                                    <h5 className='text-sm'>IP Address or URL of Node:</h5>
                                    <input
                                        className='border-b outline-none text-sm'
                                        placeholder='Your Node IP address'
                                        name="ip"
                                        value={params?.ip}
                                        onChange={(e)=>setParams({...params,ip:e.target.value})}
                                        />
                                </div>

                                <div className='flex justify-center py-8'>
                                {isLoading?
                             
                                    <ClipLoader 
                                        color={"black"}
                                        loading={isLoading}
                                    />
                                     :
                                    <button className='text-black border-black border rounded-md py-1.5 px-8  text-sm'
                                      onClick={addTranscoder}
                                     >
                                        Proceed
                                    </button>
                                   }
                                </div>

                                
                            

                        </div>

                </div>
                  :
                    

                    
                <div className='flex flex-col'>
                    <div className='flex flex-col space-y-4'>
                        <h5 className='text-sm hover:underline text-center w-full'>Download from Github</h5>
                        <div className='flex flex-col items-start text-sm space-y-2'>
                            <h5>1.Download node from github repo</h5>
                            <h5>2.Build and run as a docker container</h5>
                            <h5>3.Deploy or run docker locally</h5>
                            </div>
                        
                    </div>
                    <div className='flex w-full justify-center py-8'>
                        <button className='text-black border-black border rounded-md py-1.5 px-8  text-sm' onClick={()=>setNext(true)}>Next</button>

                    </div>

              </div>
              }

             


        </Modal>
    </>
   
  )
}
