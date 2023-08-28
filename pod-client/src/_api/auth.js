import axios from "axios";


export const authApi= {
     getNonce:async function () {
        const url=`http://localhost:3003/api/v1/pods/get-nonce`

        const config = {
          headers:{
              'Content-Type': 'application/json',
             },
             };
        
          try{
        
            const response= await axios.get(
                url,
                config
            )
            return response;
            }catch(e){
            console.log(e)
            }

     },
     verify:async function (message,signature) {
        const url=`http://localhost:3003/api/v1/pods/verify`

        const config = {
          headers:{
              'Content-Type': 'application/json',
             },
             };
        
          try{
        
            const response= await axios.post(
                url,
                {
                    message,
                    signature
                },
                config
            )
            return response;
            }catch(e){
            console.log(e)
            }

     }
}