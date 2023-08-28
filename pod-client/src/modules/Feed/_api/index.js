import axios from "axios";
import { api } from "../../../api/axios.config";
import { defineCancelApiObject } from "../../../api/axios.utils";

const baseUrl='http://ec2-52-54-242-159.compute-1.amazonaws.com/api'

// export const FeedAPI = {
//     getPosts: async function (token) {
//       const url=`${baseUrl}/posts/feed?page=1`
//       const config = {
//         headers:{
//            'Content-Type': 'application/json',
//            Authorization: `Bearer ${token}`
//           },
//            };
      
//       try{
//        const response= await axios.get(
//           url,
//           config
//           )
//         return response;
//        }catch(e){
//          console.log(e)
//          }
 
//      },

//      like: async function (uid) {
//          return 1
//          },
//      makePost:async function () {}
//   }
  
//   const cancelApiObject = defineCancelApiObject(FeedAPI)


export const FeedAPI = {
    getPosts: async function (token, pageParam = 1 ) {
      const url=`${baseUrl}/posts/feed?page=${pageParam}`
    
    try{
    const response= await fetch( url,{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`
        }

      })

        if (!response.ok) {
        throw new Error('Request failed');
        }

        const responseData = await response.json();
        return responseData;
        }catch(e){
            console.log(e)
       }
        },

     like: async function (uid) {
         return 1
         },
     makePost:async function () {}
  }
  
  const cancelApiObject = defineCancelApiObject(FeedAPI)



