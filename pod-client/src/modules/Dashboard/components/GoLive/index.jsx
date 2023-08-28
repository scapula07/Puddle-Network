import React,{useState,useEffect,useRef} from 'react'
import {AiOutlineClose ,AiOutlineUpload} from "react-icons/ai"
import LiveModal from './liveModal'
import { ReactMic } from 'react-mic';
import {BsFillMicFill,BsFillMicMuteFill} from "react-icons/bs"
import ClipLoader from "react-spinners/ClipLoader";
import { controllerApi } from '../../../../_api/controller';
import { AccountState } from '../../../../Recoil/state'
import { useRecoilValue } from 'recoil'
import Web3 from "web3";
import controllerAbi from "../../../../contractAbi/controller.json"
import escrowAbi from "../../../../contractAbi/escrow.json"
import tokenAbi from "../../../../contractAbi/token.json"
import { ethers } from 'ethers'
import toast from 'react-hot-toast';


const contractAddress="0x99C6947AA6b504020c91926896cE5068240A9E7C"
const escrowAddress="0x663a4d847F8762fdBEAEC9eE73E053e433033994"
const tokenAddress="0x1B7b052b23b75E7748Ab799873B3Ad17af762918"

export default function GoLive() {
    const [nodes,setNode]=useState()
    const account=useRecoilValue(AccountState)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const [trigger,setTrigger]=useState(false)
    const [hasPaid,setPaid]=useState(false)
    const [active,setActive]=useState([])
    const [fee,setFee]=useState()
    const [processing,setProcessing]=useState("")


      const web3 = new Web3(window.ethereum)
      const controller= new web3.eth.Contract(
          controllerAbi,
          contractAddress
      )
      const escrow= new web3.eth.Contract(
        escrowAbi ,
        escrowAddress
    )
    const token= new web3.eth.Contract(
      tokenAbi ,
      tokenAddress
  )
     
    useEffect(()=>{
       const getNode=async()=>{
        try{
          const response = await controller.methods.getAllActiveTranscoders().call()
         
          const nodes=[]
          let transcoders=[]
          
          response.forEach(async(ress) => {
            nodes.push(ress[0])
          });
         
          let i
          console.log(nodes)
          nodes.forEach(async(node) => {
             console.log(node,"addddd")
           const transcoder= await controller.methods.ActiveTranscoders(node).call()
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
        }catch(e){
            console.log(e)
           
         }
    
           }
          getNode()
    
        },[])

     
    const findNode=async()=>{
        try{
             console.log(nodes,"nodeee")
            const activeNodes=  nodes.filter(node => Number(node.fee) <= Number(fee ))
            console.log(activeNodes,"iiinode")
            setActive(activeNodes)
            

        }catch(e){
            console.log(e)
         }

    }
    console.log(nodes,"npode")

    const depositPayment=async(address,fee)=>{
      setProcessing("Processing deposit")
    
      var random_number = Math.floor(Math.random() * 100) + 1;
       try{
        const tx = await escrow.methods.deposit(random_number,address).send({from:account,value:fee})
      
        console.log(tx,"txxxxx")
        tx?.transactionHash.length >0 &&setPaid(true)


        }catch(e){
          console.log(e)
        }

     }
    
  return (
      <>
        <button className='border border-black text-black py-2 px-4 rounded-md text-sm font-semibold' 
            onClick={()=>setTrigger(true)}
             >
         Go live
       </button>

        <LiveModal  trigger={trigger}  cname="w-3/5 py-2   px-4 rounded-lg ">
                <div className='w-full flex justify-end px-6 py-2'>
                        <AiOutlineClose 
                        onClick={()=>setTrigger(false)}
                    />

                </div>
                  {hasPaid?
                    <div className='flex w-full px-8 h-4/5 w-3/5'>
                        <div className='w-1/2'>
                            <Cast 
                            />
                        </div>
                        
                        
                        <div className='flex flex-col w-1/2'>
                        
                        </div>

                    </div>
                    :
                    <div className='flex flex-col w-full space-y-4 px-8'> 
                         <h5 className='text-sm font-semibold'>Payment processor </h5>
                         <div className='flex '>
                                <div className='flex flex-col space-y-6 w-1/2'>
                                    
                                    <div className='flex items-center space-x-4 '>
                                            <h5 className='text-sm'>Podcast Name:</h5>
                                            <input
                                                className='border-b outline-none text-sm'
                                                placeholder='Podcast title'
                                                />
                                    </div>
                                    <div className='flex items-center space-x-4 '>
                                        <h5 className='text-sm'>Fee:</h5>
                                        <input
                                            className='border-b outline-none text-sm'
                                            placeholder='Enter amount to pay'
                                            name="fee"
                                            value={fee}
                                            onChange={(e)=>setFee(e.target.value)}
                                        />
                                    </div>


                                    <div className='flex justify-center py-4'>
                                        <button className='bg-black py-2 px-10 rounded-lg text-white' onClick={findNode}>Find a node</button>

                                    </div>
                                    

                                </div>



                                <div className='flex flex-col w-1/2 items-center'>
                                     <h5>Available Nodes</h5>


                                     {active?.length >0&&
                                        <div className='flex flex-col w-full'>
                                        {active?.map((node)=>{
                                                    console.log(node.fee,"nodd")
                                                    
                                                    return(
                                                        <div className='flex items-center  space-x-9  border-b py-2 text-slate-500 font-semibold text-sm'
                                                           onClick={()=>depositPayment(node?.address,node?.fee)}
                                                          >
                                                            <h5>{node?.address?.slice(0,4) +".."+ node?.address?.slice(-4) }</h5>
                                                            <h5>{node?.fee} WEI</h5>
                                                            
                                                        </div>
                                                    )
                                                })

                                                }

                                              {processing?.length>0&&
                                                  <div className='flex flex-items'> 
                                                    <h5>Processing payment</h5>
                                                    <ClipLoader 
                                                        color={"black"}
                                                        loading={true}
                                                       />

                                                  </div>

                                              }
                                           
                                         </div>


                                      }
                                       {active?.length ===0&&
                                            <div className='flex justify-center'>
                                                <ClipLoader 
                                                    color={"black"}
                                                    loading={true}
                                                />

                                            </div>
                                      }

                                </div>

                         </div>
                        

                    </div>
                 }
             


            </LiveModal>
    </>

  )
}


const Cast=()=>{
 
    const [record,setRecord]=useState(false)
    const [hover,setHover]=useState(false)
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [blobUrl,setUrl]=useState()
    
   
    



    console.log(record,"rrrr")

    const start=()=>{
        setRecord(true)
     }
    const stop=()=>{
        setRecord(false)
    }

    const onData=(recordedBlob)=>{
        console.log('chunk of real-time data is: ', recordedBlob);
     
        setRecordedChunks((prev) => prev?.concat(recordedBlob));

        var socket =new WebSocket("ws://localhost:8080")
        socket.onopen=(event)=>{
        
        
  
            if ( socket?.readyState === 3 ) {
             console.log("Websocket closed")
             socket.close()
             
             var newSocket =new WebSocket(url)
             
            
            
              newSocket.send(recordedBlob);
              console.log('send data',recordedBlob)
              
            }else{
             console.log(socket.readyState,"else")
             socket.send(recordedBlob);
             console.log('send data',recordedBlob)
            }
           }
          
        



          
       
    }

     const end=(recordedBlob)=>{
        console.log('recordedBlob is: ', recordedBlob)
      }

      console.log(blobUrl,"url blob")

      setInterval(async()=>{
        const blobDataArray = [];
        for (const blob of recordedChunks) {
            const arrayBuffer = await blob.arrayBuffer();
            blobDataArray.push(new Uint8Array(arrayBuffer));
          }
        
          const concatenatedArrayBuffer = blobDataArray.reduce((acc, array) => {
            const combined = new Uint8Array(acc.length + array.length);
            combined.set(acc, 0);
            combined.set(array, acc.length);
            return combined;
          }, new Uint8Array());
          
          console.log(new Blob([concatenatedArrayBuffer]),"concaatt")
          const blobUrl = URL.createObjectURL(new Blob([concatenatedArrayBuffer]));
          setUrl(blobUrl,"urrl")


      },60000)
       console.log(recordedChunks,"recorrd ccjjc")
    return(
      <div className='flex flex-col'>
         <h5 className='text-lg font-semibold text-slate-700'>Podcast Name</h5>
           <div className='flex flex-col py-8 space-y-5'>
               <audio src={blobUrl} controls />

               <div className='flex items-center space-x-6'>
                    {record?
                         <BsFillMicMuteFill
                            className="text-xl text-slate-700 relative"
                            onClick={stop}
                            onMouseOver={()=>setHover(true)}
                           
                         />

                            :
                            <BsFillMicFill 
                             className="text-xl text-slate-700 relative"
                             onClick={start}
                             onMouseOver={()=>setHover(true)}
                           />

                      }

                    <ReactMic
                        record={record}
                        visualSetting="frequencyBars"
                        className={`${record?"block w-1/2":"hidden"}`}
                        onStop={end}
                        onData={onData}
                        strokeColor="black"
                        backgroundColor="white"
                        timeSlice={40000} 
                         />
                  
                   <>
                     {record?
                            <div className='absolute mt-8'>
                                <h5 className='text-xs text-slate-700 font-semibold bg-slate-300 px-2 rounded-lg py-1'>Stop streaming</h5>
                            </div>
                            :
                            <div className='absolute mt-8'>
                                <h5 className='text-xs text-slate-700 font-semibold bg-slate-300 px-2 rounded-lg py-1'>Start streaming from browser</h5>
                            </div>

                     }
                   </>

                 
                    

                </div>

                
                



           </div>

           <div className='flex flex-col py-8'>
              <h5 className='text-slate-700 font-semibold'>Streaming software setup</h5>
              <p className='w-3/5 text-sm font-light py-4'>
                Copy and paste the stream key into your streaming software. Use either the RTMP or SRT ingest, depending on your use-case. The RTMP ingest is more common with OBS users
              </p>

              <div className='flex flex-col space-y-2'>
                 <h5 className='text-sm'>
                    <span className='font-semibold text-black text-lg'>Stream key</span>:
                    1456-akke0-ii
                    </h5>
                 <h5 className='text-sm'>
                    <span className='font-semibold text-black text-lg'>RTMP ingest</span>
                    :1456-akke0-ii</h5>

              </div>

           </div>

       </div >

    )
}