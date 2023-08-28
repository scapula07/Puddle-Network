import React ,{useEffect,useState} from 'react'
import RegisterNode from '../components/RegisterNode'
import ClipLoader from "react-spinners/ClipLoader";
import Web3 from "web3";
import { AccountState } from '../../../Recoil/state';
import { useRecoilValue } from 'recoil';
import controllerAbi from "../../../contractAbi/controller.json"
import escrowAbi from "../../../contractAbi/escrow.json"
import tokenAbi from "../../../contractAbi/token.json";
import Modal from '../../../components/Modal';


const contractAddress="0x99C6947AA6b504020c91926896cE5068240A9E7C"
const escrowAddress="0xCAc6a980a9e151D52DD0d3386011a47C9Ba914E0"
const tokenAddress="0x1B7b052b23b75E7748Ab799873B3Ad17af762918"

export default function  Nodes() {
  const [node,setNode]=useState()
  const [job,setJob]=useState()
  const [trigger,setTrigger]=useState(false)
  const account=useRecoilValue(AccountState)
  

    const web3 = new Web3(window.ethereum)
    const controller= new web3.eth.Contract(
        controllerAbi,
        contractAddress
    )
    const escrow= new web3.eth.Contract(
      escrowAbi ,
      escrowAddress
  )
  useEffect(()=>{
     const getNode=async()=>{
      try{
        const response = await controller.methods.Transcoders(account).call()
        const  job = await  escrow.methods.findJobByTranscoder(account).call()
        console.log(job,"jobbb")
        setJob(job)
        console.log(response ,"response")
        setNode(response)
        
     }catch(e){
        console.log(e)
       
     }

       }
      getNode()

    },[account])
 console.log(job?.amount,"nodfee")
  return (
    <>
    <div className='w-full py-4'>
          {node?.owner?.length >0?
          <> 
                        <div className='flex flex-col space-y-4'>
                    <div className='flex items-center justify-between border-b py-2'>
                        <h5>Transcoder</h5>
                        <h5>Fee</h5>
                        <h5>Cumulative stake</h5>
                        <h5>Job</h5>
                      

                    </div>
          
                    <div className='flex items-center justify-between  border-b py-2 text-slate-500 font-semibold text-sm'>
                      <h5>{node?.owner?.slice(0,4) +".."+ node?.owner?.slice(-4) }</h5>
                      <h5>{node?.minfee}</h5>
                    <h5>{node?.cumulativeFeeCut}</h5> 
                    {job?.amount==="0"?
                        <h5>None</h5>
                        :
                        <h5>1</h5>

                    }
                   
                    
              
                     
       
              </div>

              </div>
          
          </>
           :
           <div className='flex py-20 justify-center w-full'>
             <RegisterNode />

            </div>

          }
       </div>

       <Modal trigger={trigger}  cname="w-1/2 py-2   px-4 rounded-lg">

       </Modal>
       

       </>
  )
}
