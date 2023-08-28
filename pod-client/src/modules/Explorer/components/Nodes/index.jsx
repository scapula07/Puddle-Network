import React,{useState,useEffect} from 'react'
import { AccountState } from '../../../../Recoil/state'
import { useRecoilValue } from 'recoil'
import ClipLoader from "react-spinners/ClipLoader";
import Web3 from "web3";
import controllerAbi from "../../../../contractAbi/controller.json"
import { ethers } from 'ethers'
const contractAddress="0x99C6947AA6b504020c91926896cE5068240A9E7C"

export default function Nodes() {
  const [nodes,setNode]=useState()
  const account=useRecoilValue(AccountState)
  const provider = new ethers.providers.Web3Provider(window.ethereum)

    const web3 = new Web3(window.ethereum)
    const controller= new web3.eth.Contract(
        controllerAbi,
        contractAddress
    )
   
  useEffect(()=>{
     const getNode=async()=>{
      try{
        const response = await controller.methods.getAllTranscoders().call()
       
        const nodes=[]
        let transcoders=[]
        
        response.forEach(async(ress) => {
          nodes.push(ress[0])
        });
       
        let i
        console.log(nodes)
        nodes.forEach(async(node) => {
           console.log(node,"addddd")
         const transcoder= await controller.methods.Transcoders(node).call()
         console.log(transcoder?.owner ,"trans")
        //  const resolvedENSname= await provider?.lookupAddress(transcoder?.owner);
        //   console.log(resolvedENSname)
        //   const resolvedENSAvater= await provider?.getAvatar(resolvedENSname ) 

          const transcoderNode={
             address:transcoder?.owner ,
            //  name:resolvedENSname,
            //  img: resolvedENSAvater,
             fee:transcoder?.minfee,
             cumulative:transcoder?.cumulativeFeeCut,
             status:transcoder?.status


          }
          transcoders.push(transcoderNode)
         setNode([...transcoders,transcoderNode]);
        });
       
       console.log()
      
        // setNode(transcoders)
        
     }catch(e){
        console.log(e)
       
     }

       }
      getNode()

    },[])
  console.log(nodes,"nnn")
   
  return (
      <div className='w-1/2 h-96 px-4 py-2 border rounded-lg'>
          <h5>Nodes</h5>
          <div className='flex flex-col space-y-4'>
              <div className='flex items-center justify-between border-b py-2'>
                  <h5>Transcoder</h5>
                  <h5>Fee</h5>
                  <h5>Cumulative stake</h5>
                  <h5>...</h5>
                 

              </div>
              {nodes?.map((node)=>{
                  console.log(node,"nodd")
                  
                  return(
                      <div className='flex items-center justify-between  border-b py-2 text-slate-500 font-semibold text-sm'>
                        <h5>{node?.address?.slice(0,4) +".."+ node?.address?.slice(-4) }</h5>
                        <h5>{node?.fee}</h5>
                        <h5>{node?.cumulative}</h5>
                        <button className='bg-black text-white py-1 px-8 '>Stake</button>
                      
                     </div>
                  )
              })

              }
              

          </div>

      </div>
  )
}
