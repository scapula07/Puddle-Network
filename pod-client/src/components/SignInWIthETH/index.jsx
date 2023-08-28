import { useWeb3Modal } from '@web3modal/react';
import { useSSX } from '@spruceid/ssx-react';
import { useEffect, useState } from 'react';
import { SSX } from '@spruceid/ssx';


export default function SignIn() {
    const { ssx, provider } = useSSX();
    const { open: openWeb3Modal } = useWeb3Modal();
    const [loading, setLoading] = useState(false);
    const ssxHandler = async () => {
        return openWeb3Modal();
    }
    const signInUsingWeb3Modal = async () => {
       console.log(provider,"provider")
       const response=    await ssx?.signIn();
       console.log(response,"respp")
        if(provider && !ssx?.address()) {
          setLoading(true);
          try {
       
         
          } catch(e) {
            console.error(e);
          }
          setLoading(false);
        }
      }
      useEffect(() => {
        if(ssx && provider) {
          signInUsingWeb3Modal();
        }
        if(ssx && !provider) {
          ssx.signOut();
        }
    
      }, [provider, ssx]);
      
      const session = ssx?.session();
      console.log(session,"ssesion")
     return(
        <div>
           <button className='text-white bg-black px-6 py-2 rounded-sm text-sm'
             onClick={signInUsingWeb3Modal}
            >
              Connect
            </button>

        </div>
     )

}