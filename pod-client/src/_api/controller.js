import axios from "axios";


export const controllerApi= {
     findNodes:async function (fee) {
        const url=`http://localhost:3003/api/v1/pods/active-transcoders`

        const config = {
          headers:{
              'Content-Type': 'application/json',
             },
             };
        
          try{
        
            const response= await axios.post(
                url,
                {
                  fee:fee
                },
                config
            )
            return response;
            }catch(e){
            console.log(e)
            }

        }

}