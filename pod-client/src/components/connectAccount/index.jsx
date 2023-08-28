import React,{useState,useCallback,useEffect} from 'react'
import { AccountState,EnsNameState, AvaterState } from '../../Recoil/state'
import { useRecoilState } from 'recoil'
import detectEthereumProvider from "@metamask/detect-provider"
import { ethers } from 'ethers'
import { authApi } from '../../_api/auth'
import { SiweMessage } from 'siwe';
import Modal from '../Modal'
import {AiOutlineClose } from "react-icons/ai"
import {FaUserEdit} from "react-icons/fa"
import EnsWidget from '../EnsWidget'


export default function Connect({hover,setHover}) {
      console.log(hover,"hover")
      const domain = window.location.host;
      const origin = window.location.origin;

    
      const [isSigned,setSigned]=useState(false)

      const [nonce,setNonce]=useState()
      const [account,setAccount]=useRecoilState(AccountState)  
      const [ensName,setENSName] =useRecoilState( EnsNameState)
      const [ensAvater,setENSAvater] =useRecoilState(AvaterState )
      const [chainId,setChainId]=useState("")
      const [message,setMessage]=useState("")
      const [signature,setSignature]=useState()
      const [trigger,setTrigger]=useState(false)
    
      const web3loader = useCallback(
         async() => {
    
        const webProvider = await detectEthereumProvider();
            if(webProvider){
              const chainid = await window.ethereum?.request({ method: 'eth_chainId' });
              setChainId(chainid)
              console.log(chainid)
    
          const accounts = await window.ethereum?.request({ method: 'eth_accounts' })
              handleAccountsChanged(accounts)
            }
          }
           , [])
         useEffect(()=>{
              window.addEventListener('load', web3loader)
              window.ethereum?.on('accountsChanged', handleAccountsChanged);
          
              return () => {
                web3loader()
              }
            },[web3loader])
          
          useEffect(()=>{
            const getNonce=async()=>{
               const response=await authApi.getNonce()
               console.log(response?.data)
               setNonce(response?.data?.nonce)

              }
              getNonce()
          },[account])

            function handleAccountsChanged(accounts) {
              //window.location.reload();
             }
      
          const connectWallet=async()=>{
                  console.log("connecting")
                try{
           
                    const provider = new ethers.providers.Web3Provider(window.ethereum)
                    console.log(provider)
          
                    await provider.send("eth_requestAccounts", []);
                    
                     const newsigner = provider.getSigner()
                    
                   
                   const account= await newsigner .getAddress()
                   console.log(account)

                   if(chainId ===0x5){
                      const resolvedENSname= await provider?.lookupAddress(account);
                      console.log(resolvedENSname)
                      const resolvedENSAvater= await provider?.getAvatar(resolvedENSname ) 
                      setENSName(resolvedENSname)
                      setENSAvater(resolvedENSAvater)
                      setAccount( account)
                      setTrigger(true)
                       
                    }
                   else{

                       setAccount( account)
             
                   }

                   }catch(error){
                     if(error.code === 4001) {
                 
                      } else {
                        console.error(error);
                     }
                   }
               }
            
          function createSiweMessage (address, statement) {
        
           
    
             
              const message = new SiweMessage({
                domain,
                address:account,
                statement,
                uri: origin,
                version: '1',
                chainId: chainId,
                nonce: nonce

              });
              return message.prepareMessage();
            }
            
          async function signInWithEthereum () {
            try{
              console.log("signing,,,")
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer =  provider.getSigner();
            const message = createSiweMessage(
               signer.address, 
                'Sign in with Ethereum to the app.'
              );
              console.log(message,"message")
              setMessage(message)
              const signature =await signer.signMessage(message)
              console.log(signature)
              setSignature(signature)
              setSigned(true)

            }catch(e){
              console.log(e)
            }
           
          }
         const verify=async()=>{
             try{
              const response =await authApi.verify()
              console.log(response,"verify")

              }catch(e){
                console.log(e)
              }

         }
            
      console.log(trigger,"triggg")

      return (

        <>
          {account?.length===0&&
            <button className='text-white bg-black px-6 py-2 rounded-sm text-sm'
             onClick={connectWallet}
            >
              Connect
            </button>
            } 


            {account?.length>1&&
                <>

              {ensName?.length>0?
                <div className='text-white bg-black px-6 py-2 rounded-sm text-sm flex items-center space-x-2 relative' 
                   onMouseOver={()=>setHover(true)}
                
                  
                    >
                      <img src={ensAvater} className="rounded-full h-5 w-5"/>
                      <span className='text-md font-semibold'> {ensName}</span>
                </div>
                :

                <div className='text-white bg-black px-6 py-2 rounded-sm text-sm flex items-center space-x-2 relative flex items-center' 
                  onMouseOver={()=>setHover(true)}
                  onMouseOut={()=>setHover(false)}
                
                 
                   >
                 
                  <p className='text-md font-semibold'
                     
                  > {account?.slice(0,7)+"..."+account?.slice(-4)}</p>
             
                 </div>
               }
                 {account?.length >0 &&hover&&

                
                  <>
                
                  {message.length >0?
                      <div className='absolute top-0 z-10 h-44 py-20'   onMouseOver={()=>setHover(true)}>
                          <div className='flex flex-col space-y-3  w-56 h-16 bg-slate-300 items-center justify-center rounded-md'>
                             <button className='text-xs border border-black py-2 px-4 rounded-lg' onClick={verify}>Verify</button>
                            </div>
                      </div>
                    
                     :
                      <div className='absolute top-0 z-10 h-44 py-20'   onMouseOver={()=>setHover(true)}>
                        <div className='flex flex-col bg-slate-300 w-56 h-16 items-center justify-center rounded-md'>
                          <button className='text-xs border border-black py-2 px-4 rounded-lg' onClick={signInWithEthereum}>Sign in with Ethereum</button>
   
                        </div>

                   </div>
                 


                  }
                </>
                 }
              </>
             }


       

        </>

       
      )
}
